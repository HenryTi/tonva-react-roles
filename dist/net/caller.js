var Caller = /** @class */ (function () {
    function Caller(params, waiting) {
        this.method = 'POST';
        this._params = params;
        this.waiting = waiting;
    }
    Object.defineProperty(Caller.prototype, "params", {
        get: function () { return this._params; },
        enumerable: true,
        configurable: true
    });
    Caller.prototype.buildParams = function () { return this.params; };
    Object.defineProperty(Caller.prototype, "headers", {
        get: function () { return undefined; },
        enumerable: true,
        configurable: true
    });
    return Caller;
}());
export { Caller };
//# sourceMappingURL=caller.js.map