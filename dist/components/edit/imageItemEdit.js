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
import { observable } from 'mobx';
import { ResUploader } from '../resUploader';
import { Image } from '../image';
import { nav } from '../nav';
import { Page } from '../page';
import { ItemEdit } from './itemEdit';
var ImageItemEdit = /** @class */ (function (_super) {
    __extends(ImageItemEdit, _super);
    function ImageItemEdit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overSize = false;
        _this.upload = function () { return __awaiter(_this, void 0, void 0, function () {
            var ret;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.resUploader)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.resUploader.upload()];
                    case 1:
                        ret = _a.sent();
                        if (ret === null) {
                            this.overSize = true;
                            setTimeout(function () { return _this.overSize = false; }, 3000);
                            return [2 /*return*/];
                        }
                        this.resId = ret;
                        this.isChanged = (this.resId !== this.value);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.page = observer(function (props) {
            var resolve = props.resolve;
            var right = React.createElement("button", { className: "btn btn-sm btn-success", disabled: !_this.isChanged, onClick: function () { return resolve(_this.resId); } }, "\u4FDD\u5B58");
            var overSize;
            if (_this.overSize === true) {
                overSize = React.createElement("div", { className: "text-danger" },
                    React.createElement("i", { className: "fa fa-times-circle" }),
                    " \u56FE\u7247\u6587\u4EF6\u5927\u5C0F\u8D85\u8FC72M\uFF0C\u65E0\u6CD5\u4E0A\u4F20");
            }
            return React.createElement(Page, { header: '更改' + _this.label, right: right },
                React.createElement("div", { className: "my-3 px-3 py-3 bg-white" },
                    React.createElement("div", null,
                        React.createElement("div", null, "\u4E0A\u4F20\u56FE\u7247\uFF1A"),
                        React.createElement("div", { className: "my-3" },
                            React.createElement(ResUploader, { ref: function (v) { return _this.resUploader = v; }, multiple: false, maxSize: 2048 })),
                        React.createElement("div", null,
                            React.createElement("button", { className: "btn btn-primary", onClick: _this.upload }, "\u4E0A\u4F20"))),
                    overSize,
                    React.createElement("div", { className: "small muted my-4" }, "\u652F\u6301JPG\u3001GIF\u3001PNG\u683C\u5F0F\u56FE\u7247\uFF0C\u4E0D\u8D85\u8FC72M\u3002"),
                    React.createElement("div", { className: "d-flex" },
                        React.createElement("div", { className: "w-12c h-12c mr-4", style: { border: '1px dotted gray', padding: '8px' } },
                            React.createElement(Image, { className: "w-100 h-100", src: _this.resId })),
                        React.createElement("div", null,
                            React.createElement("div", { className: "small" }, "\u56FE\u7247\u9884\u89C8"),
                            React.createElement(Image, { className: "w-4c h-4c mt-3", src: _this.resId })))));
        });
        return _this;
    }
    ImageItemEdit.prototype.internalStart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.resId = this.value;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        nav.push(React.createElement(_this.page, { resolve: resolve, reject: reject }), function () { return reject(); });
                    })];
            });
        });
    };
    __decorate([
        observable
    ], ImageItemEdit.prototype, "resId", void 0);
    __decorate([
        observable
    ], ImageItemEdit.prototype, "overSize", void 0);
    return ImageItemEdit;
}(ItemEdit));
export { ImageItemEdit };
//# sourceMappingURL=imageItemEdit.js.map