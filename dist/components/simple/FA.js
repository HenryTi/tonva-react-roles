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
var FA = /** @class */ (function (_super) {
    __extends(FA, _super);
    function FA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FA.prototype.render = function () {
        var _a = this.props, name = _a.name, className = _a.className, size = _a.size, spin = _a.spin, fixWidth = _a.fixWidth, border = _a.border, pull = _a.pull, pulse = _a.pulse, rotate = _a.rotate, flip = _a.flip, inverse = _a.inverse;
        var cn = classNames(className, 'fa', name && ('fa-' + name), size && 'fa-' + size, fixWidth && 'fa-fw', border && 'fa-border', pull && 'fa-pull-' + pull, spin && 'fa-spin', pulse && 'fa-pulse', rotate && 'fa-rotate-' + rotate, flip && 'fa-flip-' + flip, inverse && 'fa-inverse');
        return React.createElement("i", { className: cn });
    };
    return FA;
}(React.Component));
export { FA };
var StackedFA = /** @class */ (function (_super) {
    __extends(StackedFA, _super);
    function StackedFA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedFA.prototype.render = function () {
        var _a = this.props, className = _a.className, size = _a.size, children = _a.children;
        var cn = classNames('fa-stack', className, size && 'fa-' + size);
        return React.createElement("span", { className: cn }, children);
    };
    return StackedFA;
}(React.Component));
export { StackedFA };
//# sourceMappingURL=FA.js.map