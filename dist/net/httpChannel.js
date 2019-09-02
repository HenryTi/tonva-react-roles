var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { bridgeCenterApi, isBridged } from './appBridge';
import { nav } from '../ui/nav';
import { isDevelopment } from './host';
/*
export async function httpGet(url:string, params?:any):Promise<any> {
    let channel = new HttpChannel(false, url, undefined, undefined);
    let ret = await channel.get('', params);
    return ret;
}

export async function httpPost(url:string, params?:any):Promise<any> {
    let channel = new HttpChannel(false, url, undefined, undefined);
    let ret = await channel.post('', params);
    return ret;
}
*/
const methodsWithBody = ['POST', 'PUT'];
export class HttpChannel {
    constructor(hostUrl, apiToken, ui) {
        this.startWait = () => {
            if (this.ui !== undefined)
                this.ui.startWait();
        };
        this.endWait = (url, reject) => {
            if (this.ui !== undefined)
                this.ui.endWait();
            if (reject !== undefined)
                reject('访问webapi超时 ' + url);
        };
        this.showError = (error) => __awaiter(this, void 0, void 0, function* () {
            if (this.ui !== undefined)
                yield this.ui.showError(error);
        });
        this.hostUrl = hostUrl;
        this.apiToken = apiToken;
        this.ui = ui;
        this.timeout = isDevelopment === true ? 500000 : 5000;
    }
    used() {
        this.post('', {});
    }
    xcall(urlPrefix, caller) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildOptions();
            let { headers, path, method } = caller;
            if (headers !== undefined) {
                let h = options.headers;
                for (let i in headers) {
                    h.append(i, encodeURI(headers[i]));
                }
            }
            options.method = method;
            let p = caller.buildParams();
            if (methodsWithBody.indexOf(method) >= 0 && p !== undefined) {
                options.body = JSON.stringify(p);
            }
            return yield this.innerFetch(urlPrefix + path, options);
        });
    }
    innerFetchResult(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.innerFetch(url, options);
            return ret.res;
        });
    }
    get(url, params = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params) {
                let keys = Object.keys(params);
                if (keys.length > 0) {
                    let c = '?';
                    for (let k of keys) {
                        let v = params[k];
                        if (v === undefined)
                            continue;
                        url += c + k + '=' + params[k];
                        c = '&';
                    }
                }
            }
            let options = this.buildOptions();
            options.method = 'GET';
            return yield this.innerFetchResult(url, options);
        });
    }
    post(url, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildOptions();
            options.method = 'POST';
            options.body = JSON.stringify(params);
            return yield this.innerFetchResult(url, options);
        });
    }
    put(url, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildOptions();
            options.method = 'PUT';
            options.body = JSON.stringify(params);
            return yield this.innerFetchResult(url, options);
        });
    }
    delete(url, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildOptions();
            options.method = 'DELETE';
            options.body = JSON.stringify(params);
            return yield this.innerFetchResult(url, options);
        });
    }
    fetch(url, options, resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            let that = this;
            this.startWait();
            let path = url;
            function buildError(err) {
                return {
                    channel: that,
                    url: path,
                    options: options,
                    resolve: resolve,
                    reject: reject,
                    error: err,
                };
            }
            try {
                console.log('%s %s', options.method, path);
                let timeOutHandler = setTimeout(() => that.endWait(url, reject), this.timeout);
                let res = yield fetch(encodeURI(path), options);
                if (res.ok === false) {
                    clearTimeout(timeOutHandler);
                    that.endWait();
                    console.log('call error %s', res.statusText);
                    throw res.statusText;
                }
                let ct = res.headers.get('content-type');
                if (ct && ct.indexOf('json') >= 0) {
                    return res.json().then((retJson) => __awaiter(this, void 0, void 0, function* () {
                        clearTimeout(timeOutHandler);
                        that.endWait();
                        if (retJson.ok === true) {
                            if (typeof retJson !== 'object') {
                                debugger;
                            }
                            else if (Array.isArray(retJson) === true) {
                                debugger;
                            }
                            /*
                            let json = retJson.res;
                            if (json === undefined) {
                                json = {
                                    $uq: retJson.$uq
                                }
                            }
                            */
                            //json.$modify = retJson.$modify;
                            //return resolve(json);
                            return resolve(retJson);
                        }
                        let retError = retJson.error;
                        if (retError === undefined) {
                            yield that.showError(buildError('not valid tonva json'));
                        }
                        else {
                            yield that.showError(buildError(retError));
                            reject(retError);
                        }
                    })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                        yield that.showError(buildError(error));
                    }));
                }
                else {
                    let text = yield res.text();
                    clearTimeout(timeOutHandler);
                    that.endWait();
                    resolve(text);
                }
            }
            catch (error) {
                if (typeof error === 'string') {
                    let err = error.toLowerCase();
                    if (err.startsWith('unauthorized') === true) {
                        nav.logout();
                        return;
                    }
                }
                yield this.showError(buildError(error.message));
            }
            ;
        });
    }
    callFetch(url, method, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildOptions();
            options.method = method;
            options.body = body;
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.fetch(url, options, resolve, reject);
            }));
        });
    }
    buildOptions() {
        let headers = this.buildHeaders();
        let options = {
            headers: headers,
            method: undefined,
            body: undefined,
        };
        return options;
    }
    buildHeaders() {
        let { language, culture } = nav;
        let headers = new Headers();
        //headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json;charset=UTF-8');
        let lang = language;
        if (culture)
            lang += '-' + culture;
        headers.append('Accept-Language', lang);
        if (this.apiToken) {
            headers.append('Authorization', this.apiToken);
        }
        return headers;
    }
}
export class CenterHttpChannel extends HttpChannel {
    innerFetch(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let u = this.hostUrl + url;
            if (this.apiToken === undefined && isBridged())
                return yield bridgeCenterApi(u, options.method, options.body);
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.fetch(u, options, resolve, reject);
            }));
        });
    }
}
export class UqHttpChannel extends HttpChannel {
    /*
    private uqForChannel: IUqForChannel;
    constructor(hostUrl: string, apiToken:string, uqForChannel: IUqForChannel, ui?: HttpChannelUI) {
        super(hostUrl, apiToken, ui);
        this.uqForChannel = uqForChannel;
    }
    */
    innerFetch(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let u = this.hostUrl + url;
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.fetch(u, options, resolve, reject);
            }));
        });
    }
}
//# sourceMappingURL=httpChannel.js.map