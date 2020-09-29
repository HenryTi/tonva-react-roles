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
import { nav } from '../nav';
import { Page } from '../page/page';
import { observer } from 'mobx-react';
import { ItemEdit } from './itemEdit';
var StringItemEdit = /** @class */ (function (_super) {
    __extends(StringItemEdit, _super);
    function StringItemEdit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            _this.newValue = evt.target.value;
            var preValue = _this.value;
            _this.isChanged = (_this.newValue !== preValue);
        };
        _this.onBlur = function (evt) {
            _this.verifyValue();
        };
        _this.onFocus = function () {
            _this.error = undefined;
        };
        _this.page = observer(function (props) {
            var resolve = props.resolve;
            var onSave = function () {
                _this.verifyValue();
                if (_this.error === undefined) {
                    var val = _this.newValue;
                    resolve(val);
                }
            };
            var right = React.createElement("button", { className: "btn btn-sm btn-success align-self-center mr-2", disabled: !_this.isChanged, onClick: onSave }, "\u4FDD\u5B58");
            var onKeyDown = function (evt) {
                if (evt.keyCode === 13)
                    onSave();
            };
            var _a = _this.inputOptions(), type = _a.type, max = _a.max, min = _a.min, step = _a.step;
            return React.createElement(Page, { header: _this.label, right: right },
                React.createElement("div", { className: "m-3" },
                    React.createElement("input", { type: type, onChange: _this.onChange, onKeyDown: onKeyDown, onBlur: _this.onBlur, onFocus: _this.onFocus, className: "form-control", defaultValue: _this.value, min: min, max: max, step: step }),
                    _this.uiItem && React.createElement("div", { className: "small muted m-2" }, _this.uiItem.placeholder),
                    _this.error && React.createElement("div", { className: "text-danger" }, _this.error)));
        });
        return _this;
    }
    Object.defineProperty(StringItemEdit.prototype, "uiItem", {
        get: function () { return this._uiItem; },
        enumerable: false,
        configurable: true
    });
    StringItemEdit.prototype.internalStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var element = React.createElement(_this.page, { resolve: resolve, reject: reject });
                        nav.push(element, reject);
                    })];
            });
        });
    };
    StringItemEdit.prototype.inputOptions = function () {
        return {
            type: 'text',
        };
    };
    return StringItemEdit;
}(ItemEdit));
export { StringItemEdit };
//# sourceMappingURL=stringItemEdit.js.map