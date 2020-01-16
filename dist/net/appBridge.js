var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _ from 'lodash';
import { nav } from '../components';
import { uid } from '../tool/uid';
import { uqTokenApi, callCenterapi, centerToken, setCenterToken } from './uqApi';
import { setSubAppWindow } from './wsChannel';
import { host } from './host';
const uqTokens = {};
export function logoutUqTokens() {
    for (let i in uqTokens) {
        uqTokens[i] = undefined;
    }
}
const noUnitError = 'no unit defined in unit.json or not logined in or website cannot be in test subdirectory';
const appsInFrame = {};
class AppInFrameClass {
    get unit() { return this._unit; } // unit id
    set unit(val) { this._unit = val; }
}
export let appInFrame = new AppInFrameClass();
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
    return __awaiter(this, void 0, void 0, function* () {
        var message = evt.data;
        switch (message.type) {
            case 'sub-frame-started':
                subFrameStarted(evt);
                break;
            case 'ws':
                //wsBridge.receive(message.msg);
                yield nav.onReceive(message.msg);
                break;
            case 'init-sub-win':
                yield initSubWin(message);
                break;
            case 'pop-app':
                this.console.log('///\\\\\\ pop-app');
                nav.navBack();
                break;
            case 'center-api':
                yield callCenterApiFromMessage(evt.source, message);
                break;
            case 'center-api-return':
                bridgeCenterApiReturn(message);
                break;
            case 'app-api':
                let ret = yield onReceiveAppApiMessage(message.hash, message.apiName);
                evt.source.postMessage({
                    type: 'app-api-return',
                    apiName: message.apiName,
                    db: ret.db,
                    url: ret.url,
                    token: ret.token
                }, "*");
                break;
            case 'app-api-return':
                console.log("app-api-return: %s", JSON.stringify(message));
                console.log('await onAppApiReturn(message);');
                yield onAppApiReturn(message);
                break;
            default:
                this.console.log('message: %s', JSON.stringify(message));
                break;
        }
    });
});
function subFrameStarted(evt) {
    var message = evt.data;
    let subWin = evt.source;
    setSubAppWindow(subWin);
    hideFrameBack(message.hash);
    let msg = _.clone(nav.user);
    msg.type = 'init-sub-win';
    subWin.postMessage(msg, '*');
}
function hideFrameBack(hash) {
    let el = document.getElementById(hash);
    if (el !== undefined)
        el.hidden = true;
}
function initSubWin(message) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('initSubWin: set nav.user', message);
        let user = nav.user = message; // message.user;
        setCenterToken(user.id, user.token);
        yield nav.showAppView();
    });
}
function onReceiveAppApiMessage(hash, apiName) {
    return __awaiter(this, void 0, void 0, function* () {
        let appInFrame = appsInFrame[hash];
        if (appInFrame === undefined)
            return { name: apiName, db: undefined, url: undefined, token: undefined };
        //let unit = getUnit();
        let { unit, predefinedUnit } = appInFrame;
        unit = unit || predefinedUnit;
        if (!unit) {
            console.error(noUnitError);
        }
        let parts = apiName.split('/');
        let param = { unit: unit, uqOwner: parts[0], uqName: parts[1], appOwner: parts[2], appName: parts[3] };
        console.log('uqTokenApi.uq onReceiveAppApiMessage', param);
        let ret = yield uqTokenApi.uq(param);
        let { db, url, token } = ret;
        return { name: apiName, db, url, token };
    });
}
function onAppApiReturn(message) {
    return __awaiter(this, void 0, void 0, function* () {
        let { apiName, db, url, urlTest, token } = message;
        let action = uqTokenActions[apiName];
        if (action === undefined) {
            throw new Error('error app api return');
            //return;
        }
        let realUrl = host.getUrlOrTest(db, url, urlTest);
        console.log('onAppApiReturn(message:any): url=' + url + ', real=' + realUrl);
        //action.url = realUrl;
        //action.token = token;
        action.resolve({
            name: apiName,
            db: db,
            url: realUrl,
            token: token,
        });
    });
}
export function setAppInFrame(appHash) {
    if (appHash) {
        let parts = appHash.split('-');
        let len = parts.length;
        if (len > 0) {
            let p = 1;
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
    let hash = document.location.hash;
    if (hash !== undefined && hash.length > 0) {
        let pos = hash.lastIndexOf('#tv-');
        if (pos < 0)
            pos = hash.lastIndexOf('#tvdebug-');
        return pos;
    }
    return -1;
}
export function getExHash() {
    let pos = getExHashPos();
    if (pos < 0)
        return undefined;
    return document.location.hash.substring(pos);
}
export function appUrl(url, unitId, page, param) {
    let u;
    for (;;) {
        u = uid();
        let a = appsInFrame[u];
        if (a === undefined) {
            appsInFrame[u] = { hash: u, unit: unitId };
            break;
        }
    }
    url += '#tv-' + u + '-' + unitId;
    if (page !== undefined) {
        url += '-' + page;
        if (param !== undefined) {
            for (let i = 0; i < param.length; i++) {
                url += '-' + param[i];
            }
        }
    }
    return { url: url, hash: u };
}
function getUnit() {
    let { unit, predefinedUnit } = appInFrame;
    let realUnit = unit || predefinedUnit;
    if (realUnit === undefined) {
        throw new Error(noUnitError);
    }
    return realUnit;
}
const uqTokenActions = {};
export function buildAppUq(uq, uqOwner, uqName, appOwner, appName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isBridged()) {
            let unit = getUnit();
            let uqToken = yield uqTokenApi.uq({ unit: unit, uqOwner: uqOwner, uqName: uqName, appOwner: appOwner, appName: appName });
            if (uqToken.token === undefined)
                uqToken.token = centerToken;
            let { db, url, urlTest } = uqToken;
            let realUrl = host.getUrlOrTest(db, url, urlTest);
            console.log('realUrl: %s', realUrl);
            uqToken.url = realUrl;
            uqTokens[uq] = uqToken;
            return uqToken;
        }
        console.log("**** before buildAppUq ****", appInFrame);
        let bp = uqTokenActions[uq];
        if (bp !== undefined)
            return;
        return new Promise((resolve, reject) => {
            uqTokenActions[uq] = {
                resolve: (at) => __awaiter(this, void 0, void 0, function* () {
                    let { db, url, token } = yield at;
                    uqTokens[uq] = { name: uq, db, url, token };
                    uqTokenActions[uq] = undefined;
                    console.log("**** after buildAppUq ****", appInFrame);
                    resolve();
                }),
                reject: reject,
            };
            (window.opener || window.parent).postMessage({
                type: 'app-api',
                apiName: uq,
                hash: appInFrame.hash,
            }, "*");
        });
    });
}
export function appUq(uq) {
    let uts = uqTokens;
    return uts[uq];
}
const brideCenterApis = {};
export function bridgeCenterApi(url, method, body) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('bridgeCenterApi: url=%s, method=%s', url, method);
        return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let callId;
            for (;;) {
                callId = uid();
                let bca = brideCenterApis[callId];
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
        }));
    });
}
function callCenterApiFromMessage(from, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let { callId, url, method, body } = message;
        let result = yield callCenterapi.directCall(url, method, body);
        from.postMessage({
            type: 'center-api-return',
            callId: callId,
            result: result,
        }, '*');
    });
}
function bridgeCenterApiReturn(message) {
    let { callId, result } = message;
    let bca = brideCenterApis[callId];
    if (bca === undefined)
        return;
    brideCenterApis[callId] = undefined;
    bca.resolve(result);
}
//# sourceMappingURL=appBridge.js.map