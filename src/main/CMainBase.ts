import _ from 'lodash';
import { Controller, nav } from "../components";
import { Uq, Tuid, Action, Sheet, Query, Map, Uqs } from "../uq";
import { appInFrame, loadAppUqs } from "../net";
import { centerApi } from "./centerApi";
import { VUnitSelect, VErrorsPage, VStartError, VUnsupportedUnit } from "./vMain";

type EntityType = Tuid | Action | Sheet | Query | Map;

interface AppUqs {
    [uqName: string]: {
        [entityName: string]: EntityType;
    }
}

interface TVs {
    [uqName:string]: {
        [tuidName: string]: (values: any) => JSX.Element;
    }
}

export interface MainConfig {
    appName: string;        // 格式: owner/appName
    version: string;        // 版本变化，缓存的uqs才会重载
    CMain?: new (config: MainConfig) => CMainBase;
    tvs: TVs;
    loginTop?: JSX.Element;
}

export abstract class CMainBase extends Controller {
    protected readonly name: string;
    protected readonly version: string;
    protected readonly appUqs: AppUqs;
    protected readonly tvs: TVs;

    readonly uqs: Uqs;
    appUnits:any[];

    // appName: owner/name
    constructor(config: MainConfig) {
        super(undefined);
        let {appName, version, tvs} = config;
        this.name = appName;
        if (appName === undefined) {
            throw 'appName like "owner/app" must be defined in MainConfig';
        }
        this.version = version;
        this.tvs = tvs;
        this.appUqs = {};
        this.uqs = new Uqs(this.name);
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
                this.appUnits = await centerApi.userAppUnits(this.uqs.id);
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
                        //nav.push(<this.selectUnitPage />)
                        this.openVPage(VUnitSelect);
                        return false;
                }
            }
            if (retErrors !== undefined) {
                this.openVPage(VErrorsPage);
                return false;
            }
            return true;
        }
        catch (err) {
            this.openVPage(VStartError);
            return false;
        }
    }

    private async load(): Promise<string[]> {
        let {appOwner, appName} = this.uqs;
        let {localData} = this.uqs;
        let uqAppData = localData.get();
        if (!uqAppData || uqAppData.version !== this.version) {
            uqAppData = await loadAppUqs(appOwner, appName);
            uqAppData.version = this.version;
            localData.set(uqAppData);
        }
        let {id, uqs} = uqAppData;
        this.uqs.id = id;

        //let retErrors:string[] = [];
        /*
        let promiseInits: PromiseLike<void>[] = [];
        let promises: PromiseLike<string>[] = [];
        for (let uqData of uqs) {
            let {id, uqOwner, uqName, access} = uqData;
            let uqFullName = uqOwner + '/' + uqName;
            let uqUI = this.ui.uqs[uqFullName] as UqUI || {};
            let cUq = this.newCUq(uqData, uqUI);
            this.cUqCollection[uqFullName] = cUq;
            this.uqs.addUq(cUq.uq);
            promiseInits.push(cUq.init());
        }
        await Promise.all(promiseInits);
        */
        await this.uqs.init(uqs);

        /*
        for (let i in this.uqs) {
            let cUq = this.cUqCollection[i];
            promises.push(cUq.loadEntities());
        }
        let results = await Promise.all(promises);
        for (let result of results)
        {
            let retError = result; // await cUq.loadSchema();
            if (retError !== undefined) {
                retErrors.push(retError);
                continue;
            }
        }
        */
        let retErrors = await this.uqs.load();
        if (retErrors.length === 0) {
            retErrors.push(...this.uqs.setTuidImportsLocal());
            if (retErrors.length === 0) {
                _.merge(this.appUqs, this.uqs.uqsColl);
                return;
            }
        }
        return retErrors;
    }

    private showUnsupport(predefinedUnit: number) {
        nav.clear();
        this.openVPage(VUnsupportedUnit, predefinedUnit);
    }
}
