var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _ from 'lodash';
import { Controller, nav } from "../components";
import { Uqs } from "../uq";
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
            throw 'appName like "owner/app" must be defined in MainConfig';
        }
        this.version = version;
        this.tvs = tvs;
        this.appUqs = {};
        this.uqs = new Uqs(this.name);
    }
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
                this.openVPage(VStartError);
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
                // 
                for (let uq of uqAppData.uqs)
                    uq.newVersion = true;
            }
            let { id, uqs } = uqAppData;
            this.uqs.id = id;
            yield this.uqs.init(uqs);
            let retErrors = yield this.uqs.load();
            if (retErrors.length === 0) {
                retErrors.push(...this.uqs.setTuidImportsLocal());
                if (retErrors.length === 0) {
                    _.merge(this.appUqs, this.uqs.uqsColl);
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