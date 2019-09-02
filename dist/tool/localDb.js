import _ from 'lodash';
class _LocalStorage {
    getItem(key) {
        return localStorage.getItem(key);
    }
    setItem(key, value) {
        localStorage.setItem(key, value);
    }
    removeItem(key) {
        localStorage.removeItem(key);
    }
}
const __ls = new _LocalStorage; // new Ls;
export class LocalCache {
    constructor(local, key) {
        this.local = local;
        this.key = key;
    }
    get() {
        try {
            if (this.value !== undefined)
                return this.value;
            let text = this.local.getItem(this.key);
            if (text === null)
                return;
            return this.value = JSON.parse(text);
        }
        catch (err) {
            this.local.removeItem(this.key);
            return;
        }
    }
    set(value) {
        this.value = value;
        this.local.setItem(this.key, JSON.stringify(value));
    }
    remove(local) {
        if (local === undefined) {
            this.local.removeItem(this.key);
            this.value = undefined;
        }
        else {
            this.local.removeLocal(local);
        }
    }
    child(key) {
        return this.local.child(key);
    }
    arr(key) {
        return this.local.arr(key);
    }
    map(key) {
        return this.local.map(key);
    }
}
class Local {
    constructor(name) {
        this.name = name;
        this.caches = {};
        this.locals = {};
    }
    getItem(key) {
        let k = this.keyForGet(key);
        if (k === undefined)
            return;
        return __ls.getItem(k);
    }
    setItem(key, value) {
        let k = this.keyForSet(key);
        __ls.setItem(k, value);
    }
    removeItem(key) {
        let k = this.keyForSet(key);
        if (k === undefined)
            return;
        localStorage.removeItem(k);
    }
    arr(key) {
        let sk = String(key);
        let arr = this.locals[sk];
        if (arr === undefined) {
            let k = this.keyForSet(key);
            this.locals[sk] = arr = new LocalArr(k);
        }
        return arr;
    }
    map(key) {
        let sk = String(key);
        let map = this.locals[sk];
        if (map === undefined) {
            let k = this.keyForSet(key);
            this.locals[sk] = map = new LocalMap(k);
        }
        return map;
    }
    removeLocal(local) {
        let sk = local.name;
        let k = this.keyForRemove(sk);
        if (k === undefined)
            return;
        let arr = this.locals[sk];
        if (arr === undefined)
            arr = new LocalArr(k);
        else
            this.locals[sk] = undefined;
        arr.removeAll();
    }
    child(key) {
        let ks = String(key);
        let ret = this.caches[ks];
        if (ret !== undefined)
            return ret;
        return this.caches[ks] = ret = new LocalCache(this, key);
    }
}
const maxArrSize = 100;
export class LocalArr extends Local {
    constructor(name) {
        super(name);
        let index = __ls.getItem(this.name);
        this.index = index === null ? [] : index.split('\n').map(v => Number(v));
    }
    saveIndex() {
        __ls.setItem(this.name, this.index.join('\n'));
    }
    keyForGet(key) {
        let i = _.indexOf(this.index, key);
        if (i < 0)
            return undefined;
        return `${this.name}.${key}`;
    }
    keyForSet(key) {
        let i = _.indexOf(this.index, key);
        if (i < 0) {
            this.index.unshift(key);
            if (this.index.length > maxArrSize)
                this.index.pop();
        }
        else {
            this.index.splice(i, 1);
            this.index.unshift(key);
        }
        this.saveIndex();
        return `${this.name}.${key}`;
    }
    keyForRemove(key) {
        let i = _.indexOf(this.index, key);
        if (i < 0)
            return;
        this.index.splice(i, 1);
        this.saveIndex();
        return `${this.name}.${key}`;
    }
    removeAll() {
        for (let i of this.index) {
            __ls.removeItem(`${this.name}.${i}`);
        }
        __ls.removeItem(this.name);
        this.index.splice(0);
    }
    item(index) {
        return this.child(index);
    }
}
export class LocalMap extends Local {
    constructor(name) {
        super(name);
        this.max = 0;
        this.index = {};
        let index = __ls.getItem(this.name);
        if (index !== null) {
            let ls = index.split('\n');
            ls.forEach(l => {
                let p = l.indexOf('\t');
                if (p < 0)
                    return;
                let key = l.substr(0, p);
                let i = Number(l.substr(p + 1));
                if (isNaN(i) === true)
                    return;
                this.index[key] = i;
                if (i > this.max)
                    this.max = i;
            });
        }
    }
    saveIndex() {
        let ls = [];
        for (let k in this.index) {
            let v = this.index[k];
            if (v === undefined)
                continue;
            ls.push(`${k}\t${v}`);
        }
        __ls.setItem(this.name, ls.join('\n'));
    }
    keyForGet(key) {
        let i = this.index[key];
        if (i === undefined)
            return undefined;
        return `${this.name}.${i}`;
    }
    keyForSet(key) {
        let i = this.index[key];
        if (i === undefined) {
            ++this.max;
            i = this.max;
            this.index[key] = i;
            this.saveIndex();
        }
        return `${this.name}.${i}`;
    }
    keyForRemove(key) {
        let i = this.index[key];
        if (i === undefined)
            return;
        this.index[key] = undefined;
        this.saveIndex();
        return `${this.name}.${i}`;
    }
    removeAll() {
        for (let i in this.index) {
            __ls.removeItem(`${this.name}.${this.index[i]}`);
            this.index[i] = undefined;
        }
        __ls.removeItem(this.name);
        this.max = 0;
    }
    item(key) {
        return this.child(key);
    }
}
export const localDb = new LocalMap('$');
//# sourceMappingURL=localDb.js.map