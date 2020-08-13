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
import { nav, t, setGlobalRes } from "../components";
import { Controller } from '../vm';
import { UQsMan } from "../uq";
import { appInFrame } from "../net";
import { centerApi } from "./centerApi";
import { VUnitSelect, VErrorsPage, VStartError, VUnsupportedUnit } from "./vMain";
var CAppBase = /** @class */ (function (_super) {
    __extends(CAppBase, _super);
    // appName: owner/name
    function CAppBase(config) {
        var _this = _super.call(this, undefined) || this;
        _this.appConfig = config || nav.navSettings;
        var _a = _this.appConfig, appName = _a.appName, noUnit = _a.noUnit;
        _this.name = appName;
        if (appName === undefined) {
            throw new Error('appName like "owner/app" must be defined in MainConfig');
        }
        _this.noUnit = noUnit;
        return _this;
        //this._uqs = UQsMan._uqs;
        //this.version = version;
        //this.uqsMan = new UQsMan(this.name, tvs);
    }
    Object.defineProperty(CAppBase.prototype, "uqs", {
        get: function () { return this._uqs; },
        enumerable: false,
        configurable: true
    });
    CAppBase.prototype.internalT = function (str) {
        return t(str);
    };
    CAppBase.prototype.setRes = function (res) {
        setGlobalRes(res);
    };
    CAppBase.prototype.hookElements = function (elements) {
        if (elements === undefined)
            return;
        //nav.setSettings(appConfig);
        //let cApp:CApp = (await start(CApp, appConfig)) as CApp;
        for (var i in elements) {
            var el = document.getElementById(i);
            if (el) {
                elements[i](el);
            }
        }
    };
    ;
    CAppBase.prototype.beforeStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, appName, version, tvs, retErrors, predefinedUnit_1, user, _b, appUnit, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        this.onRoute();
                        if (!(nav.isInAppRouting === true || !nav.isRouting)) return [3 /*break*/, 2];
                        _a = this.appConfig, appName = _a.appName, version = _a.version, tvs = _a.tvs;
                        return [4 /*yield*/, UQsMan.load(appName, version, tvs)];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        this._uqs = UQsMan._uqs;
                        retErrors = UQsMan.errors;
                        predefinedUnit_1 = appInFrame.predefinedUnit;
                        user = nav.user;
                        if (!(user !== undefined && user.id > 0)) return [3 /*break*/, 4];
                        _b = this;
                        return [4 /*yield*/, centerApi.userAppUnits(UQsMan.value.id)];
                    case 3:
                        _b.appUnits = _c.sent();
                        if (this.noUnit === true)
                            return [2 /*return*/, true];
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
                                this.openVPage(VUnitSelect);
                                return [2 /*return*/, false];
                        }
                        _c.label = 4;
                    case 4:
                        if (retErrors !== undefined) {
                            this.openVPage(VErrorsPage, retErrors);
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                    case 5:
                        err_1 = _c.sent();
                        this.openVPage(VStartError, err_1);
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    CAppBase.prototype.afterStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (nav.isInAppRouting)
                    nav.resolveRoute();
                return [2 /*return*/];
            });
        });
    };
    CAppBase.prototype.userFromId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, centerApi.userFromId(userId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CAppBase.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        nav.isInAppRouting = true;
        return nav.on(args[0], args[1], args[2]);
    };
    CAppBase.prototype.onRoute = function () {
    };
    /*
    private async load(): Promise<string[]> {
        let {appOwner, appName} = this.uqsMan;
        let {localData} = this.uqsMan;
        let uqAppData:UqAppData = localData.get();
        if (!uqAppData || uqAppData.version !== this.version) {
            uqAppData = await loadAppUqs(appOwner, appName);
            if (!uqAppData.id) {
                return [
                    `${appOwner}/${appName}不存在。请仔细检查app全名。`
                ];
            }
            uqAppData.version = this.version;
            localData.set(uqAppData);
            //
            for (let uq of uqAppData.uqs) uq.newVersion = true;
        }
        let {id, uqs} = uqAppData;
        this.uqsMan.id = id;
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
    */
    CAppBase.prototype.showUnsupport = function (predefinedUnit) {
        nav.clear();
        this.openVPage(VUnsupportedUnit, predefinedUnit);
    };
    return CAppBase;
}(Controller));
export { CAppBase };
//# sourceMappingURL=CAppBase.js.map