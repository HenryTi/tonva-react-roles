"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VRoleAdmin = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var mobx_react_1 = require("mobx-react");
var tonva_react_1 = require("tonva-react");
var VAddUser_1 = require("./VAddUser");
var VRoleAdmin = /** @class */ (function (_super) {
    __extends(VRoleAdmin, _super);
    function VRoleAdmin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderItem = function (userRole, isMe) {
            if (!userRole)
                return null;
            var user = userRole.user, roles = userRole.roles, isDeleted = userRole.isDeleted;
            var roleCaptions = _this.controller.roleCaptions;
            var onUndo = function () { return _this.controller.restoreUser(userRole); };
            var onDelete = function () { return _this.controller.deleteUser(userRole); };
            var onRightClick;
            var rightIcon;
            var vUser = _this.renderUser(user);
            var cn = 'bg-white border-top ';
            if (isMe === true) {
                cn += 'mb-1';
                vUser = jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [vUser, jsx_runtime_1.jsx("small", __assign({ className: "ml-1 text-success" }, { children: "[\u81EA\u5DF1]" }), void 0)] }, void 0);
            }
            if (isDeleted === true) {
                onRightClick = onUndo;
                rightIcon = 'undo';
                vUser = jsx_runtime_1.jsx("del", { children: vUser }, void 0);
            }
            else {
                onRightClick = onDelete;
                rightIcon = 'times';
            }
            var right = jsx_runtime_1.jsx("div", __assign({ className: "p-3 cursor-pointer text-info", onClick: onRightClick }, { children: jsx_runtime_1.jsx(tonva_react_1.FA, { name: rightIcon }, void 0) }), void 0);
            return jsx_runtime_1.jsx(tonva_react_1.LMR, __assign({ className: cn, left: jsx_runtime_1.jsx("div", __assign({ className: "p-3 w-12c" }, { children: vUser }), void 0), right: right }, { children: jsx_runtime_1.jsx("div", __assign({ className: "d-flex flex-wrap" }, { children: roles.map(function (v, i) {
                        var vCap = roleCaptions[i];
                        if (isDeleted === true)
                            vCap = jsx_runtime_1.jsx("del", { children: vCap }, void 0);
                        return jsx_runtime_1.jsxs("label", __assign({ className: "m-3" }, { children: [jsx_runtime_1.jsx("input", { className: "mr-2", type: 'checkbox', disabled: isDeleted, defaultChecked: v, onChange: function (e) { return _this.onRoleChange(e, i, userRole); } }, void 0), vCap] }), i);
                    }) }), void 0) }), user);
        };
        return _this;
        /*
        private renderUser = (user:User) => {
            let {name} = user;
            return <><UserIcon id={user.id} /> {name}</>;
        }
        */
    }
    VRoleAdmin.prototype.header = function () { return '设置用户角色'; };
    VRoleAdmin.prototype.content = function () {
        var _this = this;
        var userRoles = this.controller.userRoles;
        var VItem = mobx_react_1.observer(function (v) { return _this.renderItem(v.userRole, v.isMe); });
        var VUserRoles = mobx_react_1.observer(function () { return jsx_runtime_1.jsx(jsx_runtime_1.Fragment, { children: userRoles.map(function (v) {
                return jsx_runtime_1.jsx(VItem, { userRole: v, isMe: false }, void 0);
            }) }, void 0); });
        /*
        <div className="mx-3 mt-3 mb-1">管理员</div>
        <div className="d-flex bg-white border-top flex-wrap">
            {admins.map(v => this.renderAdmin(v))}
        </div>
        */
        var MeItem = mobx_react_1.observer(function () { return jsx_runtime_1.jsx(VItem, { userRole: _this.controller.meRoles, isMe: true }, void 0); });
        return jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsxs("div", __assign({ className: "mx-3 mt-3 mb-1 d-flex align-items-end" }, { children: [jsx_runtime_1.jsx("div", __assign({ className: "mr-auto" }, { children: "\u7528\u6237\u89D2\u8272" }), void 0),
                        jsx_runtime_1.jsxs("button", __assign({ className: "btn btn-sm btn-outline-primary", onClick: function () { return _this.openVPage(VAddUser_1.VAddUser); } }, { children: [jsx_runtime_1.jsx(tonva_react_1.FA, { name: "plus" }, void 0), " \u589E\u52A0"] }), void 0)] }), void 0),
                jsx_runtime_1.jsx(MeItem, {}, void 0),
                jsx_runtime_1.jsx(VUserRoles, {}, void 0)] }, void 0);
    };
    /*
    private renderAdmin = ({user, roles, isMe}:UserRole) => {
        let color = '', meText:any;
        if (isMe === true) {
            color = 'text-primary';
            meText = <small className="text-muted ml-1">[自己]</small>;
        }
        return <div key={user} className={'m-3 p-2 d-flex border rounded align-items-center ' + color}>
            {this.renderUser(user)} {meText}
        </div>
    }
    */
    VRoleAdmin.prototype.onRoleChange = function (event, iRole, userRole) {
        return __awaiter(this, void 0, void 0, function () {
            var target;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        target = event.target;
                        target.disabled = true;
                        return [4 /*yield*/, this.controller.setUserRole(target.checked, iRole, userRole)];
                    case 1:
                        _a.sent();
                        target.disabled = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    return VRoleAdmin;
}(tonva_react_1.VPage));
exports.VRoleAdmin = VRoleAdmin;
//# sourceMappingURL=VRoleAdmin.js.map