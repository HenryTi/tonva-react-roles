var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { env } from '../tool';
import { UqMan } from './uqMan';
import { nav } from '../components';
export class UQsMan {
    constructor(tonvaAppName, tvs) {
        this.tvs = tvs || {};
        this.buildTVs();
        this.collection = {};
        let parts = tonvaAppName.split('/');
        if (parts.length !== 2) {
            throw new Error('tonvaApp name must be / separated, owner/app');
        }
        this.appOwner = parts[0];
        this.appName = parts[1];
        this.localMap = env.localDb.map(tonvaAppName);
        this.localData = this.localMap.child('uqData');
    }
    // to be removed in the future
    addUq(uq) {
        this.collection[uq.name] = uq;
    }
    buildTVs() {
        for (let i in this.tvs) {
            let uqTVs = this.tvs[i];
            if (uqTVs === undefined)
                continue;
            let l = i.toLowerCase();
            if (l === i)
                continue;
            this.tvs[l] = uqTVs;
            for (let j in uqTVs) {
                let en = uqTVs[j];
                if (en === undefined)
                    continue;
                let lj = j.toLowerCase();
                if (lj === j)
                    continue;
                uqTVs[lj] = en;
            }
        }
    }
    init(uqsData) {
        return __awaiter(this, void 0, void 0, function* () {
            let promiseInits = [];
            for (let uqData of uqsData) {
                let { uqOwner, uqName } = uqData;
                let uqFullName = uqOwner + '/' + uqName;
                //let uqUI = this.ui.uqs[uqFullName] as UqUI || {};
                //let cUq = this.newCUq(uqData, uqUI);
                //this.cUqCollection[uqFullName] = cUq;
                //this.uqs.addUq(cUq.uq);
                let uq = new UqMan(this, uqData, undefined, this.tvs[uqFullName] || this.tvs[uqName]);
                this.collection[uqFullName] = uq;
                let lower = uqFullName.toLowerCase();
                if (lower !== uqFullName) {
                    this.collection[lower] = uq;
                }
                promiseInits.push(uq.init());
            }
            yield Promise.all(promiseInits);
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            let retErrors = [];
            let promises = [];
            for (let i in this.collection) {
                let uq = this.collection[i];
                promises.push(uq.loadEntities());
            }
            let results = yield Promise.all(promises);
            for (let result of results) {
                let retError = result; // await cUq.loadSchema();
                if (retError !== undefined) {
                    retErrors.push(retError);
                    continue;
                }
            }
            return retErrors;
        });
    }
    buildUQs() {
        let that = this;
        let uqs = {};
        for (let i in this.collection) {
            let uqMan = this.collection[i];
            //let n = uqMan.name;
            let uqName = uqMan.uqName;
            let l = uqName.toLowerCase();
            let entities = uqMan.entities;
            let keys = Object.keys(entities);
            for (let key of keys) {
                let entity = entities[key];
                let { name } = entity;
                //if (name !== sName) 
                //entities[sName] = entity;
                entities[name.toLowerCase()] = entity;
            }
            //uqs[i] = entities;
            //uqs[uqName] = entities;
            //if (l !== uqName) 
            uqs[l] = new Proxy(entities, {
                get: function (target, key, receiver) {
                    let lk = key.toLowerCase();
                    let ret = target[lk];
                    if (ret !== undefined)
                        return ret;
                    debugger;
                    console.error('error in uqs entity undefined');
                    that.showReload(`代码错误：新增 uq ${uqName} entity ${String(key)}`);
                    return undefined;
                }
            });
        }
        //let uqs = this.collection;
        return new Proxy(uqs, {
            get: function (target, key, receiver) {
                let lk = key.toLowerCase();
                let ret = target[lk];
                if (ret !== undefined)
                    return ret;
                /*
                for (let i in uqs) {
                    if (i.toLowerCase() === lk) {
                        return uqs[i];
                    }
                }*/
                debugger;
                console.error('error in uqs');
                that.showReload(`代码错误：新增 uq ${String(key)}`);
                return undefined;
            },
        });
    }
    showReload(msg) {
        this.localMap.removeAll();
        nav.showReloadPage(msg);
    }
    setTuidImportsLocal() {
        let ret = [];
        for (let i in this.collection) {
            let uq = this.collection[i];
            for (let tuid of uq.tuidArr) {
                if (tuid.isImport === true) {
                    let error = this.setInner(uq, tuid);
                    if (error)
                        ret.push(error);
                }
            }
        }
        return ret;
    }
    setInner(uq, tuidImport) {
        let { from } = tuidImport;
        let fromName = from.owner + '/' + from.uq;
        let fromUq = this.collection[fromName];
        if (fromUq === undefined) {
            console.error(`setInner(tuidImport: TuidImport): uq ${fromName} is not loaded, but imported in ${uq.name}. pass this error now!`);
            return;
            //debugger;
            //return `setInner(tuidImport: TuidImport): uq ${fromName} is not loaded`;
        }
        let iName = tuidImport.name;
        let tuid = fromUq.tuid(iName);
        if (tuid === undefined) {
            //debugger;
            return `setInner(tuidImport: TuidImport): uq ${fromName} has no Tuid ${iName}`;
        }
        if (tuid.isImport === true) {
            //debugger;
            return `setInner(tuidImport: TuidImport): uq ${fromName} Tuid ${iName} is import`;
        }
        tuidImport.setFrom(tuid);
    }
}
//# sourceMappingURL=uqsMan.js.map