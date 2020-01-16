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
import { CenterHttpChannel, UqHttpChannel } from './httpChannel';
import { HttpChannelNavUI } from './httpChannelUI';
import { appUq, logoutUqTokens, buildAppUq } from './appBridge';
import { ApiBase } from './apiBase';
import { host } from './host';
import { env } from '../tool';
import { decodeUserToken } from '../tool/user';
let channelUIs = {};
let channelNoUIs = {};
export function logoutApis() {
    channelUIs = {};
    channelNoUIs = {};
    logoutUnitxApis();
    logoutUqTokens();
}
export class UqApi extends ApiBase {
    constructor(basePath, appOwner, appName, uqOwner, uqName, access, showWaiting) {
        super(basePath, showWaiting);
        this.appOwner = appOwner;
        this.appName = appName;
        if (uqName) {
            this.uqOwner = uqOwner;
            this.uqName = uqName;
            this.uq = uqOwner + '/' + uqName;
        }
        this.access = access;
        this.showWaiting = showWaiting;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield buildAppUq(this.uq, this.uqOwner, this.uqName, this.appOwner, this.appName);
        });
    }
    getHttpChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            let channels;
            let channelUI;
            if (this.showWaiting === true || this.showWaiting === undefined) {
                channels = channelUIs;
                channelUI = new HttpChannelNavUI();
            }
            else {
                channels = channelNoUIs;
            }
            let channel = channels[this.uq];
            if (channel !== undefined)
                return channel;
            let uqToken = appUq(this.uq); //, this.uqOwner, this.uqName);
            if (!uqToken) {
                yield this.init();
                uqToken = appUq(this.uq);
            }
            let { url, token } = uqToken;
            this.token = token;
            channel = new UqHttpChannel(url, token, channelUI);
            return channels[this.uq] = channel;
        });
    }
    loadAccess() {
        return __awaiter(this, void 0, void 0, function* () {
            let acc = this.access === undefined ?
                '' :
                this.access.join('|');
            let ret = yield this.get('access', { acc: acc });
            return ret;
        });
    }
    schema(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('schema/' + name);
        });
    }
    queueModify(start, page, entities) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('queue-modify', { start: start, page: page, entities: entities });
        });
    }
}
let channels = {};
export function logoutUnitxApis() {
    channels = {};
}
export class UnitxApi extends UqApi {
    constructor(unitId) {
        super('tv/', undefined, undefined, undefined, undefined, undefined, true);
        this.unitId = unitId;
    }
    getHttpChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            let channel = channels[this.unitId];
            if (channel !== undefined)
                return channel;
            return channels[this.unitId] = yield this.buildChannel();
        });
    }
    buildChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            let channelUI = new HttpChannelNavUI();
            let centerAppApi = new CenterAppApi('tv/', undefined);
            let ret = yield centerAppApi.unitxUq(this.unitId);
            let { token, db, url, urlTest } = ret;
            let realUrl = host.getUrlOrTest(db, url, urlTest);
            this.token = token;
            return new UqHttpChannel(realUrl, token, channelUI);
        });
    }
}
let centerHost;
export function setCenterUrl(url) {
    console.log('setCenterUrl %s', url);
    centerHost = url;
    centerToken = undefined;
    centerChannel = undefined;
    centerChannelUI = undefined;
}
export let centerToken = undefined;
let loginedUserId = 0;
export function setCenterToken(userId, t) {
    loginedUserId = userId;
    centerToken = t;
    console.log('setCenterToken %s', t);
    centerChannel = undefined;
    centerChannelUI = undefined;
}
let centerChannelUI;
let centerChannel;
function getCenterChannelUI() {
    if (centerChannelUI !== undefined)
        return centerChannelUI;
    return centerChannelUI = new CenterHttpChannel(centerHost, centerToken, new HttpChannelNavUI());
}
function getCenterChannel() {
    if (centerChannel !== undefined)
        return centerChannel;
    return centerChannel = new CenterHttpChannel(centerHost, centerToken);
}
export class CenterApiBase extends ApiBase {
    /*
    constructor(path: string, showWaiting?: boolean) {
        super(path, showWaiting);
    }*/
    getHttpChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            return (this.showWaiting === true || this.showWaiting === undefined) ?
                getCenterChannelUI() :
                getCenterChannel();
        });
    }
}
const uqTokensName = 'uqTokens';
export class UqTokenApi extends CenterApiBase {
    constructor() {
        super(...arguments);
        this.localMap = env.localDb.map(uqTokensName);
    }
    uq(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let { uqOwner, uqName } = params;
            let un = uqOwner + '/' + uqName;
            let localCache = this.localMap.child(un);
            try {
                let nowTick = Math.floor(Date.now() / 1000);
                let uqToken = localCache.get();
                if (uqToken !== undefined) {
                    let { unit, user } = uqToken;
                    if (unit !== params.unit || user !== loginedUserId) {
                        localCache.remove();
                        uqToken = undefined;
                    }
                }
                if (uqToken !== undefined) {
                    let { tick, value } = uqToken;
                    if (value !== undefined && (nowTick - tick) < 24 * 3600) {
                        return _.clone(value);
                    }
                }
                let appUqParams = _.clone(params);
                appUqParams.testing = host.testing;
                let ret = yield this.get('app-uq', appUqParams);
                if (ret === undefined) {
                    let { unit, uqOwner, uqName } = params;
                    let err = `center get app-uq(unit=${unit}, '${uqOwner}/${uqName}') - not exists or no unit-service`;
                    throw err;
                }
                uqToken = {
                    unit: params.unit,
                    user: loginedUserId,
                    tick: nowTick,
                    value: ret,
                };
                localCache.set(uqToken);
                return _.clone(ret);
            }
            catch (err) {
                localCache.remove();
                throw err;
            }
        });
    }
}
export const uqTokenApi = new UqTokenApi('tv/tie/', undefined);
export class CallCenterApi extends CenterApiBase {
    directCall(url, method, body) {
        return this.call(url, method, body);
    }
}
export const callCenterapi = new CallCenterApi('', undefined);
export class CenterAppApi extends CenterApiBase {
    uqs(appOwner, appName) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.get('tie/app-uqs', { appOwner, appName });
            return ret;
        });
    }
    unitxUq(unit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/unitx-uq', { unit: unit });
        });
    }
    changePassword(param) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('tie/change-password', param);
        });
    }
}
export function loadAppUqs(appOwner, appName) {
    return __awaiter(this, void 0, void 0, function* () {
        let centerAppApi = new CenterAppApi('tv/', undefined);
        let ret = yield centerAppApi.uqs(appOwner, appName);
        return ret;
    });
}
;
export class UserApi extends CenterApiBase {
    login(params) {
        return __awaiter(this, void 0, void 0, function* () {
            //(params as any).device = nav.local.device.get();
            let ret = yield this.get('user/login', params);
            switch (typeof ret) {
                default: return;
                case 'string': return decodeUserToken(ret);
                case 'object':
                    let token = ret.token;
                    let user = decodeUserToken(token);
                    let { nick, icon } = ret;
                    if (nick)
                        user.nick = nick;
                    if (icon)
                        user.icon = icon;
                    return user;
            }
            // !== undefined) return decodeToken(token);
        });
    }
    register(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('user/register', params);
        });
    }
    sendVerify(account, type, oem) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('user/set-verify', { account: account, type: type, oem: oem });
        });
    }
    checkVerify(account, verify) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('user/check-verify', { account: account, verify: verify });
        });
    }
    isExists(account) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('user/is-exists', { account: account });
        });
    }
    resetPassword(account, password, verify, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('user/reset-password', { account: account, password, verify, type });
        });
    }
    userSetProp(prop, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('tie/user-set-prop', { prop: prop, value: value });
        });
    }
    me() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/me');
        });
    }
    user(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/user', { id: id });
        });
    }
}
export const userApi = new UserApi('tv/', undefined);
//# sourceMappingURL=uqApi.js.map