var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { bridgeCenterApi, isBridged } from './appBridge';
import { nav } from '../components/nav';
import { env } from '../tool';
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
        this.startWait = (waiting) => {
            if (waiting === true) {
                if (this.ui !== undefined)
                    this.ui.startWait();
            }
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
        this.timeout = env.isDevelopment === true ? 500000 : 50000;
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
            return yield this.innerFetch(urlPrefix + path, options, caller.waiting);
        });
    }
    innerFetchResult(url, options, waiting) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.innerFetch(url, options, waiting);
            return ret.res;
        });
    }
    get(url, params = undefined, waiting) {
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
            return yield this.innerFetchResult(url, options, waiting);
        });
    }
    post(url, params, waiting) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildOptions();
            options.method = 'POST';
            options.body = JSON.stringify(params);
            return yield this.innerFetchResult(url, options, waiting);
        });
    }
    put(url, params, waiting) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildOptions();
            options.method = 'PUT';
            options.body = JSON.stringify(params);
            return yield this.innerFetchResult(url, options, waiting);
        });
    }
    delete(url, params, waiting) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildOptions();
            options.method = 'DELETE';
            options.body = JSON.stringify(params);
            return yield this.innerFetchResult(url, options, waiting);
        });
    }
    fetch(url, options, waiting, resolve, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            let that = this;
            this.startWait(waiting);
            let path = url;
            function buildError(err, ex) {
                switch (typeof err) {
                    case 'string':
                        if (ex !== undefined)
                            err += ' ' + ex;
                        break;
                    case 'object':
                        let retErr = {
                            ex: ex,
                            message: err.message,
                        };
                        err = retErr;
                        break;
                }
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
                console.log('%s-%s %s', options.method, path, options.body);
                let now = Date.now();
                let timeOutHandler = env.setTimeout(() => {
                    that.endWait(url + ' timeout endWait: ' + (Date.now() - now) + 'ms', reject);
                }, this.timeout);
                let res = yield fetch(encodeURI(path), options);
                if (res.ok === false) {
                    clearTimeout(timeOutHandler);
                    console.log('ok false endWait');
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
                            return resolve(retJson);
                        }
                        let retError = retJson.error;
                        if (retError === undefined) {
                            yield that.showError(buildError('not valid tonva json'));
                        }
                        else {
                            yield that.showError(buildError(retError, 'retJson.error'));
                            reject(retError);
                        }
                    })).catch((error) => __awaiter(this, void 0, void 0, function* () {
                        yield that.showError(buildError(error, 'catch res.json()'));
                    }));
                }
                else {
                    let text = yield res.text();
                    clearTimeout(timeOutHandler);
                    console.log('text endWait');
                    that.endWait();
                    resolve(text);
                }
            }
            catch (error) {
                this.endWait(url, reject);
                if (typeof error === 'string') {
                    let err = error.toLowerCase();
                    if (err.startsWith('unauthorized') === true) {
                        nav.logout();
                        return;
                    }
                }
                console.error('fecth error (no nav.showError): ' + url);
                // await this.showError(buildError(error, 'catch outmost'));
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
                yield this.fetch(url, options, true, resolve, reject);
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
    innerFetch(url, options, waiting) {
        return __awaiter(this, void 0, void 0, function* () {
            let u = this.hostUrl + url;
            if (this.apiToken === undefined && isBridged())
                return yield bridgeCenterApi(u, options.method, options.body);
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.fetch(u, options, waiting, resolve, reject);
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
    innerFetch(url, options, waiting) {
        return __awaiter(this, void 0, void 0, function* () {
            let u = this.hostUrl + url;
            return yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.fetch(u, options, waiting, resolve, reject);
            }));
        });
    }
}
//# sourceMappingURL=httpChannel.js.map