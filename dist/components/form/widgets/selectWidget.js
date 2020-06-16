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
import * as React from 'react';
import classNames from 'classnames';
import { observable } from 'mobx';
import { Widget } from './widget';
var SelectWidget = /** @class */ (function (_super) {
    __extends(SelectWidget, _super);
    function SelectWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onInputChange = function (evt) {
            _this.setDataValue(evt.target.value);
        };
        return _this;
    }
    Object.defineProperty(SelectWidget.prototype, "ui", {
        get: function () { return this._ui; },
        enumerable: false,
        configurable: true
    });
    ;
    SelectWidget.prototype.setElementValue = function (value) { this.select.value = value; };
    SelectWidget.prototype.setReadOnly = function (value) { this.select.disabled = this.readOnly = !value; };
    SelectWidget.prototype.setDisabled = function (value) { this.select.disabled = this.disabled = value; };
    SelectWidget.prototype.render = function () {
        var _this = this;
        if (this.readOnly === true) {
            var option = this.ui.list.find(function (v) { return v.value === _this.value; });
            var title = (option === undefined) ? '(???)' : option.title;
            return React.createElement("span", { className: "form-control w-min-6c" }, title);
        }
        return React.createElement("select", { ref: function (select) { return _this.select = select; }, className: classNames(this.className, 'form-control'), defaultValue: this.defaultValue, onChange: this.onInputChange }, this.ui.list.map(function (v, index) {
            var title = v.title, value = v.value;
            var cn;
            //if (value === undefined || value === null) cn = 'text-light small';
            //else cn = 'text-danger';
            return React.createElement("option", { className: cn, key: index, value: value }, title || value);
        }));
    };
    __decorate([
        observable
    ], SelectWidget.prototype, "readOnly", void 0);
    return SelectWidget;
}(Widget));
export { SelectWidget };
//# sourceMappingURL=selectWidget.js.map