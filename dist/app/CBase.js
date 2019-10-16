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
import { Controller } from "../components";
var CBase = /** @class */ (function (_super) {
    __extends(CBase, _super);
    function CBase(cApp) {
        var _this = _super.call(this, undefined) || this;
        _this._cApp = cApp;
        _this._uqs = cApp.uqs;
        _this.init();
        return _this;
    }
    Object.defineProperty(CBase.prototype, "uqs", {
        get: function () { return this._uqs; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CBase.prototype, "cApp", {
        get: function () { return this._cApp; },
        enumerable: true,
        configurable: true
    });
    CBase.prototype.init = function () { };
    CBase.prototype.newC = function (type) {
        return new type(this.cApp);
    };
    CBase.prototype.newSub = function (type) {
        return new type(this);
    };
    return CBase;
}(Controller));
export { CBase };
var CSub = /** @class */ (function (_super) {
    __extends(CSub, _super);
    function CSub(owner) {
        var _this = _super.call(this, owner.cApp) || this;
        _this._owner = owner;
        return _this;
    }
    Object.defineProperty(CSub.prototype, "owner", {
        get: function () { return this._owner; },
        enumerable: true,
        configurable: true
    });
    return CSub;
}(CBase));
export { CSub };
//# sourceMappingURL=CBase.js.map