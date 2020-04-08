var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import _ from 'lodash';
import { nav, Page, resOptions } from '../components';
import { env } from '../tool';
export class Controller {
    constructor(res) {
        this._t = {};
        this.isDev = env.isDevelopment;
        this.onMessageReceive = (message) => __awaiter(this, void 0, void 0, function* () {
            yield this.onMessage(message);
        });
        this.res = res || {};
        this.x = this.res.x || {};
        this.t = (str) => this.internalT(str) || str;
    }
    get user() { return nav.user; }
    get isLogined() {
        let { user } = nav;
        if (user === undefined)
            return false;
        return user.id > 0;
    }
    internalT(str) {
        return this._t[str];
    }
    setRes(res) {
        if (res === undefined)
            return;
        let { $lang, $district } = resOptions;
        _.merge(this._t, res);
        if ($lang !== undefined) {
            let l = res[$lang];
            if (l !== undefined) {
                _.merge(this._t, l);
                let d = l[$district];
                if (d !== undefined) {
                    _.merge(this._t, d);
                }
            }
        }
    }
    dispose() {
        // message listener的清理
        nav.unregisterReceiveHandler(this.receiveHandlerId);
        this.onDispose();
    }
    onDispose() {
    }
    openVPage(vp, param) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (new vp(this)).open(param);
        });
    }
    renderView(view, param) {
        return (new view(this)).render(param);
    }
    event(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.onEvent(type, value);
        });
    }
    onEvent(type, value) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    msg(text) {
        alert(text);
    }
    errorPage(header, err) {
        this.openPage(React.createElement(Page, { header: "App error!" },
            React.createElement("pre", null, typeof err === 'string' ? err : err.message)));
    }
    onMessage(message) {
        return;
    }
    beforeStart() {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            console.log('this.receiveHandlerId = nav.registerReceiveHandler(this.onMessageReceive);');
            this.receiveHandlerId = nav.registerReceiveHandler(this.onMessageReceive);
            console.log('return true');
            */
            return true;
        });
    }
    registerReceiveHandler() {
        this.receiveHandlerId = nav.registerReceiveHandler(this.onMessageReceive);
    }
    start(param, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            this.disposer = this.dispose.bind(this);
            this.registerReceiveHandler();
            let ret = yield this.beforeStart();
            if (ret === false)
                return;
            yield this.internalStart(param, ...params);
        });
    }
    get isCalling() { return this._resolve_$ !== undefined; }
    call(param, ...params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._resolve_$ === undefined)
                this._resolve_$ = [];
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this._resolve_$.push(resolve);
                yield this.start(param, ...params);
            }));
        });
    }
    vCall(vp, param) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._resolve_$ === undefined)
                this._resolve_$ = [];
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this._resolve_$.push(resolve);
                yield (new vp(this)).open(param);
            }));
        });
    }
    returnCall(value) {
        if (this._resolve_$ === undefined)
            return;
        let resolve = this._resolve_$.pop();
        if (resolve === undefined) {
            alert('the Controller call already returned, or not called');
            return;
        }
        resolve(value);
    }
    openPage(page) {
        nav.push(page, this.disposer);
        this.disposer = undefined;
    }
    replacePage(page) {
        nav.replace(page, this.disposer);
        this.disposer = undefined;
    }
    backPage() {
        nav.back();
    }
    closePage(level) {
        nav.pop(level);
    }
    ceasePage(level) {
        nav.ceaseTop(level);
    }
    removeCeased() {
        nav.removeCeased();
    }
    regConfirmClose(confirmClose) {
        nav.regConfirmClose(confirmClose);
    }
    confirm(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let { caption, message, ok, yes, no, classNames } = options;
                let close = (res) => {
                    this.closePage();
                    resolve(res);
                };
                let buttons = [];
                if (ok !== undefined) {
                    buttons.push(React.createElement("button", { key: "ok", className: "btn btn-primary mr-3", onClick: () => close('ok') }, ok));
                }
                if (yes !== undefined) {
                    buttons.push(React.createElement("button", { key: "yes", className: "btn btn-success mr-3", onClick: () => close('yes') }, yes));
                }
                if (no !== undefined) {
                    buttons.push(React.createElement("button", { key: "no", className: "btn btn-outline-danger mr-3", onClick: () => close('no') }, no));
                }
                this.openPage(React.createElement(Page, { header: caption || '请确认', back: "close" },
                    React.createElement("div", { className: classNames || "rounded bg-white m-5 p-3 border" },
                        React.createElement("div", { className: "d-flex align-items-center justify-content-center" }, message),
                        React.createElement("div", { className: "mt-3 d-flex align-items-center justify-content-center" }, buttons))));
                nav.regConfirmClose(() => __awaiter(this, void 0, void 0, function* () {
                    resolve(undefined);
                    return true;
                }));
            }));
        });
    }
}
//# sourceMappingURL=controller.js.map