import * as React from 'react';
import _ from 'lodash';
import { List, LMR, FA, Page, nav, Controller, TypeVPage, VPage, resLang, NavSettings} from '../../ui';
import { loadAppUqs, appInFrame, getExHash, isDevelopment, UqAppData, UqData} from '../../net';
import { CUq, UqUI } from './cUq';
import { centerApi } from '../centerApi';
import { Uqs } from '../uqs';

export interface RoleAppUI {
    CApp?: typeof CApp;
    CUq?: typeof CUq;
    main?: TypeVPage<CApp>;
    uqs: {[uq:string]: UqUI | (()=>Promise<UqUI>)};
    res?: any;
}

export interface AppUI extends RoleAppUI, NavSettings {
    appName: string;        // 格式: owner/appName
    version: string;        // 版本变化，缓存的uqs才会重载
    roles?: {[role:string]: RoleAppUI | (()=>Promise<RoleAppUI>)};
}

export class CApp extends Controller {
    readonly name: string;
    readonly version: string;
    readonly uqApp: Uqs;
    private cImportUqs: {[uq:string]: CUq} = {};
    protected ui:AppUI;
    appUnits:any[];

    constructor(ui:AppUI) {
        super(resLang(ui && ui.res));
        nav.setSettings(ui);
        this.name = ui.appName;
        this.version = ui.version;
        if (this.name === undefined) {
            throw 'appName like "owner/app" must be defined in UI';
        }
        this.uqApp = new Uqs(this.name);
        if (ui.uqs === undefined) ui.uqs = {};
        this.ui = ui;
        this.caption = this.res.caption || 'Tonva';
    }
    
    readonly caption: string; // = 'View Model 版的 Uq App';
    cUqCollection: {[uq:string]: CUq} = {};

    getImportUq(uqOwner:string, uqName:string):CUq {
        let uq = uqOwner + '/' + uqName;
        let cUq = this.cImportUqs[uq];
        if (cUq !== undefined) return cUq;
        let ui = this.ui && this.ui.uqs && this.ui.uqs[uq];
        let uqId = -1; // unknown
        this.cImportUqs[uq] = cUq = this.getCUq(uq);
        return cUq;
    }

    protected newCUq(uqData: UqData, uqUI: UqUI) {
        let cUq = new (this.ui.CUq || CUq)(this, uqData, uqUI);
        Object.setPrototypeOf(cUq.x, this.x);
        return cUq;
    }

    get cUqArr():CUq[] {
        let ret:CUq[] = [];
        for (let i in this.cUqCollection) {
            ret.push(this.cUqCollection[i]);
        }
        return ret;
    }

    getCUq(uq:string):CUq {
        return this.cUqCollection[uq];
    }

    protected get VAppMain():TypeVPage<CApp> {return (this.ui&&this.ui.main) || VAppMain}
    protected async beforeStart():Promise<boolean> {
        try {
            let retErrors = await this.load();
            //let app = await loadAppUqs(this.appOwner, this.appName);
            // if (isDevelopment === true) {
            // 这段代码原本打算只是在程序员调试方式下使用，实际上，也可以开放给普通用户，production方式下
            let {predefinedUnit} = appInFrame;
            //let {id} = app;
            //this.id = id;
            let {user} = nav;
            if (user !== undefined && user.id > 0) {
                this.appUnits = await centerApi.userAppUnits(this.uqApp.id);
                switch (this.appUnits.length) {
                    case 0:
                        this.showUnsupport(predefinedUnit);
                        return false;
                    case 1:
                        let appUnit = this.appUnits[0].id;
                        if (appUnit === undefined || appUnit < 0 || 
                            predefinedUnit !== undefined && appUnit != predefinedUnit)
                        {
                            this.showUnsupport(predefinedUnit);
                            return false;
                        }
                        appInFrame.unit = appUnit;
                        break;
                    default:
                        if (predefinedUnit>0 && this.appUnits.find(v => v.id===predefinedUnit) !== undefined) {
                            appInFrame.unit = predefinedUnit;
                            break;
                        }
                        nav.push(<this.selectUnitPage />)
                        return false;
                }
            }
            if (retErrors !== undefined) {
                this.openPage(<Page header="ERROR">
                    <div className="m-3">
                        <div>Load Uqs 发生错误：</div>
                        {retErrors.map((r, i) => <div key={i}>{r}</div>)}
                    </div>
                </Page>);
                return false;
            }
            return true;
        }
        catch (err) {
            nav.push(<Page header="App start error!">
                <pre>
                    {typeof err === 'string'? err : err.message}
                </pre>
            </Page>);
            return false;
        }
    }

