import { Uq } from './uq';
import { TuidImport, TuidInner } from './tuid';
import { LocalMap, localDb, LocalCache } from '../tool';
import { UqAppData } from '../net';
import { CreateBoxId } from './boxId';

export class Uqs {
    private collection: {[uqName: string]: Uq};

    readonly name: string;
    readonly appOwner: string;
    readonly appName: string;
    readonly localMap: LocalMap;
    readonly localData: LocalCache;
    id: number;

    constructor(tonvaAppName:string) {
        this.collection = {};
        let parts = tonvaAppName.split('/');
        if (parts.length !== 2) {
            throw 'tonvaApp name must be / separated, owner/app';
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.localMap = localDb.map(tonvaAppName); // new UqAppCache(this.appOwner, this.appName);
        this.localData = this.localMap.child('uqData');
    }

    // to be removed in the future
    addUq(uq: Uq) {
        this.collection[uq.name] = uq;
    }

    async init(uqsData:any):Promise<void> {
        let promiseInits: PromiseLike<void>[] = [];
        for (let uqData of uqsData) {
            let {id, uqOwner, uqName, access} = uqData;
            let uqFullName = uqOwner + '/' + uqName;
            //let uqUI = this.ui.uqs[uqFullName] as UqUI || {};
            //let cUq = this.newCUq(uqData, uqUI);
            //this.cUqCollection[uqFullName] = cUq;
            //this.uqs.addUq(cUq.uq);
            let uq = new Uq(this, uqData, this.createBoxId);
            this.collection[uqFullName] = uq;
            promiseInits.push(uq.init());
        }
        await Promise.all(promiseInits);
    }

    async load(): Promise<string[]> {
        let retErrors:string[] = [];
        let promises: PromiseLike<string>[] = [];
        for (let i in this.collection) {
            let uq = this.collection[i];
            promises.push(uq.loadEntities());
        }
        let results = await Promise.all(promises);
        for (let result of results)
        {
            let retError = result; // await cUq.loadSchema();
            if (retError !== undefined) {
                retErrors.push(retError);
                continue;
            }
        }
        return retErrors;
    }

    get uqsColl() {
        let ret:any = {};
        for (let i in this.collection) {
            ret[i] = this.collection[i].entities;
        }
        return ret;
    }

    private createBoxId: CreateBoxId;

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
