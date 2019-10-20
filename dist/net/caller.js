export class Caller {
    constructor(params, waiting) {
        this.method = 'POST';
        this._params = params;
        this.waiting = waiting;
    }
    get params() { return this._params; }
    buildParams() { return this.params; }
    get headers() { return undefined; }
}
//# sourceMappingURL=caller.js.map