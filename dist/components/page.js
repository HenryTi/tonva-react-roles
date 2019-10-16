var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { observer } from 'mobx-react';
import classNames from 'classnames';
import _ from 'lodash';
import { PageHeader } from './pageHeader';
var scrollTimeGap = 100;
var ScrollView = /** @class */ (function (_super) {
    __extends(ScrollView, _super);
    function ScrollView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bottomTime = 0;
        _this.topTime = 0;
        _this.onScroll = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var _a, onScroll, onScrollTop, onScrollBottom, el, topTime, bottomTime;
            return __generator(this, function (_b) {
                _a = this.props, onScroll = _a.onScroll, onScrollTop = _a.onScrollTop, onScrollBottom = _a.onScrollBottom;
                if (onScroll)
                    this.props.onScroll(e);
                el = e.target;
                if (el.scrollTop < 30) {
                    //this.eachChild(this, 'top');
                    if (onScrollTop !== undefined) {
                        topTime = new Date().getTime();
                        if (topTime - this.topTime > scrollTimeGap) {
                            this.topTime = topTime;
                            onScrollTop();
                        }
                    }
                }
                if (el.scrollTop + el.offsetHeight > el.scrollHeight - 30) {
                    //this.eachChild(this, 'bottom');
                    if (onScrollBottom !== undefined) {
                        bottomTime = new Date().getTime();
                        if (bottomTime - this.bottomTime > scrollTimeGap) {
                            this.bottomTime = bottomTime;
                            onScrollBottom();
                        }
                    }
                }
                return [2 /*return*/];
            });
        }); };
        return _this;
    }
    ScrollView.prototype.eachChild = function (c, direct) {
        var _this = this;
        var props = c.props;
        if (props === undefined)
            return;
        var children = props.children;
        if (children === undefined)
            return;
        React.Children.forEach(children, function (child, index) {
            var _$scroll = child._$scroll;
            if (_$scroll)
                _$scroll(direct);
            console.log(child.toString());
            _this.eachChild(child, direct);
        });
    };
    ScrollView.prototype.render = function () {
        return (React.createElement("main", { className: this.props.className, onScroll: this.onScroll }, this.props.children));
    };
    return ScrollView;
}(React.Component));
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page(props) {
        var _this = _super.call(this, props) || this;
        var tabs = props.tabs;
        if (tabs === undefined || tabs.length === 0)
            return _this;
        _this.tabs = tabs;
        var cur;
        var tabStates = [];
        for (var _i = 0, tabs_1 = tabs; _i < tabs_1.length; _i++) {
            var tab = tabs_1[_i];
            var t = _.clone(tab);
            if (cur === undefined) {
                if (t.isSelected === true)
                    cur = t;
                else
                    t.isSelected = false;
            }
            else {
                t.isSelected = false;
            }
            t.isMounted = false;
            tabStates.push(t);
        }
        _this.state = {
            cur: cur,
            tabs: tabStates,
        };
        return _this;
    }
    Page.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var t0, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.tabs === undefined)
                            return [2 /*return*/];
                        t0 = this.state.tabs.find(function (v) { return v.isSelected === true; });
                        if (t0 === undefined) {
                            t0 = this.state.tabs[0];
                            if (t0 === undefined)
                                return [2 /*return*/];
                        }
                        return [4 /*yield*/, t0.load];
                    case 1:
                        _a = (_b.sent());
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, t0.load()];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        _a;
                        return [2 /*return*/];
                }
            });
        });
    };
    Page.prototype.onTabClick = function (tab) {
        return __awaiter(this, void 0, void 0, function () {
            var cur, tabs, _i, tabs_2, t, load;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (tab.isSelected === true)
                            return [2 /*return*/];
                        tabs = this.state.tabs;
                        for (_i = 0, tabs_2 = tabs; _i < tabs_2.length; _i++) {
                            t = tabs_2[_i];
                            if (t === tab) {
                                t.isSelected = true;
                                cur = t;
                            }
                            else
                                t.isSelected = false;
                        }
                        if (!(cur.isMounted !== true)) return [3 /*break*/, 2];
                        load = cur.load;
                        if (!(load !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, load()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.setState({
                            cur: cur,
                            tabs: tabs
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Page.prototype.onTouchStart = function (evt) {
    };
    Page.prototype.renderTabs = function (footer) {
        var _this = this;
        var _a = this.props, header = _a.header, back = _a.back, right = _a.right, keepHeader = _a.keepHeader, headerClassName = _a.headerClassName, tabPosition = _a.tabPosition;
        var cur = this.state.cur;
        var tabs = React.createElement("div", null, this.state.tabs.map(function (tab, index) {
            var icon = tab.icon, isSelected = tab.isSelected, title = tab.title, redDot = tab.redDot, className = tab.className;
            var img, redDotView, cn;
            if (icon !== undefined)
                img = React.createElement("img", { src: icon, alt: "tab icon" });
            if (redDot !== undefined) {
                var v = redDot.get();
                if (v < 0) {
                    cn = classNames('red-dot', className);
                    redDotView = React.createElement("u", null);
                }
                else if (v > 0) {
                    cn = classNames('red-dot', 'num', className);
                    redDotView = React.createElement("u", null, v);
                }
            }
            return React.createElement("div", { key: index, className: classNames('va-tab', { cur: isSelected }), onClick: function () { return _this.onTabClick(tab); } },
                img,
                React.createElement("div", { className: cn },
                    title,
                    redDotView));
        }));
        var pageHeader = header !== false &&
            React.createElement(PageHeader, { back: back, center: keepHeader === true ? header : (cur && (cur.header || cur.title)), right: right, className: headerClassName });
        return React.createElement("article", { className: 'page-container' },
            pageHeader,
            tabPosition === 'top' && tabs,
            React.createElement("section", { className: "position-relative" },
                this.props.sideBar,
                this.state.tabs.map(function (tab, index) {
                    var isSelected = tab.isSelected, isMounted = tab.isMounted, content = tab.content;
                    if (isSelected === true || isMounted === true) {
                        tab.isMounted = true;
                        return React.createElement(ScrollView, { key: index, className: classNames({ invisible: isSelected === false }), onScroll: tab.onScroll, onScrollTop: tab.onScrollTop, onScrollBottom: tab.onScrollBottom }, (typeof content) === 'function' ? content() : content);
                    }
                    return undefined;
                })),
            tabPosition !== 'top' && tabs,
            footer);
    };
    Page.prototype.renderSingle = function (footer) {
        var _a = this.props, back = _a.back, header = _a.header, right = _a.right, onScroll = _a.onScroll, onScrollTop = _a.onScrollTop, onScrollBottom = _a.onScrollBottom, children = _a.children, headerClassName = _a.headerClassName;
        var pageHeader = header !== false && React.createElement(PageHeader, { back: back, center: header, right: right, logout: this.props.logout, className: headerClassName });
        return (React.createElement("article", { className: 'page-container', onTouchStart: this.onTouchStart },
            pageHeader,
            React.createElement("section", { className: "position-relative" },
                this.props.sideBar,
                React.createElement(ScrollView, { onScroll: onScroll, onScrollTop: onScrollTop, onScrollBottom: onScrollBottom }, children)),
            footer));
    };
    Page.prototype.render = function () {
        var footer = this.props.footer;
        var elFooter = footer !== undefined && React.createElement("footer", null, footer);
        if (this.tabs !== undefined)
            return this.renderTabs(elFooter);
        else
            return this.renderSingle(elFooter);
    };
    Page = __decorate([
        observer
    ], Page);
    return Page;
}(React.Component));
export { Page };
//# sourceMappingURL=page.js.map