var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class TuidsCache {
    constructor(uq) {
        this.loadIds = () => {
            this.clearCacheTimer();
            let { tuids } = this.uq;
            for (let i in tuids) {
                let tuid = tuids[i];
                tuid.cacheIds();
            }
        };
        this.uq = uq;
        //this.uqApi = uq.uqApi;
        //this.tuids = uq.tuids;
    }
    cacheTuids(defer) {
        this.clearCacheTimer();
        this.cacheTimer = setTimeout(this.loadIds, defer);
    }
    clearCacheTimer() {
        if (this.cacheTimer === undefined)
            return;
        clearTimeout(this.cacheTimer);
        this.cacheTimer = undefined;
    }
    pullModify(modifyMax) {
        if (modifyMax === undefined)
            return;
        let now = Math.floor(Date.now() / 1000);
        if (this.modifyMax === undefined) {
            this.modifyMax = this.uq.localModifyMax.get();
            if (this.modifyMax === undefined) {
                this.modifyMax = {
                    max: modifyMax,
                    seconds: now,
                };
                this.uq.localModifyMax.set(this.modifyMax);
            }
        }
        let { max, seconds } = this.modifyMax;
        let lockGap = 3600;
        if (now - seconds < lockGap)
            return;
        if (modifyMax <= max)
            return;
        let tuidCached = [];
        let { tuids } = this.uq;
        for (let i in tuids) {
            //if (tuids[i].cached === true) 
            tuidCached.push(i);
        }
        if (tuidCached.length === 0)
            return;
        this.modifyMax.seconds = now;
        this.innerPullModify(tuidCached.join('\t'));
    }
    innerPullModify(tuidLists) {
        return __awaiter(this, void 0, void 0, function* () {
            let { uqApi, tuids } = this.uq;
            let { max } = this.modifyMax;
            let ret = yield uqApi.queueModify(max, 30, tuidLists);
            let group = {};
            let modifyMax = 0;
            for (let modify of ret.queue) {
                let { id, entity, key } = modify;
                let tuid = tuids[entity];
                if (tuid === undefined)
                    continue;
                let item = group[entity];
                if (item === undefined) {
                    item = group[entity] = { tuid: tuid, ids: [] };
                }
                item.ids.push(key);
                if (id > modifyMax)
                    modifyMax = id;
            }
            for (let i in group) {
                let { tuid, ids } = group[i];
                yield tuid.modifyIds(ids);
            }
            let now = Math.floor(Date.now() / 1000);
            this.modifyMax = {
                max: modifyMax,
                seconds: now,
            };
        });
    }
}
//# sourceMappingURL=tuidsCache.js.map