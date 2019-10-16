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
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import '../../css/va-tab.css';
var Tab = /** @class */ (function () {
    function Tab() {
    }
    Object.defineProperty(Tab.prototype, "content", {
        get: function () {
            if (this.selected !== true)
                return this._content;
            if (this._content !== undefined)
                return this._content;
            return this._content = this.contentBuilder();
        },
        enumerable: true,
        configurable: true
    });
    Tab.prototype.shown = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.onShown !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onShown()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this._content !== undefined)
                            return [2 /*return*/];
                        if (!(this.load !== undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.load()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        observable
    ], Tab.prototype, "selected", void 0);
    return Tab;
}());
export var TabCaptionComponent = function (label, icon, color) { return React.createElement("div", { className: 'd-flex justify-content-center align-items-center flex-column cursor-pointer ' + color },
    React.createElement("div", null,
        React.createElement("i", { className: 'fa fa-lg fa-' + icon })),
    React.createElement("small", null, label)); };
var Tabs = /** @class */ (function (_super) {
    __extends(Tabs, _super);
    function Tabs(props) {
        var _this = _super.call(this, props) || this;
        _this.tabClick = function (tab) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tab.shown()];
                    case 1:
                        _a.sent();
                        this.selectedTab.selected = false;
                        tab.selected = true;
                        this.selectedTab = tab;
                        return [2 /*return*/];
                }
            });
        }); };
        var _a = _this.props, size = _a.size, tabs = _a.tabs, tabBack = _a.tabBg, contentBack = _a.contentBg, sep = _a.sep, selected = _a.selected;
        _this.size = size || 'md';
        _this.tabs = tabs.map(function (v) {
            var tab = new Tab();
            var name = v.name, caption = v.caption, content = v.content, notify = v.notify, load = v.load, onShown = v.onShown;
            tab.name = name;
            tab.selected = false;
            tab.caption = caption;
            tab.contentBuilder = content;
            tab.notify = notify;
            tab.load = load;
            tab.onShown = onShown;
            return tab;
        });
        _this.tabBg = tabBack || 'bg-light';
        _this.contentBg = contentBack;
        _this.sep = sep || 'border-top border-gray';
        if (selected !== undefined) {
            _this.selectedTab = _this.tabs.find(function (v) { return v.name === selected; });
        }
        if (_this.selectedTab === undefined)
            _this.selectedTab = _this.tabs[0];
        _this.selectedTab.selected = true;
        return _this;
    }
    /*
    async componentWillMount() {
        if (this.tabs === undefined) return;
        if (this.tabs.length === 0) return;
        let tab = this.tabs[0];
        await tab.start();
    }
    */
    Tabs.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tab;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.tabs === undefined)
                            return [2 /*return*/];
                        if (this.tabs.length === 0)
                            return [2 /*return*/];
                        tab = this.tabs[0];
                        return [4 /*yield*/, tab.shown()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tabs.prototype.showTab = function (tabName) {
        var tab = this.tabs.find(function (v) { return v.name === tabName; });
        if (tab === undefined)
            return;
        if (this.selectedTab !== undefined)
            this.selectedTab.selected = false;
        tab.selected = true;
        this.selectedTab = tab;
    };
    Tabs.prototype.render = function () {
        var _this = this;
        var cn = classNames('tab', 'tab-' + this.size);
        var content = React.createElement("div", { className: classNames(this.contentBg, 'tab-content') }, this.tabs.map(function (v, index) {
            var style = {
                display: v.selected === true ? undefined : 'none'
            };
            return React.createElement("div", { key: index, style: style }, v.content);
        }));
        var _a = this.props, tabPosition = _a.tabPosition, borderColor = _a.borderColor;
        var bsCur, bsTab;
        if (borderColor) {
            bsCur = {
                borderColor: borderColor,
                borderStyle: 'solid',
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: 1,
            };
            bsTab = {
                borderColor: borderColor,
                borderStyle: 'solid',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderLeftWidth: 0,
                borderRightWidth: 0,
            };
            if (tabPosition === 'top') {
                bsCur.borderBottomWidth = 0;
                bsCur.borderTopLeftRadius = 10;
                bsCur.borderTopRightRadius = 10;
                bsTab.borderTopWidth = 0;
            }
            else {
                bsCur.borderTopWidth = 0;
                bsCur.borderBottomLeftRadius = 10;
                bsCur.borderBottomRightRadius = 10;
                bsTab.borderBottomWidth = 0;
            }
        }
        var tabs = React.createElement("div", { className: classNames(this.tabBg, this.sep, 'tab-tabs') }, this.tabs.map(function (v, index) {
            var selected = v.selected, caption = v.caption, notify = v.notify;
            var notifyCircle;
            if (notify !== undefined) {
                var num = notify.get();
                if (num !== undefined) {
                    if (num > 0)
                        notifyCircle = React.createElement("u", null, num > 99 ? '99+' : num);
                    else if (num < 0)
                        notifyCircle = React.createElement("u", { className: "dot" });
                }
            }
            return React.createElement("div", { key: index, className: "", onClick: function () { return _this.tabClick(v); }, style: selected === true ? bsCur : bsTab },
                React.createElement("div", { className: "align-self-center" },
                    notifyCircle,
                    caption(selected)));
        }));
        return React.createElement("div", { className: cn }, tabPosition === 'top' ?
            React.createElement(React.Fragment, null,
                tabs,
                content) :
            React.createElement(React.Fragment, null,
                content,
                tabs));
    };
    __decorate([
        observable
    ], Tabs.prototype, "selectedTab", void 0);
    __decorate([
        observable
    ], Tabs.prototype, "tabs", void 0);
    Tabs = __decorate([
        observer
    ], Tabs);
    return Tabs;
}(React.Component));
export { Tabs };
;
//# sourceMappingURL=tabs.js.map