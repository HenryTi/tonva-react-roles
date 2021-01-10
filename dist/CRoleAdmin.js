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
exports.CRoleAdmin = void 0;
var tonva_react_1 = require("tonva-react");
var VRoleAdmin_1 = require("./VRoleAdmin");
var CRoleAdmin = /** @class */ (function (_super) {
    __extends(CRoleAdmin, _super);
    function CRoleAdmin(res, uq, roleCaptionMap) {
        var _this = _super.call(this, res) || this;
        _this.uq = uq;
        _this.uqApi = uq.uqApi;
        _this.allRoles = uq.allRoles;
        if (roleCaptionMap) {
            _this.roleCaptions = _this.allRoles.map(function (v) { return roleCaptionMap[v] || v; });
        }
        else {
            _this.roleCaptions = _this.allRoles;
        }
        return _this;
    }
    CRoleAdmin.prototype.internalStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            function rolesBool(t) {
                return arr.map(function (v) { return t.indexOf(v) >= 0; });
            }
            var allUserRoles, arr, _i, allUserRoles_1, ur, admin, roles, item, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uqApi.getAllRoleUsers()];
                    case 1:
                        allUserRoles = _a.sent();
                        this.admins = [];
                        this.userRoles = [];
                        arr = this.allRoles.map(function (v) { return "|" + v + "|"; });
                        for (_i = 0, allUserRoles_1 = allUserRoles; _i < allUserRoles_1.length; _i++) {
                            ur = allUserRoles_1[_i];
                            admin = ur.admin, roles = ur.roles;
                            if (admin === 0) {
                                item = ur;
                                item.roles = rolesBool(roles);
                                this.userRoles.push(item);
                            }
                            else {
                                ur.isMe = ur.user === this.user.id;
                                item = ur;
                                this.admins.push(item);
                            }
                        }
                        this.openVPage(VRoleAdmin_1.VRoleAdmin);
                        return [2 /*return*/];
                }
            });
        });
    };
    CRoleAdmin.prototype.setUserRole = function (checked, iRole, user) {
        return __awaiter(this, void 0, void 0, function () {
            var userRole, roles, len, text, i, yes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRole = this.userRoles.find(function (v) { return v.user === user; });
                        roles = userRole.roles;
                        len = roles.length;
                        text = '';
                        for (i = 0; i < len; i++) {
                            yes = i === iRole ? checked : roles[i];
                            if (yes === true)
                                text += '|' + this.allRoles[i];
                        }
                        text += '|';
                        return [4 /*yield*/, this.uqApi.setUserRoles(user, 0, text)];
                    case 1:
                        _a.sent();
                        roles[iRole] = checked;
                        return [2 /*return*/];
                }
            });
        });
    };
    return CRoleAdmin;
}(tonva_react_1.Controller));
exports.CRoleAdmin = CRoleAdmin;
//# sourceMappingURL=CRoleAdmin.js.map