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
//import _ from 'lodash';
import { nav } from './nav';
var PageHeader = /** @class */ (function (_super) {
    __extends(PageHeader, _super);
    function PageHeader(props) {
        var _this = _super.call(this, props) || this;
        _this.logoutClick = function () {
            nav.showLogout(_this.logout);
        };
        _this.logout = function () { return __awaiter(_this, void 0, void 0, function () {
            var logout;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logout = this.props.logout;
                        if (!(typeof logout === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, logout()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, nav.logout(undefined)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        //this.navChange = this.navChange.bind(this);
        _this.state = {
            //hasBack: false,
            hasBack: nav.level > 1
        };
        return _this;
    }
    /*
    navChange() {
        this.setState({
            hasBack: nav.level > 1
        })
    }
    */
    /*
    componentWillMount() {
        this.navChange();
        //this.navChangeHandler = nav.events.add('change', this.navChange);
    }
    */
    PageHeader.prototype.componentWillUnmount = function () {
        //nav.events.remove('change', this.navChangeHandler);
    };
    PageHeader.prototype.back = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nav.back()];
                    case 1:
                        _a.sent(); // 这个才会显示confirm box，在dataForm里面，如果输入了数据的话
                        return [2 /*return*/];
                }
            });
        });
    };
    PageHeader.prototype.openWindow = function () {
        window.open(document.location.href);
    };
    PageHeader.prototype.render = function () {
        var b = this.state.hasBack || window.self !== window.top;
        var _a = this.props, right = _a.right, center = _a.center, logout = _a.logout, className = _a.className;
        var back, pop, debugLogout;
        if (logout !== undefined && window.self === window.top) {
            if ((typeof logout === 'boolean' && logout === true)
                || typeof logout === 'function') {
                var user = nav.user;
                if (user !== undefined) {
                    var nick = user.nick, name_1 = user.name;
                    debugLogout = React.createElement("div", { className: "d-flex align-items-center" },
                        React.createElement("small", { className: "text-light" }, nick || name_1),
                        // eslint-disable-next-line
                        React.createElement("div", { className: "ml-2 py-2 px-3 cursor-pointer", role: "button", onClick: this.logoutClick },
                            React.createElement("i", { className: "fa fa-sign-out fa-lg" })));
                }
            }
        }
        if (b) {
            switch (this.props.back) {
                case 'none':
                    back = undefined;
                    break;
                default:
                case 'back':
                    back = React.createElement("nav", { onClick: this.back },
                        React.createElement("i", { className: "fa fa-angle-left" }));
                    break;
                case 'close':
                    back = React.createElement("nav", { onClick: this.back },
                        React.createElement("i", { className: "fa fa-close" }));
                    break;
            }
        }
        if (window.self !== window.top) {
            console.log(document.location.href);
            pop = React.createElement("header", { onClick: this.openWindow });
        }
        if (back === undefined && typeof center === 'string') {
            center = React.createElement("div", { className: "px-3" }, center);
        }
        var rightView = (right || debugLogout) && React.createElement("aside", null,
            right,
            " ",
            debugLogout);
        return React.createElement("header", { className: className },
            pop,
            back,
            React.createElement("div", null, center),
            rightView);
    };
    return PageHeader;
}(React.Component));
export { PageHeader };
//# sourceMappingURL=pageHeader.js.map