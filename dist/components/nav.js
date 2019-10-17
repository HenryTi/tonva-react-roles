var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { observable } from 'mobx';
import { Page } from './page';
import { netToken } from '../net/netToken';
import FetchErrorView from './fetchErrorView';
import { appUrl, setAppInFrame, getExHash, getExHashPos } from '../net/appBridge';
import { LocalData, env } from '../tool';
import { guestApi, logoutApis, setCenterUrl, setCenterToken, WSChannel, appInFrame, host, resUrlFromHost } from '../net';
import { wsBridge } from '../net/wsChannel';
import { resOptions } from './res';
import { Loading } from './loading';
import 'font-awesome/css/font-awesome.min.css';
import '../css/va-form.css';
import '../css/va.css';
import '../css/animation.css';
import { FA } from './simple';
import { userApi } from '../net';
/*
const regEx = new RegExp('Android|webOS|iPhone|iPad|' +
    'BlackBerry|Windows Phone|'  +
    'Opera Mini|IEMobile|Mobile' ,
    'i');
const isMobile = regEx.test(navigator.userAgent);
*/
/*
export const mobileHeaderStyle = isMobile? {
    minHeight:  '3em'
} : undefined;
*/
//const logo = require('../img/logo.svg');
let logMark;
const logs = [];
;
let stackKey = 1;
export class NavView extends React.Component {
    constructor(props) {
        super(props);
        this.waitCount = 0;
        this.upgradeUq = () => {
            nav.start();
        };
        this.isHistoryBack = false;
        this.clearError = () => {
            this.setState({ fetchError: undefined });
        };
        this.back = this.back.bind(this);
        this.navBack = this.navBack.bind(this);
        this.stack = [];
        this.state = {
            stack: this.stack,
            wait: 0,
            fetchError: undefined
        };
    }
    /*
    async componentWillMount() {
        window.addEventListener('popstate', this.navBack);
    }
    */
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            window.addEventListener('popstate', this.navBack);
            nav.set(this);
            /*
            let start = this.props.start;
            if (start !== undefined) {
                await start();
            }
            else {
            */
            yield nav.start();
            //}
        });
    }
    get level() {
        return this.stack.length;
    }
    startWait() {
        if (this.waitCount === 0) {
            this.setState({ wait: 1 });
            this.waitTimeHandler = global.setTimeout(() => {
                this.waitTimeHandler = undefined;
                this.setState({ wait: 2 });
            }, 1000);
        }
        ++this.waitCount;
        this.setState({
            fetchError: undefined,
        });
    }
    endWait() {
        setTimeout(() => {
            /*
            this.setState({
                fetchError: undefined,
            });*/
            --this.waitCount;
            if (this.waitCount === 0) {
                if (this.waitTimeHandler !== undefined) {
                    clearTimeout(this.waitTimeHandler);
                    this.waitTimeHandler = undefined;
                }
                this.setState({ wait: 0 });
            }
        }, 100);
    }
    onError(fetchError) {
        return __awaiter(this, void 0, void 0, function* () {
            let err = fetchError.error;
            if (err !== undefined && err.unauthorized === true) {
                yield nav.showLogin(undefined);
                return;
            }
            this.setState({
                fetchError: fetchError,
            });
        });
    }
    showUpgradeUq(uq, version) {
        return __awaiter(this, void 0, void 0, function* () {
            this.show(React.createElement(Page, { header: false },
                React.createElement("div", null,
                    "UQ\u5347\u7EA7\u4E86\uFF0C\u8BF7\u70B9\u51FB\u6309\u94AE\u5347\u7EA7 ",
                    React.createElement("br", null),
                    React.createElement("small", { className: "text-muted" },
                        uq,
                        " ver-",
                        version),
                    React.createElement("button", { className: "btn btn-primary", onClick: this.upgradeUq }, "\u5347\u7EA7"))));
        });
    }
    show(view, disposer) {
        this.clear();
        return this.push(view, disposer);
    }
    push(view, disposer) {
        this.removeCeased();
        if (this.stack.length > 0) {
            window.history.pushState('forward', null, null);
        }
        let key = stackKey++;
        this.stack.push({
            key: key,
            view: view,
            ceased: false,
            disposer: disposer
        });
        this.refresh();
        //console.log('push: %s pages', this.stack.length);
        return key;
    }
    replace(view, disposer) {
        let item = undefined;
        let stack = this.stack;
        if (stack.length > 0) {
            item = stack.pop();
            //this.popAndDispose();
        }
        let key = stackKey++;
        this.stack.push({
            key: key,
            view: view,
            ceased: false,
            disposer: disposer
        });
        if (item !== undefined)
            this.dispose(item.disposer);
        this.refresh();
        //console.log('replace: %s pages', this.stack.length);
        return key;
    }
    ceaseTop(level = 1) {
        let p = this.stack.length - 1;
        for (let i = 0; i < level; i++, p--) {
            if (p < 0)
                break;
            let item = this.stack[p];
            item.ceased = true;
        }
    }
    pop(level = 1) {
        let stack = this.stack;
        let len = stack.length;
        //console.log('pop start: %s pages level=%s', len, level);
        if (level <= 0 || len <= 1)
            return;
        if (len < level)
            level = len;
        let backLevel = 0;
        for (let i = 0; i < level; i++) {
            if (stack.length === 0)
                break;
            //stack.pop();
            this.popAndDispose();
            ++backLevel;
        }
        if (backLevel >= len)
            backLevel--;
        this.refresh();
        if (this.isHistoryBack !== true) {
            //window.removeEventListener('popstate', this.navBack);
            //window.history.back(backLevel);
            //window.addEventListener('popstate', this.navBack);
        }
        //console.log('pop: %s pages', stack.length);
    }
    popTo(key) {
        if (key === undefined)
            return;
        if (this.stack.find(v => v.key === key) === undefined)
            return;
        while (this.stack.length > 0) {
            let len = this.stack.length;
            let top = this.stack[len - 1];
            if (top.key === key)
                break;
            this.pop();
        }
    }
    topKey() {
        let len = this.stack.length;
        if (len === 0)
            return undefined;
        return this.stack[len - 1].key;
    }
    removeCeased() {
        for (;;) {
            let p = this.stack.length - 1;
            if (p < 0)
                break;
            let top = this.stack[p];
            if (top.ceased === false)
                break;
            let item = this.stack.pop();
            let { disposer } = item;
            this.dispose(disposer);
        }
        this.refresh();
    }
    popAndDispose() {
        this.removeCeased();
        let item = this.stack.pop();
        if (item === undefined)
            return;
        let { disposer } = item;
        this.dispose(disposer);
        this.removeCeased();
        return item;
    }
    dispose(disposer) {
        if (disposer === undefined)
            return;
        let item = this.stack.find(v => v.disposer === disposer);
        if (item === undefined)
            disposer();
    }
    clear() {
        let len = this.stack.length;
        while (this.stack.length > 0)
            this.popAndDispose();
        //this.refresh();
        if (len > 1) {
            //window.removeEventListener('popstate', this.navBack);
            //window.history.back(len-1);
            //window.addEventListener('popstate', this.navBack);
        }
    }
    regConfirmClose(confirmClose) {
        let stack = this.stack;
        let len = stack.length;
        if (len === 0)
            return;
        let top = stack[len - 1];
        top.confirmClose = confirmClose;
    }
    navBack() {
        //nav.log('backbutton pressed - nav level: ' + this.stack.length);
        let tick = Date.now();
        this.isHistoryBack = true;
        this.back(true);
        this.isHistoryBack = false;
        console.log(`///\\\\ ${Date.now() - tick}ms backbutton pressed - nav level: ${this.stack.length}`);
    }
    back(confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let stack = this.stack;
            let len = stack.length;
            if (len === 0)
                return;
            if (len === 1) {
                if (window.self !== window.top) {
                    window.top.postMessage({ type: 'pop-app' }, '*');
                }
                return;
            }
            let top = stack[len - 1];
            if (confirm === true && top.confirmClose) {
                if ((yield top.confirmClose()) === true)
                    this.pop();
            }
            else {
                this.pop();
            }
        });
    }
    confirmBox(message) {
        return window.confirm(message);
    }
    /*
    private clickCount = 0;
    private firstClick: number = 0;
    private clickRange = 3000;
    private clickMax = 6;
    private onClick = () => {
        let now = Date.now();
        if (now - this.firstClick > this.clickRange) {
            this.clickCount = 1;
            this.firstClick = now;
            return;
        }
        ++this.clickCount;
        if (this.clickCount >= this.clickMax) {
            nav.reverseTest();
            this.firstClick = 0;
            return;
        }
    }
    */
    /*
    private onTestClick = () => {
        nav.testing = false;
        nav.push(<Page header={false}>
            <div className="m-5 border border-info bg-white rounded p-4 text-center">
                <div>当前运行在测试模式</div>
                <div className="mt-4">
                    <button className="btn btn-danger" onClick={nav.toNormal}>正常模式</button>
                    <button className="btn btn-outline-info ml-3" onClick={()=>{nav.testing=true;this.pop()}}>测试模式</button>
                </div>
            </div>
        </Page>);
    }
    */
    render() {
        const { wait, fetchError } = this.state;
        let stack = this.state.stack;
        let top = stack.length - 1;
        let elWait = null, elError = null;
        switch (wait) {
            case 1:
                elWait = React.createElement("li", { className: "va-wait va-wait1" });
                break;
            case 2:
                elWait = React.createElement("li", { className: "va-wait va-wait2" },
                    React.createElement(Loading, null));
                break;
        }
        if (fetchError)
            elError = React.createElement(FetchErrorView, Object.assign({ clearError: this.clearError }, fetchError));
        let test = nav.testing === true &&
            React.createElement("span", { className: "cursor-pointer position-absolute", style: { lineHeight: 0 } },
                React.createElement(FA, { className: "text-warning", name: "info-circle" }));
        //onClick={this.onClick}
        return (React.createElement("ul", { className: "va" },
            stack.map((item, index) => {
                let { key, view } = item;
                return React.createElement("li", { key: key, style: index < top ? { visibility: 'hidden' } : undefined }, view);
            }),
            elWait,
            elError,
            test));
    }
    refresh() {
        // this.setState({flag: !this.state.flag});
        this.setState({ stack: this.stack });
        // this.forceUpdate();
    }
}
export class Nav {
    constructor() {
        this.local = new LocalData();
        this.user = undefined;
        this.arrs = ['/test', '/test/'];
        let { lang, district } = resOptions;
        this.language = lang;
        this.culture = district;
        this.testing = false;
    }
    get guest() {
        let guest = this.local.guest;
        if (guest === undefined)
            return 0;
        let g = guest.get();
        if (g === undefined)
            return 0;
        return g.guest;
    }
    set(nav) {
        //this.logo = logo;
        this.nav = nav;
    }
    registerReceiveHandler(handler) {
        if (this.ws === undefined)
            return;
        return this.ws.onWsReceiveAny(handler);
    }
    unregisterReceiveHandler(handlerId) {
        if (this.ws === undefined)
            return;
        if (handlerId === undefined)
            return;
        this.ws.endWsReceive(handlerId);
    }
    /*
    private static testMode = '测试';
    private static normalMode = '正常';
    private setTesting(testing:boolean) {
        this.testing = testing;
        this.local.testing.set(testing);
    };
    private resetTest = () => {
        this.setTesting(!this.testing);
        //this.pop();
        this.start();
    }
    toNormal = () => {
        this.setTesting(false);
        this.start();
    }
    reverseTest() {
        let m1:string, m2:string;
        if (this.testing === true) {
            m1 = Nav.testMode;
            m2 = Nav.normalMode;
        }
        else {
            m1 = Nav.normalMode;
            m2 = Nav.testMode;
        }

        this.push(<Page back="close" header={false}>
            <div className="m-5 border border-info bg-white rounded p-4 text-center">
                <div>
                    <p>从{m1}模式切换到{m2}模式吗?</p>
                    <p className="small text-muted">测试模式下，页面左上角会有一个 <FA className="text-warning" name="info-circle" /></p>
                </div>
                <div className="mt-4">
                    <button className="btn btn-danger" onClick={this.resetTest}>切换</button>
                    <button className="btn btn-outline-info ml-3" onClick={()=>this.pop()}>取消</button>
                </div>
            </div>
        </Page>);
    }
    */
    onReceive(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ws === undefined)
                return;
            yield this.ws.receive(msg);
        });
    }
    getPredefinedUnitName() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let unitJsonPath = this.unitJsonPath();
                let unitRes = yield fetch(unitJsonPath, {});
                let res = yield unitRes.json();
                return res.unit;
            }
            catch (err) {
                this.local.unit.remove();
                return;
            }
        });
    }
    loadPredefinedUnit() {
        return __awaiter(this, void 0, void 0, function* () {
            let envUnit = process.env.REACT_APP_UNIT;
            if (envUnit !== undefined) {
                return Number(envUnit);
            }
            let unitName;
            let unit = this.local.unit.get();
            if (unit !== undefined) {
                if (env.isDevelopment !== true)
                    return unit.id;
                unitName = yield this.getPredefinedUnitName();
                if (unitName === undefined)
                    return;
                if (unit.name === unitName)
                    return unit.id;
            }
            else {
                unitName = yield this.getPredefinedUnitName();
                if (unitName === undefined)
                    return;
            }
            let unitId = yield guestApi.unitFromName(unitName);
            if (unitId !== undefined) {
                this.local.unit.set({ id: unitId, name: unitName });
            }
            return unitId;
        });
    }
    setSettings(settings) {
        this.navSettings = settings;
    }
    get oem() {
        return this.navSettings && this.navSettings.oem;
    }
    unitJsonPath() {
        let { href } = document.location;
        href = href.toLowerCase();
        for (let item of this.arrs) {
            if (href.endsWith(item) === true) {
                href = href.substr(0, href.length - item.length);
                break;
            }
        }
        if (href.endsWith('/') === true || href.endsWith('\\') === true) {
            href = href.substr(0, href.length - 1);
        }
        return href + '/unit.json';
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.testing = env.testing;
                yield host.start(this.testing);
                let hash = document.location.hash;
                if (hash !== undefined && hash.length > 0) {
                    let pos = getExHashPos();
                    if (pos < 0)
                        pos = undefined;
                    this.hashParam = hash.substring(1, pos);
                }
                nav.clear();
                this.startWait();
                let { url, ws, resHost } = host;
                this.centerHost = url;
                this.resUrl = resUrlFromHost(resHost);
                this.wsHost = ws;
                setCenterUrl(url);
                let guest = this.local.guest.get();
                if (guest === undefined) {
                    guest = yield guestApi.guest();
                }
                nav.setGuest(guest);
                let exHash = getExHash();
                let appInFrame = setAppInFrame(exHash);
                if (exHash !== undefined && window !== window.parent) {
                    // is in frame
                    if (appInFrame !== undefined) {
                        this.ws = wsBridge;
                        console.log('this.ws = wsBridge in sub frame');
                        //nav.user = {id:0} as User;
                        if (window.self !== window.parent) {
                            window.parent.postMessage({ type: 'sub-frame-started', hash: appInFrame.hash }, '*');
                        }
                        // 下面这一句，已经移到 appBridge.ts 里面的 initSubWin，也就是响应从main frame获得user之后开始。
                        //await this.showAppView();
                        return;
                    }
                }
                let predefinedUnit = yield this.loadPredefinedUnit();
                appInFrame.predefinedUnit = predefinedUnit;
                let user = this.local.user.get();
                if (user === undefined) {
                    let { notLogined } = this.nav.props;
                    if (notLogined !== undefined) {
                        yield notLogined();
                    }
                    else {
                        yield nav.showLogin(undefined);
                    }
                    return;
                }
                yield nav.logined(user);
            }
            catch (err) {
            }
            finally {
                this.endWait();
            }
        });
    }
    showAppView() {
        return __awaiter(this, void 0, void 0, function* () {
            let { onLogined } = this.nav.props;
            if (onLogined === undefined) {
                nav.push(React.createElement("div", null, "NavView has no prop onLogined"));
                return;
            }
            nav.clear();
            yield onLogined();
            console.log('logined: AppView shown');
        });
    }
    setGuest(guest) {
        this.local.guest.set(guest);
        netToken.set(0, guest.token);
    }
    saveLocalUser() {
        this.local.user.set(this.user);
    }
    loadMe() {
        return __awaiter(this, void 0, void 0, function* () {
            let me = yield userApi.me();
            this.user.icon = me.icon;
            this.user.nick = me.nick;
        });
    }
    logined(user, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            logoutApis();
            console.log("logined: %s", JSON.stringify(user));
            this.user = user;
            this.saveLocalUser();
            netToken.set(user.id, user.token);
            if (callback !== undefined) //this.loginCallbacks.has)
                callback(user);
            //this.loginCallbacks.call(user);
            else {
                yield this.showAppView();
            }
        });
    }
    wsConnect() {
        let ws = this.ws = new WSChannel(this.wsHost, this.user.token);
        ws.connect();
    }
    loginTop(defaultTop) {
        return (this.navSettings && this.navSettings.loginTop) || defaultTop;
    }
    showLogin(callback, withBack) {
        return __awaiter(this, void 0, void 0, function* () {
            let lv = yield import('../entry/login');
            let loginView = React.createElement(lv.default, { withBack: withBack, callback: callback });
            if (withBack !== true) {
                this.nav.clear();
                this.pop();
            }
            this.nav.push(loginView);
        });
    }
    showLogout(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            nav.push(React.createElement(Page, { header: "\u5B89\u5168\u9000\u51FA", back: "close" },
                React.createElement("div", { className: "m-5 border border-info bg-white rounded p-3 text-center" },
                    React.createElement("div", null, "\u9000\u51FA\u5F53\u524D\u8D26\u53F7\u4E0D\u4F1A\u5220\u9664\u4EFB\u4F55\u5386\u53F2\u6570\u636E\uFF0C\u4E0B\u6B21\u767B\u5F55\u4F9D\u7136\u53EF\u4EE5\u4F7F\u7528\u672C\u8D26\u53F7"),
                    React.createElement("div", { className: "mt-3" },
                        React.createElement("button", { className: "btn btn-danger", onClick: () => this.logout(callback) }, "\u9000\u51FA")))));
        });
    }
    logout(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            appInFrame.unit = undefined;
            this.local.logoutClear();
            this.user = undefined; //{} as User;
            logoutApis();
            let guest = this.local.guest.get();
            setCenterToken(0, guest && guest.token);
            this.ws = undefined;
            /*
            if (this.loginCallbacks.has)
                this.logoutCallbacks.call();
            else {
                if (notShowLogin === true) return;
            }
            await nav.start();
            */
            if (callback === undefined)
                yield nav.start();
            else
                yield callback();
        });
    }
    changePassword() {
        return __awaiter(this, void 0, void 0, function* () {
            let cp = yield import('../entry/changePassword');
            nav.push(React.createElement(cp.ChangePasswordPage, null));
        });
    }
    get level() {
        return this.nav.level;
    }
    startWait() {
        this.nav.startWait();
    }
    endWait() {
        this.nav.endWait();
    }
    onError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nav.onError(error);
        });
    }
    showUpgradeUq(uq, version) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nav.showUpgradeUq(uq, version);
        });
    }
    show(view, disposer) {
        this.nav.show(view, disposer);
    }
    push(view, disposer) {
        this.nav.push(view, disposer);
    }
    replace(view, disposer) {
        this.nav.replace(view, disposer);
    }
    pop(level = 1) {
        this.nav.pop(level);
    }
    topKey() {
        return this.nav.topKey();
    }
    popTo(key) {
        this.nav.popTo(key);
    }
    clear() {
        this.nav.clear();
    }
    navBack() {
        this.nav.navBack();
    }
    ceaseTop(level) {
        this.nav.ceaseTop(level);
    }
    removeCeased() {
        this.nav.removeCeased();
    }
    back(confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nav.back(confirm);
        });
    }
    regConfirmClose(confirmClose) {
        this.nav.regConfirmClose(confirmClose);
    }
    confirmBox(message) {
        return this.nav.confirmBox(message);
    }
    navToApp(url, unitId, apiId, sheetType, sheetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let sheet = this.centerHost.includes('http://localhost:') === true ? 'sheet_debug' : 'sheet';
                let uh = sheetId === undefined ?
                    appUrl(url, unitId) :
                    appUrl(url, unitId, sheet, [apiId, sheetType, sheetId]);
                console.log('navToApp: %s', JSON.stringify(uh));
                nav.push(React.createElement("article", { className: 'app-container' },
                    React.createElement("span", { id: uh.hash, onClick: () => this.back() },
                        React.createElement("i", { className: "fa fa-arrow-left" })),
                    // eslint-disable-next-line 
                    React.createElement("iframe", { src: uh.url, title: String(sheetId) })), () => {
                    resolve();
                });
            });
        });
    }
    navToSite(url) {
        // show in new window
        window.open(url);
    }
    get logs() { return logs; }
    ;
    log(msg) {
        logs.push(msg);
    }
    logMark() {
        let date = new Date();
        logMark = date.getTime();
        logs.push('log-mark: ' + date.toTimeString());
    }
    logStep(step) {
        logs.push(step + ': ' + (new Date().getTime() - logMark));
    }
}
__decorate([
    observable
], Nav.prototype, "user", void 0);
export const nav = new Nav();
//# sourceMappingURL=nav.js.map