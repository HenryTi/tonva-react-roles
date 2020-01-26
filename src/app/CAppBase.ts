//import _ from 'lodash';
import { Controller, nav } from "../components";
import { Tuid, Action, Sheet, Query, Map, UQsMan, TVs, UqMan } from "../uq";
import { appInFrame, loadAppUqs, UqAppData } from "../net";
import { centerApi } from "./centerApi";
import { VUnitSelect, VErrorsPage, VStartError, VUnsupportedUnit } from "./vMain";

export interface IConstructor<T> {
    new (...args: any[]): T;
}

export interface AppConfig {
    appName: string;        // 格式: owner/appName
    version: string;        // 版本变化，缓存的uqs才会重载
    tvs: TVs;
    uqNameMap?: {[uqName:string]: string};      // uqName='owner/uq' 映射到内存简单名字：uq, 可以注明映射，也可以自动。有可能重
    loginTop?: JSX.Element;
    oem?: string;               // 用户注册发送验证码的oem厂家，默认同花
    privacy?: string;
}

export abstract class CAppBase extends Controller {
    protected _uqs: any;

    protected readonly name: string;
    protected readonly version: string;

    readonly uqsMan: UQsMan;
    private _mainUqId: number;
    private mainUqMan: UqMan;
    appUnits:any[];
    roles: number;

    // appName: owner/name
    constructor(config: AppConfig) {
        super(undefined);
        let {appName, version, tvs} = config;
        this.name = appName;
        if (appName === undefined) {
            throw new Error('appName like "owner/app" must be defined in MainConfig');
        }
        this.version = version;
        this.uqsMan = new UQsMan(this.name, tvs);
    }

    get uqs(): any {return this._uqs;}

    set mainUqId(value: number) {
        this._mainUqId = value;
        this.mainUqMan = this.uqsMan.getUqManFromId(value);
    }    

    hasRole(role: string): boolean {
        if (this.mainUqMan === undefined) return true;
        return this.mainUqMan.hasRole(role, this.roles);
    }

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
                this.appUnits = await centerApi.userAppUnits(this.uqsMan.appId);
                switch (this.appUnits.length) {
                    case 0:
                        this.showUnsupport(predefinedUnit);
                        return false;
                    case 1:
                        let {id:appUnit, roles, mainUqId} = this.appUnits[0];
                        if (appUnit === undefined || appUnit < 0 || 
                            (predefinedUnit !== undefined && appUnit !== predefinedUnit))
                        {
                            this.showUnsupport(predefinedUnit);
                            return false;
                        }
                        appInFrame.unit = appUnit;
                        this.roles = roles;
                        this.mainUqId = mainUqId;
                        break;
                    default:
                        if (predefinedUnit>0 && this.appUnits.find(v => v.id===predefinedUnit) !== undefined) {
                            appInFrame.unit = predefinedUnit;
                            break;
                        }
                        this.openVPage(VUnitSelect);
                        return false;
                }
            }
            if (retErrors !== undefined) {
                this.openVPage(VErrorsPage, retErrors);
                return false;
            }
            return true;
        }
        catch (err) {
            this.openVPage(VStartError, err);
            return false;
        }
    }

    async userFromId(userId:number):Promise<any> {
        return await centerApi.userFromId(userId);
    }

    private async load(): Promise<string[]> {
        try {
            let {appOwner, appName} = this.uqsMan;
            let {localData} = this.uqsMan;
            let uqAppData:UqAppData = localData.get();
            if (!uqAppData || uqAppData.version !== this.version) {
                uqAppData = await loadAppUqs(appOwner, appName);
                uqAppData.version = this.version;
                localData.set(uqAppData);
                for (let uq of uqAppData.uqs) uq.newVersion = true;
            }
            let {id, uqs} = uqAppData;
            this.uqsMan.appId = id;
            await this.uqsMan.init(uqs);
            let retErrors = await this.uqsMan.load();
            if (retErrors.length === 0) {
                retErrors.push(...this.uqsMan.setTuidImportsLocal());
                if (retErrors.length === 0) {
                    this._uqs = this.uqsMan.buildUQs();
                    return;
                }
            }
            return retErrors;
        }
        catch (err) {
            debugger;
            console.error(err);
        }
    }

    private showUnsupport(predefinedUnit: number) {
        nav.clear();
        this.openVPage(VUnsupportedUnit, predefinedUnit);
    }
}
