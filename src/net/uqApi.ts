import _ from 'lodash';
import {HttpChannel, CenterHttpChannel, UqHttpChannel} from './httpChannel';
import {HttpChannelNavUI} from './httpChannelUI';
import {appUq, logoutUqTokens, buildAppUq} from './appBridge';
import {ApiBase} from './apiBase';
import { host } from './host';
import { LocalMap, env } from '../tool';
import {decodeUserToken} from '../tool/user';

let channelUIs:{[name:string]: HttpChannel} = {};
let channelNoUIs:{[name:string]: HttpChannel} = {};

export function logoutApis() {
    channelUIs = {};
    channelNoUIs = {};
    logoutUnitxApis();
    logoutUqTokens();
}

interface UqLocal {
    user: number;
    unit: number;
    value: any;
    tick?: number;
    isNet?: boolean;
}

export class UqApi extends ApiBase {
    private access:string[];
    appOwner:string;
    appName:string;
    uqOwner: string;
    uqName: string;
    uq: string;

    constructor(basePath:string, appOwner:string, appName:string, uqOwner:string, uqName:string, access:string[], showWaiting?: boolean) {
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

    async init() {
        await buildAppUq(this.uq, this.uqOwner, this.uqName, this.appOwner, this.appName);
    }

    protected async getHttpChannel(): Promise<HttpChannel> {
        let channels: {[name:string]: HttpChannel};
        let channelUI: HttpChannelNavUI;
        if (this.showWaiting === true || this.showWaiting === undefined) {
            channels = channelUIs;
            channelUI = new HttpChannelNavUI();
        }
        else {
            channels = channelNoUIs;
        }
        let channel = channels[this.uq];
        if (channel !== undefined) return channel;
        let uqToken = appUq(this.uq); //, this.uqOwner, this.uqName);
        if (!uqToken) {
            await this.init();
            uqToken = appUq(this.uq);
        }
        let {url, token} = uqToken;
        this.token = token;
        channel = new UqHttpChannel(url, token, channelUI);
        return channels[this.uq] = channel;
    }

    async loadAccess():Promise<any> {
        let acc = this.access === undefined?
            '' :
            this.access.join('|');
        let ret = await this.get('access', {acc:acc});
        return ret;
    }

    async schema(name:string):Promise<any> {
        return await this.get('schema/' + name);
    }

    async queueModify(start:number, page:number, entities:string) {
        return await this.post('queue-modify', {start:start, page:page, entities:entities});
    }
}

let channels:{[unitId:number]: HttpChannel} = {};

export function logoutUnitxApis() {
    channels = {};
}

export class UnitxApi extends UqApi {
    private unitId:number;
    constructor(unitId:number) {
        super('tv/', undefined, undefined, undefined, undefined, undefined, true);
        this.unitId = unitId;
    }

    protected async getHttpChannel(): Promise<HttpChannel> {
        let channel = channels[this.unitId];
        if (channel !== undefined) return channel;
        return channels[this.unitId] = await this.buildChannel();
    }

    private async buildChannel():Promise<HttpChannel> {
        let channelUI = new HttpChannelNavUI();
        let centerAppApi = new CenterAppApi('tv/', undefined);
        let ret = await centerAppApi.unitxUq(this.unitId);
        let {token, db, url, urlTest} = ret;
        let realUrl = host.getUrlOrTest(db, url, urlTest);
        this.token = token;
        return new UqHttpChannel(realUrl, token, channelUI);
    }
}

let centerHost:string;

export function setCenterUrl(url:string) {
    console.log('setCenterUrl %s', url);
    centerHost = url;
    centerToken = undefined;
    centerChannel = undefined;
    centerChannelUI = undefined;
}

export let centerToken:string|undefined = undefined;

let loginedUserId:number = 0;
export function setCenterToken(userId:number, t?:string) {
    loginedUserId = userId;
    centerToken = t;
    console.log('setCenterToken %s', t);
    centerChannel = undefined;
    centerChannelUI = undefined;
}

let centerChannelUI:HttpChannel;
let centerChannel:HttpChannel;
function getCenterChannelUI():HttpChannel {
    if (centerChannelUI !== undefined) return centerChannelUI;
    return centerChannelUI = new CenterHttpChannel(centerHost, centerToken, new HttpChannelNavUI());
}
function getCenterChannel():HttpChannel {
    if (centerChannel !== undefined) return centerChannel;
    return centerChannel = new CenterHttpChannel(centerHost, centerToken);
}

export abstract class CenterApiBase extends ApiBase {
    /*
    constructor(path: string, showWaiting?: boolean) {
        super(path, showWaiting);
    }*/

    protected async getHttpChannel(): Promise<HttpChannel> {
        return (this.showWaiting === true || this.showWaiting === undefined)?
            getCenterChannelUI():
            getCenterChannel();
    }
}

const uqTokensName = 'uqTokens';
export class UqTokenApi extends CenterApiBase {
    private localMap: LocalMap = env.localDb.map(uqTokensName);