    private async load(): Promise<string[]> {
        let {appOwner, appName} = this.uqApp;
        let uqAppData = this.uqApp.uqAppCache.get();
        if (!uqAppData || uqAppData.version !== this.version) {
            uqAppData = await loadAppUqs(appOwner, appName);
            uqAppData.version = this.version;
            this.uqApp.uqAppCache.set(uqAppData);
        }
        let {id, uqs} = uqAppData;
        this.uqApp.id = id;

        let retErrors:string[] = [];

        let promiseInits: PromiseLike<void>[] = [];
        let promises: PromiseLike<string>[] = [];
        let promiseChecks: PromiseLike<boolean>[] = [];
        for (let uqData of uqs) {
            let {id, uqOwner, uqName, access} = uqData;
            let uqFullName = uqOwner + '/' + uqName;
            let uqUI = this.ui.uqs[uqFullName] as UqUI || {};
            let cUq = this.newCUq(uqData, uqUI);
            this.cUqCollection[uqFullName] = cUq;
            this.uqApp.addUq(cUq.uq);
            promiseInits.push(cUq.init());
        }
        await Promise.all(promiseInits);

        for (let i in this.cUqCollection) {
            let cUq = this.cUqCollection[i];
            promises.push(cUq.loadEntities());
            //promiseChecks.push(cUq.checkEntities());
        }
        let results = await Promise.all(promises);
        /*
        Promise.all(promiseChecks).then((checks) => {
            for (let c of checks) {
                if (c === false) {
                    //debugger;
                    //nav.start();
                    //return;
                }
            }
        });
        */
        for (let result of results)
        {
            let retError = result; // await cUq.loadSchema();
            if (retError !== undefined) {
                retErrors.push(retError);
                continue;
            }
        }
        if (retErrors.length === 0) {
            this.uqApp.setTuidImportsLocal();
            return;
        }
        return retErrors;
    }

    protected async internalStart(param:any) {
        if (param !== true) {
            this.clearPrevPages();
        }
        await this.showMainPage();
    }

    render(): JSX.Element {
        return this.renderView(this.VAppMain);
    }

    // 如果是独立app，删去显示app之前的页面。
    // 如果非独立app，则不删
    protected clearPrevPages() {
        nav.clear();
    }

    private showUnsupport(predefinedUnit: number) {
        this.clearPrevPages();
        let {user} = nav;
        let userName:string = user? user.name : '[未登录]';
        let {appOwner, appName} = this.uqApp;
        this.openPage(<Page header="APP无法运行" logout={true}>
            <div className="m-3 text-danger container">
                <div className="form-group row">
                    <div className="col-sm-3 font-weight-bold">登录用户</div>
                    <div className="col-sm text-body">{userName}</div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-3 font-weight-bold">App</div>
                    <div className="col-sm text-body">{`${appOwner}/${appName}`}</div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-3 font-weight-bold">预设小号</div>
                    <div className="col-sm text-body">{predefinedUnit || <small className="">[无预设小号]</small>}</div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-3 font-weight-bold">
                        可能原因<FA name="exclamation-triangle" />
                    </div>
                    <div className="col-sm text-body">
                        <ul className="p-0">
                            <li>没有小号运行 {this.ui.appName}</li>
                            <li>用户 <b>{userName}</b> 没有加入任何一个运行{this.ui.appName}的小号</li>
                            {
                                predefinedUnit && 
                                <li>预设小号 <b>{predefinedUnit}</b> 没有运行App {this.ui.appName}</li>
                            }
                        </ul>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-3 font-weight-bold">小号{predefinedUnit}</div>
                    <div className="col-sm text-body">
                        预设小号定义在 public/unit.json 文件中。
                        定义了这个文件的程序，只能由url直接启动。
                        用户第一次访问app之后，会缓存在localStorage里。<br/>
                        如果要删去缓存的预定义Unit，logout然后再login。
                    </div>
                </div>
            </div>
        </Page>)
    }

    private async showMainPage() {
        // #tv-RwPBwMef-23-sheet-api-108
        let exHash = getExHash();
        if (exHash !== undefined) {
            let parts = exHash.split('-');
            if (parts.length > 3) {
                let action = parts[3];
                // sheet_debug 表示centerUrl是debug方式的
                if (action === 'sheet' || action === 'sheet_debug') {
                    let uqId = Number(parts[4]);
                    let sheetTypeId = Number(parts[5]);
                    let sheetId = Number(parts[6]);
                    let cUq = this.getCUqFromId(uqId);
                    if (cUq === undefined) {
                        alert('unknown uqId: ' + uqId);
                        return;
                    }
                    this.clearPrevPages();
                    await cUq.navSheet(sheetTypeId, sheetId);
                    return;
                }
            }
        }
        this.openVPage(this.VAppMain);
    }

    private getCUqFromId(uqId:number): CUq {
        for (let i in this.cUqCollection) {
            let cUq = this.cUqCollection[i];
            if (cUq.uq.id === uqId) return cUq;
        }
        return;
    }

    renderRow = (item: any, index: number):JSX.Element => {
        let {id, nick, name} = item;
        return <LMR className="px-3 py-2" right={'id: ' + id}>
            <div>{nick || name}</div>
        </LMR>;
    }
    onRowClick = async (item: any) => {
        appInFrame.unit = item.id; // 25;
        await this.start();
    }

    protected selectUnitPage = () => {
        return <Page header="选择小号" logout={true}>
            <List items={this.appUnits} item={{render: this.renderRow, onClick: this.onRowClick}}/>
        </Page>
    }
}

class VAppMain extends VPage<CApp> {
    async open(param?:any) {
        this.openPage(this.appPage);
    }

    render(param?:any) {
        return this.appContent();
    }

    protected appPage = () => {
        let {caption} = this.controller;
        return <Page header={caption} logout={async()=>{appInFrame.unit = undefined}}>
            {this.appContent()}
        </Page>;
    }

    protected appContent = () => {
        let {cUqArr} = this.controller;
        let content:any;
        if (cUqArr.length === 0) {
            content = <div className="text-danger">
                <FA name="" /> 此APP没有绑定任何的UQ
            </div>;
        }
        else {
            content = cUqArr.map((v,i) => <div key={i}>{v.render()}</div>);
        }
        return <>{content}</>;
    };
}
