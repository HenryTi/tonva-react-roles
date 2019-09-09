import { UqMan } from './uqMan';
import { TuidImport, TuidInner } from './tuid';
import { LocalMap, localDb, LocalCache } from '../tool';
import { CreateBoxId } from './boxId';
import { UqData } from '../net';

export class UQsMan {
    private collection: {[uqName: string]: UqMan};

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
    addUq(uq: UqMan) {
        this.collection[uq.name] = uq;
    }

    async init(uqsData:UqData[]):Promise<void> {
        let promiseInits: PromiseLike<void>[] = [];
        for (let uqData of uqsData) {
            let {id, uqOwner, uqName, access} = uqData;
            let uqFullName = uqOwner + '/' + uqName;
            //let uqUI = this.ui.uqs[uqFullName] as UqUI || {};
            //let cUq = this.newCUq(uqData, uqUI);
            //this.cUqCollection[uqFullName] = cUq;
            //this.uqs.addUq(cUq.uq);
            let uq = new UqMan(this, uqData, this.createBoxId);
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

    setTuidImportsLocal():string[] {
        let ret:string[] = [];
        for (let i in this.collection) {
            let uq = this.collection[i];
            for (let tuid of uq.tuidArr) {
                if (tuid.isImport === true) {
                    let error = this.setInner(tuid as TuidImport);
                    if (error) ret.push(error);
                }
            }
        }
        return ret;
    }

    private setInner(tuidImport: TuidImport):string {
        let {from} = tuidImport;
        let fromName = from.owner + '/' + from.uq;
        let uq = this.collection[fromName];
        if (uq === undefined) {
            //debugger;
            return `setInner(tuidImport: TuidImport): uq ${fromName} is not loaded`;
        }
        let iName = tuidImport.name
        let tuid = uq.tuid(iName);
        if (tuid === undefined) {
            //debugger;
            return `setInner(tuidImport: TuidImport): uq ${fromName} has no Tuid ${iName}`;
        }
        if (tuid.isImport === true) {
            //debugger;
            return `setInner(tuidImport: TuidImport): uq ${fromName} Tuid ${iName} is import`;
        }
        tuidImport.setFrom(tuid as TuidInner);
    }
}
