var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//import _ from 'lodash';
import { nav, Controller, resLang } from '../../components';
import { loadAppUqs, appInFrame, getExHash } from '../../net';
import { CUq } from '../cUq';
import { centerApi } from '../centerApi';
import { UQsMan } from '../../uq';
import { VUnsupportedUnit, VAppMain, VUnitSelect, VErrorsPage, VAppStartError } from './vApp';
var CApp = /** @class */ (function (_super) {
    __extends(CApp, _super);
    function CApp(ui) {
        var _this = _super.call(this, resLang(ui && ui.res)) || this;
        _this.cUqCollection = {};
        _this.cImportUqs = {};
        nav.setSettings(ui);
        _this.name = ui.appName;
        _this.version = ui.version;
        if (_this.name === undefined) {
            throw new Error('appName like "owner/app" must be defined in UI');
        }
        _this.uqs = new UQsMan(_this.name, undefined);
        if (ui.uqs === undefined)
            ui.uqs = {};
        _this.ui = ui;
        _this.caption = _this.res.caption || 'Tonva';
        return _this;
    }
    CApp.prototype.getImportUq = function (uqOwner, uqName) {
        var uq = uqOwner + '/' + uqName;
        var cUq = this.cImportUqs[uq];
        if (cUq !== undefined)
            return cUq;
        //let ui = this.ui && this.ui.uqs && this.ui.uqs[uq];
        //let uqId = -1; // unknown
        this.cImportUqs[uq] = cUq = this.getCUq(uq);
        return cUq;
    };
    CApp.prototype.newCUq = function (uqData, uqUI) {
        var cUq = new (this.ui.CUq || CUq)(this, uqData, uqUI);
        Object.setPrototypeOf(cUq.x, this.x);
        return cUq;
    };
    Object.defineProperty(CApp.prototype, "cUqArr", {
        get: function () {
            var ret = [];
            for (var i in this.cUqCollection) {
                ret.push(this.cUqCollection[i]);
            }
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    CApp.prototype.getCUq = function (uq) {
        return this.cUqCollection[uq];
    };
    Object.defineProperty(CApp.prototype, "VAppMain", {
        get: function () { return (this.ui && this.ui.main) || VAppMain; },
        enumerable: true,
        configurable: true
    });
    CApp.prototype.beforeStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var retErrors, predefinedUnit_1, user, _a, appUnit, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.load()];
                    case 1:
                        retErrors = _b.sent();
                        predefinedUnit_1 = appInFrame.predefinedUnit;
                        user = nav.user;
                        if (!(user !== undefined && user.id > 0)) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, centerApi.userAppUnits(this.uqs.id)];
                    case 2:
                        _a.appUnits = _b.sent();
                        switch (this.appUnits.length) {
                            case 0:
                                this.showUnsupport(predefinedUnit_1);
                                return [2 /*return*/, false];
                            case 1:
                                appUnit = this.appUnits[0].id;
                                if (appUnit === undefined || appUnit < 0 ||
                                    (predefinedUnit_1 !== undefined && appUnit !== predefinedUnit_1)) {
                                    this.showUnsupport(predefinedUnit_1);
                                    return [2 /*return*/, false];
                                }
                                appInFrame.unit = appUnit;
                                break;
                            default:
                                if (predefinedUnit_1 > 0 && this.appUnits.find(function (v) { return v.id === predefinedUnit_1; }) !== undefined) {
                                    appInFrame.unit = predefinedUnit_1;
                                    break;
                                }
                                //nav.push(<this.selectUnitPage />)
                                this.openVPage(VUnitSelect);
                                return [2 /*return*/, false];
                        }
                        _b.label = 3;
                    case 3:
                        if (retErrors !== undefined) {
                            this.openVPage(VErrorsPage);
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                    case 4:
                        err_1 = _b.sent();
                        this.openVPage(VAppStartError);
                        return [2 /*return*/, false];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, appOwner, appName, localData, uqAppData, _i, _b, uq, id, uqs, retErrors, promiseInits, promises, _c, uqs_1, uqData, uqOwner, uqName, uqFullName, uqUI, cUq, i, cUq, results, _d, results_1, result, retError;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this.uqs, appOwner = _a.appOwner, appName = _a.appName;
                        localData = this.uqs.localData;
                        uqAppData = localData.get();
                        if (!(!uqAppData || uqAppData.version !== this.version)) return [3 /*break*/, 2];
                        return [4 /*yield*/, loadAppUqs(appOwner, appName)];
                    case 1:
                        uqAppData = _e.sent();
                        uqAppData.version = this.version;
                        localData.set(uqAppData);
                        for (_i = 0, _b = uqAppData.uqs; _i < _b.length; _i++) {
                            uq = _b[_i];
                            uq.newVersion = true;
                        }
                        _e.label = 2;
                    case 2:
                        id = uqAppData.id, uqs = uqAppData.uqs;
                        this.uqs.id = id;
                        retErrors = [];
                        promiseInits = [];
                        promises = [];
                        for (_c = 0, uqs_1 = uqs; _c < uqs_1.length; _c++) {
                            uqData = uqs_1[_c];
                            uqOwner = uqData.uqOwner, uqName = uqData.uqName;
                            uqFullName = uqOwner + '/' + uqName;
                            uqUI = this.ui.uqs[uqFullName] || {};
                            cUq = this.newCUq(uqData, uqUI);
                            this.cUqCollection[uqFullName] = cUq;
                            this.uqs.addUq(cUq.uq);
                            promiseInits.push(cUq.init());
                        }
                        return [4 /*yield*/, Promise.all(promiseInits)];
                    case 3:
                        _e.sent();
                        for (i in this.cUqCollection) {
                            cUq = this.cUqCollection[i];
                            promises.push(cUq.loadEntities());
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 4:
                        results = _e.sent();
                        for (_d = 0, results_1 = results; _d < results_1.length; _d++) {
                            result = results_1[_d];
                            retError = result;
                            if (retError !== undefined) {
                                retErrors.push(retError);
                                continue;
                            }
                        }
                        if (retErrors.length === 0) {
                            retErrors.push.apply(retErrors, this.uqs.setTuidImportsLocal());
                            if (retErrors.length === 0) {
                                return [2 /*return*/];
                            }
                        }
                        return [2 /*return*/, retErrors];
                }
            });
        });
    };
    CApp.prototype.internalStart = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (param !== true) {
                            this.clearPrevPages();
                        }
                        return [4 /*yield*/, this.showMainPage()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /*
    render(): JSX.Element {
        return this.renderView(this.VAppMain);
    }*/
    // 如果是独立app，删去显示app之前的页面。
    // 如果非独立app，则不删
    CApp.prototype.clearPrevPages = function () {
        nav.clear();
    };
    CApp.prototype.showUnsupport = function (predefinedUnit) {
        this.clearPrevPages();
        this.openVPage(VUnsupportedUnit, predefinedUnit);
    };
    CApp.prototype.showMainPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var exHash, parts, action, uqId, sheetTypeId, sheetId, cUq;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exHash = getExHash();
                        if (!(exHash !== undefined)) return [3 /*break*/, 2];
                        parts = exHash.split('-');
                        if (!(parts.length > 3)) return [3 /*break*/, 2];
                        action = parts[3];
                        if (!(action === 'sheet' || action === 'sheet_debug')) return [3 /*break*/, 2];
                        uqId = Number(parts[4]);
                        sheetTypeId = Number(parts[5]);
                        sheetId = Number(parts[6]);
                        cUq = this.getCUqFromId(uqId);
                        if (cUq === undefined) {
                            alert('unknown uqId: ' + uqId);
                            return [2 /*return*/];
                        }
                        this.clearPrevPages();
                        return [4 /*yield*/, cUq.navSheet(sheetTypeId, sheetId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        this.openVPage(this.VAppMain);
                        return [2 /*return*/];
                }
            });
        });
    };
    CApp.prototype.getCUqFromId = function (uqId) {
        for (var i in this.cUqCollection) {
            var cUq = this.cUqCollection[i];
            if (cUq.uq.id === uqId)
                return cUq;
        }
        return;
    };
    return CApp;
}(Controller));
export { CApp };
//# sourceMappingURL=CApp.js.map