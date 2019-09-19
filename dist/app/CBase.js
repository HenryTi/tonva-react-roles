import { Controller } from "../components";
export class CBase extends Controller {
    constructor(cApp) {
        super(undefined);
        this.cApp = cApp;
        this._uqs = cApp.uqs;
        this.init();
    }
    get uqs() { return this._uqs; }
    init() { }
    newC(type) {
        return new type(this.cApp);
    }
    newSub(type) {
        return new type(this);
    }
}
export class CSub extends CBase {
    constructor(owner) {
        super(owner.cApp);
        this.owner = owner;
    }
}
//# sourceMappingURL=CBase.js.map