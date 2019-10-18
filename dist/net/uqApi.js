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
/*
const uqLocalEntities = 'uqLocalEntities';
class CacheUqLocals {
    private local:UqLocals;

    async loadAccess(uqApi: UqApi):Promise<any> {
        try {
            let {uqOwner, uqName} = uqApi;
            if (this.local === undefined) {
                let ls = null; // localStorage.getItem(uqLocalEntities);
                if (ls !== null) {
                    this.local = JSON.parse(ls);
                }
            }
            if (this.local !== undefined) {
                let {user, uqs} = this.local;
                if (user !== loginedUserId || uqs === undefined) {
                    this.local = undefined;
                }
                else {
                    for (let i in uqs) {
                        let ul = uqs[i];
                        ul.isNet = undefined;
                    }
                }
            }
            if (this.local === undefined) {
                this.local = {
                    user: loginedUserId,
                    unit: undefined,
                    uqs: {}
                };
            }

            let ret: any;
            let un = uqOwner+'/'+uqName;
            let uq = this.local.uqs[un];
            if (uq !== undefined) {
                let {value} = uq;
                ret = value;
            }
            if (ret === undefined) {
                ret = await uqApi.__loadAccess();
                //this.saveLocal(un, ret);
            }
            return _.cloneDeep(ret);
        }
        catch (err) {
            this.local = undefined;
            localStorage.removeItem(uqLocalEntities);
            throw err;
        }
    }

    private saveLocal(uqName:string, accessValue: any) {
        this.local.uqs[uqName] = {
            value: accessValue,
            isNet: true,
        }
        let str = JSON.stringify(this.local);
        localStorage.setItem(uqLocalEntities, str);
    }

    async checkAccess(uqApi: UqApi):Promise<boolean> {
        if (this.local === undefined) return false;
        let {uqOwner, uqName} = uqApi;
        let un = uqOwner+'/'+uqName;
        let uq = this.local.uqs[un];
        if (uq === undefined) return false;
        let {isNet, value} = uq;
        if (isNet === true) return true;
        let ret = await uqApi.__loadAccess();
        let isMatch = _.isMatch(value, ret);
        if (isMatch === false) {
            this.saveLocal(un, ret);
            return false;
        }
        uq.isNet = true;
        return true;
    }
}

const localUqs = new CacheUqLocals;
*/
export class UqApi extends ApiBase {
    //uqVersion: number;
    constructor(basePath, uqOwner, uqName, access, showWaiting) {
        super(basePath, showWaiting);
        if (uqName) {
            this.uqOwner = uqOwner;
            this.uqName = uqName;
            this.uq = uqOwner + '/' + uqName;
        }
        this.access = access;
        this.showWaiting = showWaiting;
    }
    //setUqVersion(uqVersion:number) {this.uqVersion = undefined}
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield buildAppUq(this.uq, this.uqOwner, this.uqName);
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
                //debugger;
                yield this.init();
                uqToken = appUq(this.uq);
            }
            let { url, token } = uqToken;
            this.token = token;
            channel = new UqHttpChannel(url, token, channelUI);
            return channels[this.uq] = channel;
        });
    }
    /*async update():Promise<string> {
        return await this.get('update');
    }*/
    /*
    async __loadAccess():Promise<any> {
        let acc = this.access === undefined?
            '' :
            this.access.join('|');
        let ret = await this.get('access', {acc:acc});
        return ret;
    }
    */
    loadAccess() {
        return __awaiter(this, void 0, void 0, function* () {
            //return await localUqs.loadAccess(this);
            let acc = this.access === undefined ?
                '' :
                this.access.join('|');
            let ret = yield this.get('access', { acc: acc });
            return ret;
        });
    }
    /*async loadEntities():Promise<any> {
        return await this.get('entities');
    }*/
    /*
    async checkAccess():Promise<boolean> {
        return await localUqs.checkAccess(this);
    }
    */
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
        super('tv/', undefined, undefined, undefined, true);
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
                let uqToken = localCache.get();
                if (uqToken !== undefined) {
                    let { unit, user } = uqToken;
                    if (unit !== params.unit || user !== loginedUserId) {
                        localCache.remove();
                        uqToken = undefined;
                    }
                }
                let nowTick = Math.floor(Date.now() / 1000);
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
const appUqsName = 'appUqs';
export class CenterAppApi extends CenterApiBase {
    //private local: LocalCache = env.localDb.item(appUqsName);
    //private cachedUqs: UqAppData;
    uqs(appOwner, appName) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.get('tie/app-uqs', { appOwner: appOwner, appName: appName });
            return ret;
            /*
            let ret:UqAppData;
            let appUqs = this.local.get();
            if (appUqs) {
                let {appOwner:rAppOwner, appName:rAppName} = appUqs;
                if (appOwner === rAppOwner && appName === rAppName) ret = appUqs;
            }
            if (ret === undefined) {
                ret = await this.uqsPure(appOwner, appName);
                ret.appName = appName;
                ret.appOwner = appOwner;
                //localStorage.setItem(JSON.stringify(obj));
                this.local.set(ret);
            }
            //return this.cachedUqs = _.cloneDeep(ret);
            return ret;
            */
        });
    }
    uqsPure(appOwner, appName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/app-uqs', { appOwner: appOwner, appName: appName });
        });
    }
    /*
    private async isOkCheckUqs(appOwner:string, appName:string):Promise<boolean> {
        let ret = await this.uqsPure(appOwner, appName);
        let {id:cachedId, uqs:cachedUqs} = this.local.get(); //.cachedUqs;
        let {id:retId, uqs:retUqs} = ret;
        if (cachedId !== retId) return false;
        if (cachedUqs.length !== retUqs.length) return false;
        let len = cachedUqs.length;
        for (let i=0; i<len; i++) {
            if (_.isMatch(cachedUqs[i], retUqs[i]) === false) return false;
        }
        return true;
    }
    async checkUqs(appOwner:string, appName:string):Promise<boolean> {
        let ret = await this.isOkCheckUqs(appOwner, appName);
        if (ret === false) {
            this.local.remove();
            nav.start();
        }
        return ret;
    }
    */
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
        //let unit = meInFrame.unit;
        let ret = yield centerAppApi.uqs(appOwner, appName);
        //await centerAppApi.checkUqs(appOwner, appName);
        /*
        .then(v => {
            if (v === false) {
                localStorage.removeItem(appUqs);
                nav.start();
            }
        });
        */
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
}
export const userApi = new UserApi('tv/', undefined);
//# sourceMappingURL=uqApi.js.map