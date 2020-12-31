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
var PasswordWidget = /** @class */ (function (_super) {
    __extends(PasswordWidget, _super);
    function PasswordWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'password';
        return _this;
    }
    return PasswordWidget;
}(TextWidget));
export { PasswordWidget };
var UrlWidget = /** @class */ (function (_super) {
    __extends(UrlWidget, _super);
    function UrlWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'url';
        return _this;
    }
    return UrlWidget;
}(TextWidget));
export { UrlWidget };
var EmailWidget = /** @class */ (function (_super) {
    __extends(EmailWidget, _super);
    function EmailWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputType = 'email';
        return _this;
    }
    return EmailWidget;
}(TextWidget));
export { EmailWidget };
//# sourceMappingURL=passwordWidget.js.map