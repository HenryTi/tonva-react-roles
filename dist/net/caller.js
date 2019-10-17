export class Caller {
    constructor(params) {
        this.method = 'POST';
        this._params = params;
    }
    get params() { return this._params; }
    buildParams() { return this.params; }
    get headers() { return undefined; }
}
//# sourceMappingURL=caller.js.map