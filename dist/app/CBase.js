import { Controller } from "../components";
export class CBase extends Controller {
    constructor(cApp) {
        super(undefined);
        this._cApp = cApp;
        this._uqs = cApp && cApp.uqs;
        this.t = this.internalT.bind(this);
    }
    get uqs() { return this._uqs; }
    get cApp() { return this._cApp; }
    internalT(str) {
        let r = super.internalT(str);
        if (r !== undefined)
            return r;
        return this._cApp.internalT(str);
    }
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
        this._owner = owner;
        this.t = this.internalT.bind(this);
    }
    internalT(str) {
        let r = super.internalT(str);
        if (r !== undefined)
            return r;
        return this._owner.internalT(str);
    }
    get owner() { return this._owner; }
}
//# sourceMappingURL=CBase.js.map