    async uq(params: {unit:number, uqOwner:string, uqName:string, appOwner:string, appName:string}):Promise<any> {
        let {uqOwner, uqName} = params;
        let un = uqOwner+'/'+uqName;
        let localCache = this.localMap.child(un);
        try {
            let nowTick = Math.floor(Date.now() / 1000);
            let uqToken:UqLocal = localCache.get();
            if (uqToken !== undefined) {
                let {unit, user} = uqToken;
                if (unit !== params.unit || user !== loginedUserId) {
                    localCache.remove();
                    uqToken = undefined;
                }
            }
            if (uqToken !== undefined) {
                let {tick, value} = uqToken;
                if (value !== undefined && (nowTick - tick) < 24*3600) {
                    return _.clone(value);
                }
            }
            let appUqParams:any = _.clone(params);
            appUqParams.testing = host.testing;
            let ret = await this.get('app-uq', appUqParams);
            if (ret === undefined) {
                let {unit, uqOwner, uqName} = params;
                let err = `center get app-uq(unit=${unit}, '${uqOwner}/${uqName}') - not exists or no unit-service`;
                throw err;
            }

            uqToken = {
                unit: params.unit,
                user: loginedUserId,
                tick: nowTick,
                value: ret,
            }
            localCache.set(uqToken);
            return _.clone(ret);
        }
        catch (err) {
            localCache.remove();
            throw err;
        }
    }
}

export const uqTokenApi = new UqTokenApi('tv/tie/', undefined);

export class CallCenterApi extends CenterApiBase {
    directCall(url:string, method:string, body:any):Promise<any> {
        return this.call(url, method, body);
    }
}
export const callCenterapi = new CallCenterApi('', undefined);

export interface UqAppData {
    appName: string;
    appOwner: string;
    id: number;
    version: string;        // AppUI version
    mainUqId: number;
    roles: number;
    uqs: UqData[];
}

export interface UqData {
    id: number;
    uqOwner: string;
    uqName: string;
    access: string;
    newVersion: boolean;
}

export interface UqServiceData {
    id: number;
    db: string;
    url: string;
    urlTest: string;
    token: string;
}

export class CenterAppApi extends CenterApiBase {
    async uqs(appOwner:string, appName:string):Promise<UqAppData> {
        let ret:UqAppData = await this.get('tie/app-uqs', {appOwner, appName});
        return ret;
    }
    async unitxUq(unit:number):Promise<UqServiceData> {
        return await this.get('tie/unitx-uq', {unit:unit});
    }
    async changePassword(param: {orgPassword:string, newPassword:string}) {
        return await this.post('tie/change-password', param);
    }
}

export async function loadAppUqs(appOwner:string, appName:string): Promise<UqAppData> {
    let centerAppApi = new CenterAppApi('tv/', undefined);
    let ret = await centerAppApi.uqs(appOwner, appName);
    return ret;
}

export interface RegisterParameter {
    nick:string, 
    user:string, 
    pwd:string,
    country:number, 
    mobile:number, 
    mobileCountry:number,
    email:string,
    verify:string,
};

export class UserApi extends CenterApiBase {
    async login(params: {user: string, pwd: string, guest: number}): Promise<any> {
        //(params as any).device = nav.local.device.get();
        let ret = await this.get('user/login', params);
        switch (typeof ret) {
            default: return;
            case 'string': return decodeUserToken(ret);
            case 'object':
                let token = ret.token;
                let user = decodeUserToken(token);
                let {nick, icon} = ret;
                if (nick) user.nick = nick;
                if (icon) user.icon = icon;
                return user;
        }
        // !== undefined) return decodeToken(token);
    }
    async register(params: RegisterParameter): Promise<any>
    {
        return await this.post('user/register', params);
    }

    async sendVerify(account:string, type:'mobile'|'email', oem:string) {
        return await this.post('user/set-verify', {account:account, type:type, oem:oem});
    }

    async checkVerify(account:string, verify:string) {
        return await this.post('user/check-verify', {account:account, verify:verify});
    }

    async isExists(account:string) {
        return await this.get('user/is-exists', {account:account});
    }

    async resetPassword(account:string, password:string, verify:string, type:'mobile'|'email'):Promise<any[]> {
        return await this.post('user/reset-password', {account:account, password, verify, type});
    }
    
    async userSetProp(prop:string, value:any) {
        await this.post('tie/user-set-prop', {prop:prop, value:value});
    }

    async me():Promise<any> {
        return await this.get('tie/me');
    }

    async user(id:number): Promise<any> {
        return await this.get('tie/user', {id:id});
    }
}

export const userApi = new UserApi('tv/', undefined);
