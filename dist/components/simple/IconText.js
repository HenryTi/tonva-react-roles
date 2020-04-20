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
import * as React from 'react';
import { FA } from './FA';
var IconText = /** @class */ (function (_super) {
    __extends(IconText, _super);
    function IconText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconText.prototype.render = function () {
        var _a = this.props, icon = _a.icon, iconClass = _a.iconClass, text = _a.text, textClass = _a.textClass;
        return React.createElement("div", { className: "py-2" },
            React.createElement(FA, { className: iconClass, name: icon, fixWidth: true }),
            React.createElement("span", { className: textClass }, text));
    };
    return IconText;
}(React.Component));
export { IconText };
//# sourceMappingURL=IconText.js.map