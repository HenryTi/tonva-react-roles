var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { nav, Controller, resLang } from '../../components';
import { loadAppUqs, appInFrame, getExHash } from '../../net';
import { CUq } from '../cUq';
import { centerApi } from '../centerApi';
import { Uqs } from '../../uq';
import { VUnsupportedUnit, VAppMain, VUnitSelect, VErrorsPage, VAppStartError } from './vApp';
export class CApp extends Controller {
    constructor(ui) {
        super(resLang(ui && ui.res));
        this.cUqCollection = {};
        this.cImportUqs = {};
        nav.setSettings(ui);
        this.name = ui.appName;
        this.version = ui.version;
        if (this.name === undefined) {
            throw 'appName like "owner/app" must be defined in UI';
        }
        this.uqs = new Uqs(this.name);
        if (ui.uqs === undefined)
            ui.uqs = {};
        this.ui = ui;
        this.caption = this.res.caption || 'Tonva';
    }
    getImportUq(uqOwner, uqName) {
        let uq = uqOwner + '/' + uqName;
        let cUq = this.cImportUqs[uq];
        if (cUq !== undefined)
            return cUq;
        let ui = this.ui && this.ui.uqs && this.ui.uqs[uq];
        let uqId = -1; // unknown
        this.cImportUqs[uq] = cUq = this.getCUq(uq);
        return cUq;
    }
    newCUq(uqData, uqUI) {
        let cUq = new (this.ui.CUq || CUq)(this, uqData, uqUI);
        Object.setPrototypeOf(cUq.x, this.x);
        return cUq;
    }
    get cUqArr() {
        let ret = [];
        for (let i in this.cUqCollection) {
            ret.push(this.cUqCollection[i]);
        }
        return ret;
    }
    getCUq(uq) {
        return this.cUqCollection[uq];
    }
    get VAppMain() { return (this.ui && this.ui.main) || VAppMain; }
    beforeStart() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let retErrors = yield this.load();
                //let app = await loadAppUqs(this.appOwner, this.appName);
                // if (isDevelopment === true) {
                // 这段代码原本打算只是在程序员调试方式下使用，实际上，也可以开放给普通用户，production方式下
                let { predefinedUnit } = appInFrame;
                //let {id} = app;
                //this.id = id;
                let { user } = nav;
                if (user !== undefined && user.id > 0) {
                    this.appUnits = yield centerApi.userAppUnits(this.uqs.id);
                    switch (this.appUnits.length) {
                        case 0:
                            this.showUnsupport(predefinedUnit);
                            return false;
                        case 1:
                            let appUnit = this.appUnits[0].id;
                            if (appUnit === undefined || appUnit < 0 ||
                                predefinedUnit !== undefined && appUnit != predefinedUnit) {
                                this.showUnsupport(predefinedUnit);
                                return false;
                            }
                            appInFrame.unit = appUnit;
                            break;
                        default:
                            if (predefinedUnit > 0 && this.appUnits.find(v => v.id === predefinedUnit) !== undefined) {
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
                this.openVPage(VAppStartError);
                return false;
            }
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let { appOwner, appName } = this.uqs;
            let { localData } = this.uqs;
            let uqAppData = localData.get();
            if (!uqAppData || uqAppData.version !== this.version) {
                uqAppData = yield loadAppUqs(appOwner, appName);
                uqAppData.version = this.version;
                localData.set(uqAppData);
            }
            let { id, uqs } = uqAppData;
            this.uqs.id = id;
            let retErrors = [];
            let promiseInits = [];
            let promises = [];
            for (let uqData of uqs) {
                let { id, uqOwner, uqName, access } = uqData;
                let uqFullName = uqOwner + '/' + uqName;
                let uqUI = this.ui.uqs[uqFullName] || {};
                let cUq = this.newCUq(uqData, uqUI);
                this.cUqCollection[uqFullName] = cUq;
                this.uqs.addUq(cUq.uq);
                promiseInits.push(cUq.init());
            }
            yield Promise.all(promiseInits);
            for (let i in this.cUqCollection) {
                let cUq = this.cUqCollection[i];
                promises.push(cUq.loadEntities());
            }
            let results = yield Promise.all(promises);
            for (let result of results) {
                let retError = result; // await cUq.loadSchema();
                if (retError !== undefined) {
                    retErrors.push(retError);
                    continue;
                }
            }
            if (retErrors.length === 0) {
                retErrors.push(...this.uqs.setTuidImportsLocal());
                if (retErrors.length === 0) {
                    return;
                }
            }
            return retErrors;
        });
    }
    internalStart(param) {
        return __awaiter(this, void 0, void 0, function* () {
            if (param !== true) {
                this.clearPrevPages();
            }
            yield this.showMainPage();
        });
    }
    /*
    render(): JSX.Element {
        return this.renderView(this.VAppMain);
    }*/
    // 如果是独立app，删去显示app之前的页面。
    // 如果非独立app，则不删
    clearPrevPages() {
        nav.clear();
    }
    showUnsupport(predefinedUnit) {
        this.clearPrevPages();
        this.openVPage(VUnsupportedUnit, predefinedUnit);
    }
    showMainPage() {
        return __awaiter(this, void 0, void 0, function* () {
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
                        yield cUq.navSheet(sheetTypeId, sheetId);
                        return;
                    }
                }
            }
            this.openVPage(this.VAppMain);
        });
    }
    getCUqFromId(uqId) {
        for (let i in this.cUqCollection) {
            let cUq = this.cUqCollection[i];
            if (cUq.uq.id === uqId)
                return cUq;
        }
        return;
    }
}
//# sourceMappingURL=CApp.js.map