import { UqAppCache } from './caches';
export class Uqs {
    constructor(tonvaAppName) {
        this.collection = {};
        this.name = name;
        let parts = tonvaAppName.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.uqAppCache = new UqAppCache(this.appOwner, this.appName);
    }
    addUq(uq) {
        this.collection[uq.name] = uq;
    }
    setTuidImportsLocal() {
        for (let i in this.collection) {
            let uq = this.collection[i];
            for (let tuid of uq.tuidArr) {
                if (tuid.isImport === true) {
                    this.setInner(tuid);
                }
            }
        }
    }
    setInner(tuidImport) {
        let { from } = tuidImport;
        let uq = this.collection[from.owner + '/' + from.uq];
        if (uq === undefined) {
            //debugger;
            return;
        }
        let tuid = uq.tuid(tuidImport.name);
        if (tuid === undefined) {
            //debugger;
            return;
        }
        if (tuid.isImport === true) {
            //debugger;
            return;
        }
        tuidImport.setFrom(tuid);
    }
}
//# sourceMappingURL=uqs.js.map