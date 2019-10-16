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
import _ from 'lodash';
import { nav } from '../components';
import { uid } from '../tool/uid';
import { uqTokenApi, callCenterapi, centerToken, setCenterToken } from './uqApi';
import { setSubAppWindow } from './wsChannel';
import { host } from './host';
var uqTokens = {};
export function logoutUqTokens() {
    for (var i in uqTokens) {
        uqTokens[i] = undefined;
    }
}
var appsInFrame = {};
var AppInFrameClass = /** @class */ (function () {
    function AppInFrameClass() {
    }
    Object.defineProperty(AppInFrameClass.prototype, "unit", {
        get: function () { return this._unit; } // unit id
        ,
        set: function (val) { this._unit = val; },
        enumerable: true,
        configurable: true
    });
    return AppInFrameClass;
}());
export var appInFrame = new AppInFrameClass();
/* {
    hash: undefined,
    get unit():number {return } undefined, //debugUnitId,
    page: undefined;
    param: undefined,
}*/
export function isBridged() {
    return window.self !== window.parent;
}
window.addEventListener('message', function (evt) {
    return __awaiter(this, void 0, void 0, function () {
        var message, _a, ret;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    message = evt.data;
                    _a = message.type;
                    switch (_a) {
                        case 'sub-frame-started': return [3 /*break*/, 1];
                        case 'ws': return [3 /*break*/, 2];
                        case 'init-sub-win': return [3 /*break*/, 4];
                        case 'pop-app': return [3 /*break*/, 6];
                        case 'center-api': return [3 /*break*/, 7];
                        case 'center-api-return': return [3 /*break*/, 9];
                        case 'app-api': return [3 /*break*/, 10];
                        case 'app-api-return': return [3 /*break*/, 12];
                    }
                    return [3 /*break*/, 14];
                case 1:
                    subFrameStarted(evt);
                    return [3 /*break*/, 15];
                case 2: 
                //wsBridge.receive(message.msg);
                return [4 /*yield*/, nav.onReceive(message.msg)];
                case 3:
                    //wsBridge.receive(message.msg);
                    _b.sent();
                    return [3 /*break*/, 15];
                case 4: return [4 /*yield*/, initSubWin(message)];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 6:
                    nav.navBack();
                    return [3 /*break*/, 15];
                case 7: return [4 /*yield*/, callCenterApiFromMessage(evt.source, message)];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 9:
                    bridgeCenterApiReturn(message);
                    return [3 /*break*/, 15];
                case 10: return [4 /*yield*/, onReceiveAppApiMessage(message.hash, message.apiName)];
                case 11:
                    ret = _b.sent();
                    evt.source.postMessage({
                        type: 'app-api-return',
                        apiName: message.apiName,
                        db: ret.db,
                        url: ret.url,
                        token: ret.token
                    }, "*");
                    return [3 /*break*/, 15];
                case 12:
                    console.log("app-api-return: %s", JSON.stringify(message));
                    console.log('await onAppApiReturn(message);');
                    return [4 /*yield*/, onAppApiReturn(message)];
                case 13:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 14:
                    this.console.log('message: %s', JSON.stringify(message));
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
});
function subFrameStarted(evt) {
    var message = evt.data;
    var subWin = evt.source;
    setSubAppWindow(subWin);
    hideFrameBack(message.hash);
    var msg = _.clone(nav.user);
    msg.type = 'init-sub-win';
    subWin.postMessage(msg, '*');
}
function hideFrameBack(hash) {
    var el = document.getElementById(hash);
    if (el !== undefined)
        el.hidden = true;
}
function initSubWin(message) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('initSubWin: set nav.user', message);
                    user = nav.user = message;
                    setCenterToken(user.id, user.token);
                    return [4 /*yield*/, nav.showAppView()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function onReceiveAppApiMessage(hash, apiName) {
    return __awaiter(this, void 0, void 0, function () {
        var appInFrame, unit, predefinedUnit, parts, param, ret, db, url, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appInFrame = appsInFrame[hash];
                    if (appInFrame === undefined)
                        return [2 /*return*/, { name: apiName, db: undefined, url: undefined, token: undefined }];
                    unit = appInFrame.unit, predefinedUnit = appInFrame.predefinedUnit;
                    unit = unit || predefinedUnit;
                    if (!unit) {
                        console.error('no unit defined in unit.json or not logined in', unit);
                    }
                    parts = apiName.split('/');
                    param = { unit: unit, uqOwner: parts[0], uqName: parts[1] };
                    console.log('uqTokenApi.uq onReceiveAppApiMessage', param);
                    return [4 /*yield*/, uqTokenApi.uq(param)];
                case 1:
                    ret = _a.sent();
                    db = ret.db, url = ret.url, token = ret.token;
                    return [2 /*return*/, { name: apiName, db: db, url: url, token: token }];
            }
        });
    });
}
function onAppApiReturn(message) {
    return __awaiter(this, void 0, void 0, function () {
        var apiName, db, url, urlTest, token, action, realUrl;
        return __generator(this, function (_a) {
            apiName = message.apiName, db = message.db, url = message.url, urlTest = message.urlTest, token = message.token;
            action = uqTokenActions[apiName];
            if (action === undefined) {
                throw new Error('error app api return');
                //return;
            }
            realUrl = host.getUrlOrTest(db, url, urlTest);
            console.log('onAppApiReturn(message:any): url=' + url + ', real=' + realUrl);
            //action.url = realUrl;
            //action.token = token;
            action.resolve({
                name: apiName,
                db: db,
                url: realUrl,
                token: token,
            });
            return [2 /*return*/];
        });
    });
}
export function setAppInFrame(appHash) {
    if (appHash) {
        var parts = appHash.split('-');
        var len = parts.length;
        if (len > 0) {
            var p = 1;
            appInFrame.hash = parts[p++];
            if (len > 0)
                appInFrame.unit = Number(parts[p++]);
            if (len > 1)
                appInFrame.page = parts[p++];
            if (len > 2)
                appInFrame.param = parts.slice(p++);
        }
    }
    return appInFrame;
}
export function getExHashPos() {
    var hash = document.location.hash;
    if (hash !== undefined && hash.length > 0) {
        var pos = hash.lastIndexOf('#tv-');
        if (pos < 0)
            pos = hash.lastIndexOf('#tvdebug-');
        return pos;
    }
    return -1;
}
export function getExHash() {
    var pos = getExHashPos();
    if (pos < 0)
        return undefined;
    return document.location.hash.substring(pos);
}
export function appUrl(url, unitId, page, param) {
    var u;
    for (;;) {
        u = uid();
        var a = appsInFrame[u];
        if (a === undefined) {
            appsInFrame[u] = { hash: u, unit: unitId };
            break;
        }
    }
    url += '#tv-' + u + '-' + unitId;
    if (page !== undefined) {
        url += '-' + page;
        if (param !== undefined) {
            for (var i = 0; i < param.length; i++) {
                url += '-' + param[i];
            }
        }
    }
    return { url: url, hash: u };
}
function getUnit() {
    var unit = appInFrame.unit, predefinedUnit = appInFrame.predefinedUnit;
    var realUnit = unit || predefinedUnit;
    if (realUnit === undefined) {
        throw new Error('no unit defined in unit.json or not logined in');
    }
    return realUnit;
}
var uqTokenActions = {};
export function buildAppUq(uq, uqOwner, uqName) {
    return __awaiter(this, void 0, void 0, function () {
        var unit, uqToken, db, url, urlTest, realUrl, bp;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!isBridged()) return [3 /*break*/, 2];
                    unit = getUnit();
                    return [4 /*yield*/, uqTokenApi.uq({ unit: unit, uqOwner: uqOwner, uqName: uqName })];
                case 1:
                    uqToken = _a.sent();
                    if (uqToken.token === undefined)
                        uqToken.token = centerToken;
                    db = uqToken.db, url = uqToken.url, urlTest = uqToken.urlTest;
                    realUrl = host.getUrlOrTest(db, url, urlTest);
                    console.log('realUrl: %s', realUrl);
                    uqToken.url = realUrl;
                    uqTokens[uq] = uqToken;
                    return [2 /*return*/, uqToken];
                case 2:
                    console.log("**** before buildAppUq ****", appInFrame);
                    bp = uqTokenActions[uq];
                    if (bp !== undefined)
                        return [2 /*return*/];
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            uqTokenActions[uq] = {
                                resolve: function (at) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, db, url, token;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, at];
                                            case 1:
                                                _a = _b.sent(), db = _a.db, url = _a.url, token = _a.token;
                                                uqTokens[uq] = {
                                                    name: uq,
                                                    db: db,
                                                    url: url,
                                                    token: token,
                                                };
                                                uqTokenActions[uq] = undefined;
                                                console.log("**** after buildAppUq ****", appInFrame);
                                                resolve();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                                reject: reject,
                            };
                            (window.opener || window.parent).postMessage({
                                type: 'app-api',
                                apiName: uq,
                                hash: appInFrame.hash,
                            }, "*");
                        })];
            }
        });
    });
}
export function appUq(uq) {
    var uts = uqTokens;
    return uts[uq];
}
var brideCenterApis = {};
export function bridgeCenterApi(url, method, body) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('bridgeCenterApi: url=%s, method=%s', url, method);
                    return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var callId, bca;
                            return __generator(this, function (_a) {
                                for (;;) {
                                    callId = uid();
                                    bca = brideCenterApis[callId];
                                    if (bca === undefined) {
                                        brideCenterApis[callId] = {
                                            id: callId,
                                            resolve: resolve,
                                            reject: reject,
                                        };
                                        break;
                                    }
                                }
                                (window.opener || window.parent).postMessage({
                                    type: 'center-api',
                                    callId: callId,
                                    url: url,
                                    method: method,
                                    body: body
                                }, '*');
                                return [2 /*return*/];
                            });
                        }); })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function callCenterApiFromMessage(from, message) {
    return __awaiter(this, void 0, void 0, function () {
        var callId, url, method, body, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    callId = message.callId, url = message.url, method = message.method, body = message.body;
                    return [4 /*yield*/, callCenterapi.directCall(url, method, body)];
                case 1:
                    result = _a.sent();
                    from.postMessage({
                        type: 'center-api-return',
                        callId: callId,
                        result: result,
                    }, '*');
                    return [2 /*return*/];
            }
        });
    });
}
function bridgeCenterApiReturn(message) {
    var callId = message.callId, result = message.result;
    var bca = brideCenterApis[callId];
    if (bca === undefined)
        return;
    brideCenterApis[callId] = undefined;
    bca.resolve(result);
}
//# sourceMappingURL=appBridge.js.map