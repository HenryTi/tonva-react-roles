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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import '../../css/va-lmr.css';
var LMR = /** @class */ (function (_super) {
    __extends(LMR, _super);
    function LMR() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LMR.prototype.render = function () {
        var _a = this.props, className = _a.className, left = _a.left, children = _a.children, right = _a.right, onClick = _a.onClick;
        var l, r;
        if (left !== undefined)
            l = React.createElement("header", null, left);
        if (right !== undefined)
            r = React.createElement("footer", null, right);
        var cursor;
        if (onClick !== undefined)
            cursor = 'cursor-pointer';
        return React.createElement("div", { className: classNames('va-lmr', className, cursor), onClick: onClick },
            l,
            React.createElement("div", null, children),
            r);
    };
    LMR = __decorate([
        observer
    ], LMR);
    return LMR;
}(React.Component));
export { LMR };
//# sourceMappingURL=LMR.js.map