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
import * as React from 'react';
import classNames from 'classnames';
//import { TextWidget } from './textWidget';
import { Widget } from './widget';
var radioStyle = { height: 'auto' };
var RadioWidget = /** @class */ (function (_super) {
    __extends(RadioWidget, _super);
    function RadioWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputs = {};
        return _this;
    }
    Object.defineProperty(RadioWidget.prototype, "ui", {
        get: function () { return this._ui; },
        enumerable: false,
        configurable: true
    });
    ;
    RadioWidget.prototype.setElementValue = function (value) {
        for (var i in this.inputs) {
            var input = this.inputs[i];
            input.checked = value === input.value;
        }
    };
    RadioWidget.prototype.setReadOnly = function (value) {
        this.readOnly = value;
        for (var i in this.inputs)
            this.inputs[i].readOnly = value;
    };
    RadioWidget.prototype.setDisabled = function (value) {
        this.disabled = value;
        for (var i in this.inputs)
            this.inputs[i].disabled = value;
    };
    /*
    protected onInputChange = (evt: React.ChangeEvent<any>) => {
        this.changeValue(evt.target.value, true);
    }
    */
    RadioWidget.prototype.render = function () {
        var _this = this;
        var _a = this.ui, defaultValue = _a.defaultValue, list = _a.list;
        var isRow = this.context.isRow;
        var rowKey;
        if (isRow === true) {
            rowKey = this.context.rowKey;
        }
        var cn = classNames(this.className, 'py-0');
        return React.createElement("span", { className: cn, style: radioStyle }, list.map(function (v, index) {
            var value = v.value, title = v.title;
            var name = _this.name;
            if (rowKey !== undefined)
                name += '-' + rowKey;
            return React.createElement("label", { key: index, className: "form-radio-inline" },
                React.createElement("input", { ref: function (input) { return _this.inputs[index] = input; }, type: "radio", name: name, value: value, defaultChecked: (_this.defaultValue || defaultValue) === value, onChange: _this.onInputChange }),
                title || value);
            //</span>
        }));
    };
    return RadioWidget;
}(Widget));
export { RadioWidget };
//# sourceMappingURL=radioWidget.js.map