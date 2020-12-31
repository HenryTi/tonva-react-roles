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
//import * as React from 'react';
import { TextWidget } from './textWidget';
var DateWidget = /** @class */ (function (_super) {
    __extends(DateWidget, _super);
    function DateWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'date';
        return _this;
    }
    return DateWidget;
}(TextWidget));
export { DateWidget };
var DateTimeWidget = /** @class */ (function (_super) {
    __extends(DateTimeWidget, _super);
    function DateTimeWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'datetime';
        return _this;
    }
    return DateTimeWidget;
}(TextWidget));
export { DateTimeWidget };
var TimeWidget = /** @class */ (function (_super) {
    __extends(TimeWidget, _super);
    function TimeWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'time';
        return _this;
    }
    return TimeWidget;
}(TextWidget));
export { TimeWidget };
var MonthWidget = /** @class */ (function (_super) {
    __extends(MonthWidget, _super);
    function MonthWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'month';
        return _this;
    }
    return MonthWidget;
}(TextWidget));
export { MonthWidget };
//# sourceMappingURL=dateWidget.js.map