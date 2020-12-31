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
import { ListBase } from './base';
import { uid } from '../../tool/uid';
var Static = /** @class */ (function (_super) {
    __extends(Static, _super);
    function Static() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.render = function (item, index) {
            var _a = _this.list.props.item, className = _a.className, key = _a.key;
            if (typeof item === 'string') {
                var cn = classNames('va-list-gap', 'px-3', 'pt-1');
                return React.createElement("li", { key: uid(), className: cn }, item);
            }
            return React.createElement("li", { key: key === undefined ? index : key(item), className: classNames(className) }, _this.renderContent(item, index));
        };
        return _this;
    }
    return Static;
}(ListBase));
export { Static };
//# sourceMappingURL=static.js.map