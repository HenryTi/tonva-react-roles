var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { observable } from 'mobx';
import { isNumber } from 'util';
import _ from 'lodash';
const maxCacheSize = 1000;
export class IdCache {
    constructor(tuidLocal) {
        this.queue = []; // 每次使用，都排到队头
        this.cache = observable.map({}, { deep: false }); // 已经缓冲的
        this.waitingIds = []; // 等待loading的
        this.divName = undefined;
        this.tuidInner = tuidLocal;
        this.initLocalArr();
    }
    initLocalArr() {
        this.localArr = this.tuidInner.cache.arr(this.tuidInner.name + '.ids');
    }
    useId(id, defer) {
        if (id === undefined || id === 0)
            return;
        if (isNumber(id) === false)
            return;
        if (this.cache.has(id) === true) {
            this.moveToHead(id);
            return;
        }
        this.tuidInner.cacheTuids(defer === true ? 70 : 20);
        this.cache.set(id, id);
        if (this.waitingIds.findIndex(v => v === id) >= 0) {
            this.moveToHead(id);
            return;
        }
        if (this.queue.length >= maxCacheSize) {
            // 缓冲已满，先去掉最不常用的
            let r = this.queue.shift();
            if (r === id) {
                // 如果移除的，正好是现在用的，则插入
                this.queue.push(r);
                return;
            }
            //let rKey = String(r);
            if (this.cache.has(r) === true) {
                // 如果移除r已经缓存
                this.cache.delete(r);
            }
            else {
                // 如果移除r还没有缓存
                let index = this.waitingIds.findIndex(v => v === r);
                this.waitingIds.splice(index, 1);
            }
        }
        this.waitingIds.push(id);
        this.queue.push(id);
        return;
    }
    moveToHead(id) {
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.queue.push(id);
    }
    getValue(id) {
        return this.cache.get(id);
    }
    remove(id) {
        this.cache.delete(id);
    }
    valueFromId(id) {
        let _id;
        switch (typeof id) {
            case 'object':
                _id = id.id;
                break;
            case 'number':
                _id = id;
                break;
            default: return;
        }
        return this.getValue(_id);
    }
    resetCache(id) {
        this.cache.delete(id);
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.useId(id);
    }
    cacheValue(val) {
        if (val === undefined)
            return false;
        let id = this.getIdFromObj(val);
        if (id === undefined)
            return false;
        let index = this.waitingIds.findIndex(v => v === id);
        if (index >= 0)
            this.waitingIds.splice(index, 1);
        this.cache.set(id, val);
        return true;
    }
    getIdFromObj(val) { return this.tuidInner.getIdFromObj(val); }
    cacheIds() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.waitingIds.length === 0)
                return;
            let tuidValues = yield this.loadIds();
            yield this.cacheIdValues(tuidValues);
        });
    }
    cacheIdValues(tuidValues) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tuidValues === undefined)
                return;
            let tuids = this.unpackTuidIds(tuidValues);
            for (let tuidValue of tuids) {
                if (this.cacheValue(tuidValue) === false)
                    continue;
                this.cacheTuidFieldValues(tuidValue);
            }
        });
    }
    modifyIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let tuidValues = yield this.tuidInner.loadTuidIds(this.divName, ids);
            let localedValues = tuidValues.filter(v => {
                let p = v.indexOf('\t');
                if (p < 0)
                    p = v.length;
                let id = Number(v.substr(0, p));
                let val = this.localArr.getItem(id);
                return (val !== undefined);
            });
            if (localedValues.length === 0)
                return;
            yield this.cacheIdValues(localedValues);
        });
    }
    loadIds() {
        return __awaiter(this, void 0, void 0, function* () {
            //let ret = await this.tuidInner.loadTuidIds(this.divName, this.waitingIds);
            let ret = yield this.loadTuidIdsOrLocal(this.waitingIds);
            return ret;
        });
    }
    unpackTuidIds(values) {
        return this.tuidInner.unpackTuidIds(values);
    }
    cacheTuidFieldValues(tuidValue) {
        this.tuidInner.cacheTuidFieldValues(tuidValue);
    }
    assureObj(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let val = this.cache.get(id);
            switch (typeof val) {
                case 'object': return;
                case 'number':
                    this.cache.set(id, id);
                    break;
            }
            //let ret = await this.tuidInner.loadTuidIds(this.divName, [id]);
            let ret = yield this.loadTuidIdsOrLocal([id]);
            yield this.cacheIdValues(ret);
        });
    }
    loadTuidIdsOrLocal(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = [];
            let netIds = [];
            for (let id of ids) {
                let value = this.localArr.getItem(id);
                if (value === undefined)
                    netIds.push(id);
                else
                    ret.push(value);
            }
            let len = netIds.length;
            if (len > 0) {
                let netRet = yield this.tuidInner.loadTuidIds(this.divName, netIds);
                for (let i = 0; i < len; i++) {
                    //有些id可能没有内容，不会返回
                    //let id = netIds[i]; 
                    let row = netRet[i];
                    if (!row)
                        continue;
                    let p = row.indexOf('\t');
                    if (p < 0)
                        p = row.length;
                    let id = Number(row.substr(0, p));
                    _.remove(netIds, v => v === id);
                    ret.push(row);
                    this.localArr.setItem(id, row);
                }
                len = netIds.length;
                for (let i = 0; i < len; i++) {
                    this.localArr.setItem(netIds[i], '');
                }
            }
            return ret;
        });
    }
}
export class IdDivCache extends IdCache {
    constructor(tuidLocal, div) {
        super(tuidLocal);
        this.div = div;
        this.divName = div.name;
        this.localArr = tuidLocal.cache.arr(tuidLocal.name + '.ids.' + this.divName);
    }
    initLocalArr() {
        // 这个不需要，必须去掉
        // this.localArr = this.tuidInner.cache.arr(this.tuidInner.name + '.ids');
    }
    getIdFromObj(val) { return this.div.getIdFromObj(val); }
    unpackTuidIds(values) {
        return this.div.unpackTuidIds(values);
    }
    cacheTuidFieldValues(tuidValue) {
        this.div.cacheTuidFieldValues(tuidValue);
    }
}
//# sourceMappingURL=idCache.js.map