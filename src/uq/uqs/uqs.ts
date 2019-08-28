import { Uq } from './uq';
import { TuidImport, TuidInner } from './tuid';
import { UqAppCache } from './caches';

export class Uqs {
    private collection: {[uqName: string]: Uq};

    readonly name: string;
    readonly appOwner: string;
    readonly appName: string;
    readonly uqAppCache: UqAppCache;
    id: number;

    constructor(tonvaAppName:string) {
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

    addUq(uq: Uq) {
        this.collection[uq.name] = uq;
    }

    setTuidImportsLocal() {
        for (let i in this.collection) {
            let uq = this.collection[i];
            for (let tuid of uq.tuidArr) {
                if (tuid.isImport === true) {
                    this.setInner(tuid as TuidImport);
                }
            }
        }
    }

    private setInner(tuidImport: TuidImport) {
        let {from} = tuidImport;
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
        tuidImport.setFrom(tuid as TuidInner);
    }
}
