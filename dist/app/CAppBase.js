var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import _ from 'lodash';
import { Controller, nav } from "../components";
import { UQsMan } from "../uq";
import { appInFrame, loadAppUqs } from "../net";
import { centerApi } from "./centerApi";
import { VUnitSelect, VErrorsPage, VStartError, VUnsupportedUnit } from "./vMain";
export class CAppBase extends Controller {
    // appName: owner/name
    constructor(config) {
        super(undefined);
        let { appName, version, tvs } = config;
        this.name = appName;
        if (appName === undefined) {
            throw new Error('appName like "owner/app" must be defined in MainConfig');
        }
        this.version = version;
        this.uqsMan = new UQsMan(this.name, tvs);
    }
    get uqs() { return this._uqs; }
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
                    this.appUnits = yield centerApi.userAppUnits(this.uqsMan.id);
                    switch (this.appUnits.length) {
                        case 0:
                            this.showUnsupport(predefinedUnit);
                            return false;
                        case 1:
                            let appUnit = this.appUnits[0].id;
                            if (appUnit === undefined || appUnit < 0 ||
                                (predefinedUnit !== undefined && appUnit !== predefinedUnit)) {
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
                this.openVPage(VStartError, err);
                return false;
            }
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let { appOwner, appName } = this.uqsMan;
            let { localData } = this.uqsMan;
            let uqAppData = localData.get();
            if (!uqAppData || uqAppData.version !== this.version) {
                uqAppData = yield loadAppUqs(appOwner, appName);
                uqAppData.version = this.version;
                localData.set(uqAppData);
                // 
                for (let uq of uqAppData.uqs)
                    uq.newVersion = true;
            }
            let { id, uqs } = uqAppData;
            this.uqsMan.id = id;
            yield this.uqsMan.init(uqs);
            let retErrors = yield this.uqsMan.load();
            if (retErrors.length === 0) {
                retErrors.push(...this.uqsMan.setTuidImportsLocal());
                if (retErrors.length === 0) {
                    this._uqs = this.uqsMan.buildUQs();
                    /*
                    _.merge(this.uqs, this.uqsMan.uqsColl);
                    for (let i in this.uqs) {
                        let p = i.indexOf('/');
                        if (p < 0) continue;
                        let uq = this.uqs[i];
                        
                        let n = i.substr(p+1);
                        let l = n.toLowerCase();
                        this.uqs[n] = uq;
                        if (l !== n) this.uqs[l] = uq;
                    }
                    */
                    return;
                }
            }
            return retErrors;
        });
    }
    showUnsupport(predefinedUnit) {
        nav.clear();
        this.openVPage(VUnsupportedUnit, predefinedUnit);
    }
}
//# sourceMappingURL=CAppBase.js.map