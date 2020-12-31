var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import * as React from 'react';
import { observable } from 'mobx';
import marked from 'marked';
import _ from 'lodash';
import { Page } from './page/page';
import { netToken } from '../net/netToken';
import FetchErrorView, { SystemNotifyPage } from './fetchErrorView';
import { appUrl, setAppInFrame, getExHash, getExHashPos } from '../net/appBridge';
import { LocalData, env } from '../tool';
import { guestApi, logoutApis, setCenterUrl, setCenterToken, appInFrame, host, resUrlFromHost, messageHub } from '../net';
//import { WsBase, wsBridge } from '../net/wsChannel';
import { resOptions } from '../res/res';
import { Loading } from './loading';
import { Navigo } from './navigo';
import 'font-awesome/css/font-awesome.min.css';
import '../css/va-form.css';
import '../css/va.css';
import '../css/animation.css';
import { FA } from './simple';
import { userApi } from '../net';
import { ReloadPage, ConfirmReloadPage } from './reloadPage';
var regEx = new RegExp('Android|webOS|iPhone|iPad|' +
    'BlackBerry|Windows Phone|' +
    'Opera Mini|IEMobile|Mobile', 'i');
var isMobile = regEx.test(navigator.userAgent);
/*
export const mobileHeaderStyle = isMobile? {
    minHeight:  '3em'
} : undefined;
*/
//const logo = require('../img/logo.svg');
var logMark;
var logs = [];
;
var stackKey = 1;
var NavView = /** @class */ (function (_super) {
    __extends(NavView, _super);
    function NavView(props) {
        var _this = _super.call(this, props) || this;
        _this.waitCount = 0;
        _this.upgradeUq = function () {
            nav.start();
        };
        _this.isHistoryBack = false;
        _this.navBack = function () {
            //nav.log('backbutton pressed - nav level: ' + this.stack.length);
            var tick = Date.now();
            _this.isHistoryBack = true;
            _this.back(true);
            _this.isHistoryBack = false;
            console.log("///\\\\ " + (Date.now() - tick) + "ms backbutton pressed - nav level: " + _this.stack.length);
        };
        _this.back = function (confirm) {
            if (confirm === void 0) { confirm = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var stack, len, top;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stack = this.stack;
                            len = stack.length;
                            if (len === 0)
                                return [2 /*return*/];
                            if (len === 1) {
                                if (window.self !== window.top) {
                                    window.top.postMessage({ type: 'pop-app' }, '*');
                                }
                                return [2 /*return*/];
                            }
                            top = stack[len - 1];
                            if (!(confirm === true && top.confirmClose)) return [3 /*break*/, 2];
                            return [4 /*yield*/, top.confirmClose()];
                        case 1:
                            if ((_a.sent()) === true)
                                this.pop();
                            return [3 /*break*/, 3];
                        case 2:
                            this.pop();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        _this.clearError = function () {
            _this.setState({ fetchError: undefined });
        };
        _this.stack = [];
        _this.state = {
            stack: _this.stack,
            wait: 0,
            fetchError: undefined
        };
        nav.set(_this);
        return _this;
    }
    NavView.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        window.addEventListener('popstate', this.navBack);
                        //if (nav.isRouting === false) {
                        return [4 /*yield*/, nav.init()];
                    case 1:
                        //if (nav.isRouting === false) {
                        _a.sent();
                        //}
                        return [4 /*yield*/, nav.start()];
                    case 2:
                        //}
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(NavView.prototype, "level", {
        get: function () {
            return this.stack.length;
        },
        enumerable: false,
        configurable: true
    });
    NavView.prototype.startWait = function () {
        var _this = this;
        if (this.waitCount === 0) {
            this.setState({ wait: 1 });
            this.waitTimeHandler = env.setTimeout('NavView.startWait', function () {
                _this.waitTimeHandler = undefined;
                _this.setState({ wait: 2 });
            }, 1000);
        }
        ++this.waitCount;
        this.setState({
            fetchError: undefined,
        });
    };
    NavView.prototype.endWait = function () {
        var _this = this;
        env.setTimeout(undefined, //'NavView.endWait',
        function () {
            /*
            this.setState({
                fetchError: undefined,
            });*/
            --_this.waitCount;
            if (_this.waitCount === 0) {
                if (_this.waitTimeHandler !== undefined) {
                    env.clearTimeout(_this.waitTimeHandler);
                    _this.waitTimeHandler = undefined;
                }
                _this.setState({ wait: 0 });
            }
        }, 100);
    };
    NavView.prototype.onError = function (fetchError) {
        return __awaiter(this, void 0, void 0, function () {
            var err, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        err = fetchError.error;
                        if (!(err !== undefined)) return [3 /*break*/, 6];
                        if (!(err.unauthorized === true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, nav.showLogin(undefined)];
                    case 1:
                        _b.sent();
                        //nav.navigateToLogin();
                        return [2 /*return*/];
                    case 2:
                        _a = err.type;
                        switch (_a) {
                            case 'unauthorized': return [3 /*break*/, 3];
                            case 'sheet-processing': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, nav.showLogin(undefined)];
                    case 4:
                        _b.sent();
                        //nav.navigateToLogin();
                        return [2 /*return*/];
                    case 5:
                        nav.push(React.createElement(SystemNotifyPage, { message: "\u5355\u636E\u6B63\u5728\u5904\u7406\u4E2D\u3002\u8BF7\u91CD\u65B0\u64CD\u4F5C\uFF01" }));
                        return [2 /*return*/];
                    case 6:
                        this.setState({
                            fetchError: fetchError,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    NavView.prototype.showUpgradeUq = function (uq, version) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.show(React.createElement(Page, { header: false },
                    React.createElement("div", null,
                        "UQ\u5347\u7EA7\u4E86\uFF0C\u8BF7\u70B9\u51FB\u6309\u94AE\u5347\u7EA7 ",
                        React.createElement("br", null),
                        React.createElement("small", { className: "text-muted" },
                            uq,
                            " ver-",
                            version),
                        React.createElement("button", { className: "btn btn-primary", onClick: this.upgradeUq }, "\u5347\u7EA7"))));
                return [2 /*return*/];
            });
        });
    };
    NavView.prototype.show = function (view, disposer) {
        this.clear();
        return this.push(view, disposer);
    };
    NavView.prototype.push = function (view, disposer) {
        this.removeCeased();
        if (this.stack.length > 0) {
            window.history.pushState('forward', null, null);
        }
        var key = stackKey++;
        this.stack.push({
            key: key,
            view: view,
            ceased: false,
            disposer: disposer
        });
        this.refresh();
        //console.log('push: %s pages', this.stack.length);
        return key;
    };
    NavView.prototype.replace = function (view, disposer) {
        var item = undefined;
        var stack = this.stack;
        if (stack.length > 0) {
            item = stack.pop();
            //this.popAndDispose();
        }
        var key = stackKey++;
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
    };
    NavView.prototype.ceaseTop = function (level) {
        if (level === void 0) { level = 1; }
        var p = this.stack.length - 1;
        for (var i = 0; i < level; i++, p--) {
            if (p < 0)
                break;
            var item = this.stack[p];
            item.ceased = true;
        }
    };
    NavView.prototype.pop = function (level) {
        if (level === void 0) { level = 1; }
        var stack = this.stack;
        var len = stack.length;
        //console.log('pop start: %s pages level=%s', len, level);
        if (level <= 0 || len <= 1)
            return;
        if (len < level)
            level = len;
        var backLevel = 0;
        for (var i = 0; i < level; i++) {
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
    };
    NavView.prototype.popTo = function (key) {
        if (key === undefined)
            return;
        if (this.stack.find(function (v) { return v.key === key; }) === undefined)
            return;
        while (this.stack.length > 0) {
            var len = this.stack.length;
            var top_1 = this.stack[len - 1];
            if (top_1.key === key)
                break;
            this.pop();
        }
    };
    NavView.prototype.topKey = function () {
        var len = this.stack.length;
        if (len === 0)
            return undefined;
        return this.stack[len - 1].key;
    };
    NavView.prototype.removeCeased = function () {
        for (;;) {
            var p = this.stack.length - 1;
            if (p < 0)
                break;
            var top_2 = this.stack[p];
            if (top_2.ceased === false)
                break;
            var item = this.stack.pop();
            var disposer = item.disposer;
            this.dispose(disposer);
        }
        this.refresh();
    };
    NavView.prototype.popAndDispose = function () {
        this.removeCeased();
        var item = this.stack.pop();
        if (item === undefined)
            return;
        //if (nav.isRouting) {
        //	window.history.back();
        //}
        var disposer = item.disposer;
        this.dispose(disposer);
        this.removeCeased();
        return item;
    };
    NavView.prototype.dispose = function (disposer) {
        if (disposer === undefined)
            return;
        var item = this.stack.find(function (v) { return v.disposer === disposer; });
        if (item === undefined)
            disposer();
    };
    NavView.prototype.clear = function () {
        var len = this.stack.length;
        while (this.stack.length > 0)
            this.popAndDispose();
        //this.refresh();
        if (len > 1) {
            //window.removeEventListener('popstate', this.navBack);
            //window.history.back(len-1);
            //window.addEventListener('popstate', this.navBack);
        }
    };
    NavView.prototype.regConfirmClose = function (confirmClose) {
        var stack = this.stack;
        var len = stack.length;
        if (len === 0)
            return;
        var top = stack[len - 1];
        top.confirmClose = confirmClose;
    };
    NavView.prototype.confirmBox = function (message) {
        return window.confirm(message);
    };
    NavView.prototype.render = function () {
        var _a = this.state, wait = _a.wait, fetchError = _a.fetchError;
        var stack = this.state.stack;
        var top = stack.length - 1;
        var elWait = null, elError = null;
        switch (wait) {
            case 1:
                elWait = React.createElement("div", { className: "va-wait va-wait1" });
                break;
            case 2:
                elWait = React.createElement("div", { className: "va-wait va-wait2" },
                    React.createElement(Loading, null));
                break;
        }
        if (fetchError)
            elError = React.createElement(FetchErrorView, __assign({ clearError: this.clearError }, fetchError));
        var test = nav.testing === true &&
            React.createElement("span", { className: "cursor-pointer position-fixed", style: { top: 0, left: '0.2rem', zIndex: 90001 } },
                React.createElement(FA, { className: "text-warning", name: "info-circle" }));
        return React.createElement(React.Fragment, null,
            stack.map(function (item, index) {
                var key = item.key, view = item.view;
                return React.createElement("div", { key: key, style: index < top ? { visibility: 'hidden', position: 'absolute' } : undefined }, view);
            }),
            elWait,
            elError,
            test);
    };
    NavView.prototype.refresh = function () {
        this.setState({ stack: this.stack });
    };
    return NavView;
}(React.Component));
export { NavView };
var Nav = /** @class */ (function () {
    function Nav() {
        var _this = this;
        this.local = new LocalData();
        this.user = undefined;
        this.arrs = ['/test', '/test/'];
        this.windowOnError = function (event, source, lineno, colno, error) {
            debugger;
            console.error('windowOnError');
            console.error(error);
        };
        this.windowOnUnhandledRejection = function (ev) {
            debugger;
            console.error('windowOnUnhandledRejection');
            console.error(ev.reason);
        };
        this.windowOnClick = function (ev) {
            console.error('windowOnClick');
        };
        this.windowOnMouseMove = function (ev) {
            console.log('navigator.userAgent: ' + navigator.userAgent);
            console.log('mouse move (%s, %s)', ev.x, ev.y);
        };
        this.windowOnScroll = function (ev) {
            console.log('scroll event');
        };
        this.navLogin = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                nav.showLogin(function (user) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, window.history.back()];
                }); }); }, false);
                return [2 /*return*/];
            });
        }); };
        this.navLogout = function (params) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                nav.showLogout(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, window.history.back()];
                }); }); });
                return [2 /*return*/];
            });
        }); };
        this.navRegister = function (params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                nav.showRegister();
                return [2 /*return*/];
            });
        }); };
        this.navForget = function (params) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                nav.showForget();
                return [2 /*return*/];
            });
        }); };
        this.sysRoutes = {
            '/login': this.navLogin,
            '/logout': this.navLogout,
            '/register': this.navRegister,
            '/forget': this.navForget,
        };
        /*
        get isWebNav():boolean {
            if (!this.navigo) return false;
            return !isMobile;
        }
        */
        this.isWebNav = false;
        this.backIcon = React.createElement("i", { className: "fa fa-angle-left" });
        this.closeIcon = React.createElement("i", { className: "fa fa-close" });
        this.showPrivacyPage = function () {
            var privacy = _this.getPrivacyContent();
            if (privacy) {
                _this.privacyPage(privacy);
            }
            else {
                nav.push(React.createElement(Page, { header: "\u9690\u79C1\u653F\u7B56" },
                    React.createElement("div", { className: "p-3" }, "AppConfig \u4E2D\u6CA1\u6709\u5B9A\u4E49 privacy\u3002\u53EF\u4EE5\u5B9A\u4E49\u4E3A\u5B57\u7B26\u4E32\uFF0C\u6216\u8005url\u3002markdown\u683C\u5F0F")));
            }
        };
        this.privacyPage = function (privacy) { return __awaiter(_this, void 0, void 0, function () {
            var html, content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPrivacy(privacy)];
                    case 1:
                        html = _a.sent();
                        content = { __html: marked(html) };
                        nav.push(React.createElement(Page, { header: "\u9690\u79C1\u653F\u7B56" },
                            React.createElement("div", { className: "p-3", dangerouslySetInnerHTML: content })));
                        return [2 /*return*/];
                }
            });
        }); };
        this.reload = function () { return __awaiter(_this, void 0, void 0, function () {
            var waiting, registration, plus, webview, webView;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        waiting = new Promise(function (resolve, reject) {
                            setTimeout(resolve, 100);
                        });
                        if (!('serviceWorker' in navigator)) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.race([waiting, navigator.serviceWorker.ready])];
                    case 1:
                        registration = _a.sent();
                        if (registration)
                            registration.unregister();
                        _a.label = 2;
                    case 2:
                        window.document.location.reload();
                        plus = window.plus;
                        if (plus) {
                            webview = plus.webview;
                            if (webview) {
                                if (webview.reload)
                                    webview.reload(true);
                            }
                            else {
                                webView = plus.webView;
                                if (webView) {
                                    if (webView.reload)
                                        webView.reload(true);
                                }
                            }
                            //plus.webview.reload(true)
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.resetAll = function () {
            _this.push(React.createElement(ConfirmReloadPage, { confirm: function (ok) {
                    if (ok === true) {
                        _this.showReloadPage('彻底升级');
                        localStorage.clear();
                        /*
                        this.local.readToMemory();
                        env.localDb.removeAll();
                        this.local.saveToLocalStorage();
                        */
                    }
                    else {
                        _this.pop();
                    }
                    return;
                } }));
        };
        var lang = resOptions.lang, district = resOptions.district;
        this.language = lang;
        this.culture = district;
        this.testing = false;
    }
    Object.defineProperty(Nav.prototype, "guest", {
        get: function () {
            var guest = this.local.guest;
            if (guest === undefined)
                return 0;
            var g = guest.get();
            if (g === undefined)
                return 0;
            return g.guest;
        },
        enumerable: false,
        configurable: true
    });
    Nav.prototype.set = function (navView) {
        //this.logo = logo;
        this.navView = navView;
    };
    /*
    registerReceiveHandler(handler: (message:any)=>Promise<void>):number {
        //if (this.ws === undefined) return;
        return messageHub.onReceiveAny(handler);
    }

    unregisterReceiveHandler(handlerId:number) {
        //if (this.ws === undefined) return;
        if (handlerId === undefined) return;
        messageHub.endReceive(handlerId);
    }
    */
    Nav.prototype.onReceive = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //if (this.ws === undefined) return;
                    return [4 /*yield*/, messageHub.dispatch(msg)];
                    case 1:
                        //if (this.ws === undefined) return;
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.loadUnitJson = function () {
        return __awaiter(this, void 0, void 0, function () {
            var unitJsonPath, unitRes, res, err1_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        unitJsonPath = this.unitJsonPath();
                        return [4 /*yield*/, fetch(unitJsonPath, {})];
                    case 1:
                        unitRes = _a.sent();
                        return [4 /*yield*/, unitRes.json()];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res.unit];
                    case 3:
                        err1_1 = _a.sent();
                        this.local.unit.remove();
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.getPredefinedUnitName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var el, json, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        el = document.getElementById('unit');
                        if (el) {
                            return [2 /*return*/, el.innerText];
                        }
                        el = document.getElementById('unit.json');
                        if (!!el) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadUnitJson()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        _a.trys.push([2, 3, , 5]);
                        json = el.innerHTML;
                        res = JSON.parse(json);
                        return [2 /*return*/, res.unit];
                    case 3:
                        err_1 = _a.sent();
                        return [4 /*yield*/, this.loadUnitJson()];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.loadPredefinedUnit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var envUnit, unitName, unit, unitId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        envUnit = process.env.REACT_APP_UNIT;
                        if (envUnit !== undefined) {
                            return [2 /*return*/, Number(envUnit)];
                        }
                        unit = this.local.unit.get();
                        if (!(unit !== undefined)) return [3 /*break*/, 2];
                        if (env.isDevelopment !== true)
                            return [2 /*return*/, unit.id];
                        return [4 /*yield*/, this.getPredefinedUnitName()];
                    case 1:
                        unitName = _a.sent();
                        if (unitName === undefined)
                            return [2 /*return*/];
                        if (unit.name === unitName)
                            return [2 /*return*/, unit.id];
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getPredefinedUnitName()];
                    case 3:
                        unitName = _a.sent();
                        if (unitName === undefined)
                            return [2 /*return*/];
                        _a.label = 4;
                    case 4: return [4 /*yield*/, guestApi.unitFromName(unitName)];
                    case 5:
                        unitId = _a.sent();
                        if (unitId !== undefined) {
                            this.local.unit.set({ id: unitId, name: unitName });
                        }
                        return [2 /*return*/, unitId];
                }
            });
        });
    };
    Nav.prototype.setSettings = function (settings) {
        this.navSettings = settings;
    };
    Object.defineProperty(Nav.prototype, "oem", {
        get: function () {
            return this.navSettings && this.navSettings.oem;
        },
        enumerable: false,
        configurable: true
    });
    Nav.prototype.unitJsonPath = function () {
        var _a = document.location, origin = _a.origin, pathname = _a.pathname;
        pathname = pathname.toLowerCase();
        for (var _i = 0, _b = this.arrs; _i < _b.length; _i++) {
            var item = _b[_i];
            if (pathname.endsWith(item) === true) {
                pathname = pathname.substr(0, pathname.length - item.length);
                break;
            }
        }
        if (pathname.endsWith('/') === true || pathname.endsWith('\\') === true) {
            pathname = pathname.substr(0, pathname.length - 1);
        }
        return origin + pathname + '/unit.json';
    };
    Nav.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hash, pos, url, ws, resHost, guest, exHash, appInFrame, predefinedUnit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.testing = env.testing;
                        if (this.forceDevelopment === true) {
                            env.isDevelopment = true;
                        }
                        return [4 /*yield*/, host.start(this.testing)];
                    case 1:
                        _a.sent();
                        hash = document.location.hash;
                        if (hash !== undefined && hash.length > 0) {
                            pos = getExHashPos();
                            if (pos < 0)
                                pos = undefined;
                            this.hashParam = hash.substring(1, pos);
                        }
                        url = host.url, ws = host.ws, resHost = host.resHost;
                        this.centerHost = url;
                        this.resUrl = resUrlFromHost(resHost);
                        this.wsHost = ws;
                        setCenterUrl(url);
                        guest = this.local.guest.get();
                        if (!(guest === undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, guestApi.guest()];
                    case 2:
                        guest = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!guest) {
                            debugger;
                            throw Error('guest can not be undefined');
                        }
                        nav.setGuest(guest);
                        exHash = getExHash();
                        appInFrame = setAppInFrame(exHash);
                        if (exHash !== undefined && window !== window.parent) {
                            // is in frame
                            if (appInFrame !== undefined) {
                                //this.ws = wsBridge;
                                console.log('this.ws = wsBridge in sub frame');
                                //nav.user = {id:0} as User;
                                if (window.self !== window.parent) {
                                    window.parent.postMessage({ type: 'sub-frame-started', hash: appInFrame.hash }, '*');
                                }
                                // 下面这一句，已经移到 appBridge.ts 里面的 initSubWin，也就是响应从main frame获得user之后开始。
                                //await this.showAppView();
                                return [2 /*return*/];
                            }
                        }
                        return [4 /*yield*/, this.loadPredefinedUnit()];
                    case 4:
                        predefinedUnit = _a.sent();
                        appInFrame.predefinedUnit = predefinedUnit;
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, notLogined, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, 8, 9]);
                        window.onerror = this.windowOnError;
                        window.onunhandledrejection = this.windowOnUnhandledRejection;
                        //window.addEventListener('click', this.windowOnClick);
                        //window.addEventListener('mousemove', this.windowOnMouseMove);
                        //window.addEventListener('touchmove', this.windowOnMouseMove);
                        //window.addEventListener('scroll', this.windowOnScroll);
                        if (isMobile === true) {
                            document.onselectstart = function () { return false; };
                            document.oncontextmenu = function () { return false; };
                        }
                        //window.setInterval(()=>console.error('tick every 5 seconds'), 5000);
                        nav.clear();
                        nav.onSysNavRoutes();
                        this.startWait();
                        user = this.local.user.get();
                        if (!(user === undefined)) return [3 /*break*/, 5];
                        notLogined = this.navView.props.notLogined;
                        if (!(notLogined !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, notLogined()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, nav.showLogin(undefined)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                    case 5: return [4 /*yield*/, nav.logined(user)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        err_2 = _a.sent();
                        console.error(err_2);
                        debugger;
                        return [3 /*break*/, 9];
                    case 8:
                        this.endWait();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.resolveRoute = function () {
        //if (this.isRouting === false) return;
        if (this.navigo === undefined)
            return;
        this.navigo.resolve();
    };
    Nav.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.navigo === undefined) {
            this.navigo = new Navigo();
            if (this.isWebNav !== true)
                this.navigo.historyAPIUpdateMethod('replaceState');
        }
        return this.navigo.on(args[0], args[1], args[2]);
    };
    Nav.prototype.onSysNavRoutes = function () {
        this.onNavRoutes(this.sysRoutes);
    };
    Nav.prototype.navigateToLogin = function () {
        nav.navigate('/login');
    };
    Nav.prototype.openSysPage = function (url) {
        var navPage = this.sysRoutes[url];
        if (navPage === undefined) {
            alert(url + ' is not defined in sysRoutes');
            return;
        }
        navPage(undefined);
    };
    Nav.prototype.routeFromNavPage = function (navPage) {
        var _this = this;
        return function (params, queryStr) {
            if (navPage) {
                if (_this.isWebNav)
                    nav.clear();
                navPage(params);
            }
        };
    };
    Nav.prototype.onNavRoute = function (navPage) {
        this.on(this.routeFromNavPage(navPage));
    };
    Nav.prototype.onNavRoutes = function (navPageRoutes) {
        if (!navPageRoutes)
            return;
        this.navPageRoutes = _.merge(this.navPageRoutes, navPageRoutes);
        var navOns = {};
        for (var route in navPageRoutes) {
            var navPage = navPageRoutes[route];
            navOns[route] = this.routeFromNavPage(navPage);
        }
        this.on(navOns);
    };
    Nav.prototype.setIsWebNav = function () {
        this.isWebNav = true;
        this.backIcon = React.createElement("i", { className: "fa fa-arrow-left" });
        this.closeIcon = React.createElement("i", { className: "fa fa-close" });
    };
    Object.defineProperty(Nav.prototype, "isMobile", {
        get: function () { return isMobile; },
        enumerable: false,
        configurable: true
    });
    Nav.prototype.navigate = function (url, absolute) {
        if (!this.navigo) {
            alert('Is not in webnav state, cannot navigate to url "' + url + '"');
            return;
        }
        if (this.testing === true)
            url += '#test';
        return this.navigo.navigate(url, absolute);
    };
    Nav.prototype.go = function (showPage, url, absolute) {
        if (this.navigo !== undefined) {
            this.navigate(url, absolute);
        }
        else {
            showPage();
        }
    };
    Nav.prototype.showAppView = function (isUserLogin) {
        return __awaiter(this, void 0, void 0, function () {
            var onLogined;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onLogined = this.navView.props.onLogined;
                        if (onLogined === undefined) {
                            nav.push(React.createElement("div", null, "NavView has no prop onLogined"));
                            return [2 /*return*/];
                        }
                        nav.clear();
                        return [4 /*yield*/, onLogined(isUserLogin)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.setGuest = function (guest) {
        this.local.guest.set(guest);
        netToken.set(0, guest.token);
    };
    Nav.prototype.saveLocalUser = function () {
        this.local.user.set(this.user);
    };
    Nav.prototype.loadMe = function () {
        return __awaiter(this, void 0, void 0, function () {
            var me;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userApi.me()];
                    case 1:
                        me = _a.sent();
                        this.user.icon = me.icon;
                        this.user.nick = me.nick;
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.internalLogined = function (user, callback, isUserLogin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logoutApis();
                        console.log("logined: %s", JSON.stringify(user));
                        this.user = user;
                        this.saveLocalUser();
                        netToken.set(user.id, user.token);
                        nav.clear();
                        if (!(callback !== undefined)) return [3 /*break*/, 1];
                        callback(user);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.showAppView(isUserLogin)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // 缓冲登录
    Nav.prototype.logined = function (user, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internalLogined(user, callback, false)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 用户操作之后登录
    Nav.prototype.userLogined = function (user, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.internalLogined(user, callback, true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //wsConnect() {
    //let ws:WSChannel = this.ws = new WSChannel(this.wsHost, this.user.token);
    //ws.connect();
    //}
    Nav.prototype.loginTop = function (defaultTop) {
        return (this.navSettings && this.navSettings.loginTop) || defaultTop;
    };
    Nav.prototype.privacyEntry = function () {
        if (!this.getPrivacyContent())
            return;
        return React.createElement("div", { className: "text-center" },
            React.createElement("button", { className: "btn btn-sm btn-link", onClick: this.showPrivacyPage },
                React.createElement("small", { className: "text-muted" }, "\u9690\u79C1\u653F\u7B56")));
    };
    Nav.prototype.getPrivacyContent = function () {
        if (!this.navSettings)
            return;
        var privacy = this.navSettings.privacy;
        return privacy;
    };
    Nav.prototype.getPrivacy = function (privacy) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, pos, http, res, text, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = new Headers({
                            "Content-Type": 'text/plain'
                        });
                        pos = privacy.indexOf('://');
                        if (!(pos > 0)) return [3 /*break*/, 5];
                        http = privacy.substring(0, pos).toLowerCase();
                        if (!(http === 'http' || http === 'https')) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch(privacy, {
                                method: 'GET',
                                headers: headers,
                            })];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.text()];
                    case 3:
                        text = _a.sent();
                        return [2 /*return*/, text];
                    case 4:
                        err_3 = _a.sent();
                        return [2 /*return*/, err_3.message];
                    case 5: return [2 /*return*/, privacy];
                }
            });
        });
    };
    Nav.prototype.showLogin = function (callback, withBack) {
        return __awaiter(this, void 0, void 0, function () {
            var lv, loginView;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import('../entry/login')];
                    case 1:
                        lv = _a.sent();
                        loginView = React.createElement(lv.default, { withBack: withBack, callback: callback });
                        if (withBack !== true) {
                            this.navView.clear();
                            this.pop();
                        }
                        this.navView.push(loginView);
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.showLogout = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var footer;
            var _this = this;
            return __generator(this, function (_a) {
                footer = React.createElement("div", { className: "text-center justify-content-center" },
                    React.createElement("button", { className: "btn btn-outline-danger", onClick: this.resetAll }, "\u5347\u7EA7\u8F6F\u4EF6"));
                nav.push(React.createElement(Page, { header: "\u5B89\u5168\u9000\u51FA", back: "close", footer: footer },
                    React.createElement("div", { className: "my-5 mx-1 border border-info bg-white rounded p-3 text-center" },
                        React.createElement("div", null, "\u9000\u51FA\u5F53\u524D\u8D26\u53F7\u4E0D\u4F1A\u5220\u9664\u4EFB\u4F55\u5386\u53F2\u6570\u636E\uFF0C\u4E0B\u6B21\u767B\u5F55\u4F9D\u7136\u53EF\u4EE5\u4F7F\u7528\u672C\u8D26\u53F7"),
                        React.createElement("div", { className: "mt-3 text-center" },
                            React.createElement("button", { className: "btn btn-danger", onClick: function () { return _this.logout(callback); } }, "\u5B89\u5168\u9000\u51FA")))));
                return [2 /*return*/];
            });
        });
    };
    Nav.prototype.showRegister = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lv, c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import('../entry/register')];
                    case 1:
                        lv = _a.sent();
                        c = new lv.RegisterController(undefined);
                        return [4 /*yield*/, c.start()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.showForget = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lv, c;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import('../entry/register')];
                    case 1:
                        lv = _a.sent();
                        c = new lv.ForgetController(undefined);
                        return [4 /*yield*/, c.start()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.logout = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var guest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appInFrame.unit = undefined;
                        this.local.logoutClear();
                        this.user = undefined; //{} as User;
                        logoutApis();
                        guest = this.local.guest.get();
                        setCenterToken(0, guest && guest.token);
                        //this.ws = undefined;
                        this.clear();
                        if (!(callback === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, nav.start()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, callback()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.changePassword = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import('../entry/changePassword')];
                    case 1:
                        cp = _a.sent();
                        nav.push(React.createElement(cp.ChangePasswordPage, null));
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Nav.prototype, "level", {
        get: function () {
            return this.navView.level;
        },
        enumerable: false,
        configurable: true
    });
    Nav.prototype.startWait = function () {
        var _a;
        (_a = this.navView) === null || _a === void 0 ? void 0 : _a.startWait();
    };
    Nav.prototype.endWait = function () {
        var _a;
        (_a = this.navView) === null || _a === void 0 ? void 0 : _a.endWait();
    };
    Nav.prototype.onError = function (error) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.navView.onError(error)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.showUpgradeUq = function (uq, version) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.navView.showUpgradeUq(uq, version)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.show = function (view, disposer) {
        this.navView.show(view, disposer);
    };
    Nav.prototype.push = function (view, disposer) {
        this.navView.push(view, disposer);
    };
    Nav.prototype.replace = function (view, disposer) {
        this.navView.replace(view, disposer);
    };
    Nav.prototype.pop = function (level) {
        if (level === void 0) { level = 1; }
        this.navView.pop(level);
    };
    Nav.prototype.topKey = function () {
        return this.navView.topKey();
    };
    Nav.prototype.popTo = function (key) {
        this.navView.popTo(key);
    };
    Nav.prototype.clear = function () {
        var _a;
        (_a = this.navView) === null || _a === void 0 ? void 0 : _a.clear();
    };
    Nav.prototype.navBack = function () {
        this.navView.navBack();
    };
    Nav.prototype.ceaseTop = function (level) {
        this.navView.ceaseTop(level);
    };
    Nav.prototype.removeCeased = function () {
        this.navView.removeCeased();
    };
    Nav.prototype.back = function (confirm) {
        if (confirm === void 0) { confirm = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.navView.back(confirm)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Nav.prototype.regConfirmClose = function (confirmClose) {
        this.navView.regConfirmClose(confirmClose);
    };
    Nav.prototype.confirmBox = function (message) {
        return this.navView.confirmBox(message);
    };
    Nav.prototype.navToApp = function (url, unitId, apiId, sheetType, sheetId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var sheet = _this.centerHost.includes('http://localhost:') === true ? 'sheet_debug' : 'sheet';
                        var uh = sheetId === undefined ?
                            appUrl(url, unitId) :
                            appUrl(url, unitId, sheet, [apiId, sheetType, sheetId]);
                        console.log('navToApp: %s', JSON.stringify(uh));
                        nav.push(React.createElement("article", { className: 'app-container' },
                            React.createElement("span", { id: uh.hash, onClick: function () { return _this.back(); } },
                                React.createElement("i", { className: "fa fa-arrow-left" })),
                            // eslint-disable-next-line 
                            React.createElement("iframe", { src: uh.url, title: String(sheetId) })), function () {
                            resolve();
                        });
                    })];
            });
        });
    };
    Nav.prototype.navToSite = function (url) {
        // show in new window
        window.open(url);
    };
    Object.defineProperty(Nav.prototype, "logs", {
        get: function () { return logs; },
        enumerable: false,
        configurable: true
    });
    ;
    Nav.prototype.log = function (msg) {
        logs.push(msg);
    };
    Nav.prototype.logMark = function () {
        var date = new Date();
        logMark = date.getTime();
        logs.push('log-mark: ' + date.toTimeString());
    };
    Nav.prototype.logStep = function (step) {
        logs.push(step + ': ' + (new Date().getTime() - logMark));
    };
    Nav.prototype.showReloadPage = function (msg) {
        var seconds = -1;
        this.push(React.createElement(ReloadPage, { message: msg, seconds: seconds }));
        /*
        if (seconds > 0) {
            env.setTimeout(undefined, this.reload, seconds*1000);
        }
        */
    };
    Nav.prototype.checkVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var href, ret, r, parser, htmlDoc, elHtml, newVersion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        href = document.location.href;
                        href += (href.indexOf('?') >= 0 ? '&' : '?') + '_t_t_=' + new Date().getTime();
                        return [4 /*yield*/, fetch(href)];
                    case 1:
                        ret = _a.sent();
                        return [4 /*yield*/, ret.text()];
                    case 2:
                        r = _a.sent();
                        parser = new DOMParser();
                        htmlDoc = parser.parseFromString(r, 'text/html');
                        elHtml = htmlDoc.getElementsByTagName('html');
                        newVersion = elHtml[0].getAttribute('data-version');
                        return [2 /*return*/, newVersion];
                }
            });
        });
    };
    __decorate([
        observable
    ], Nav.prototype, "user", void 0);
    return Nav;
}());
export { Nav };
export var nav = new Nav();
var TonvaView = /** @class */ (function (_super) {
    __extends(TonvaView, _super);
    function TonvaView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TonvaView;
}(NavView));
export { TonvaView };
//# sourceMappingURL=nav.js.map