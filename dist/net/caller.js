export class Caller {
    constructor(params) {
        this.method = 'POST';
        this.params = params;
    }
    buildParams() { return this.params; }
    get headers() { return undefined; }
}
//# sourceMappingURL=caller.js.map