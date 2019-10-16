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
import { Controller } from '../components';
var ControllerUq = /** @class */ (function (_super) {
    __extends(ControllerUq, _super);
    function ControllerUq(cUq, res) {
        var _this = _super.call(this, res) || this;
        _this.cUq = cUq;
        return _this;
    }
    return ControllerUq;
}(Controller));
export { ControllerUq };
//# sourceMappingURL=ControllerUq.js.map