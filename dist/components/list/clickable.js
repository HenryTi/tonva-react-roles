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
import classNames from 'classnames';
import { ListBase } from './base';
var Clickable = /** @class */ (function (_super) {
    __extends(Clickable, _super);
    function Clickable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.render = function (item, index) {
            var _a = _this.list.props.item, className = _a.className, key = _a.key, onClick = _a.onClick;
            return React.createElement("li", { key: key === undefined ? index : key(item), className: classNames('va-row-clickable', className), onClick: function () { return onClick && onClick(item); } }, _this.renderContent(item, index));
        };
        return _this;
    }
    return Clickable;
}(ListBase));
export { Clickable };
//# sourceMappingURL=clickable.js.map