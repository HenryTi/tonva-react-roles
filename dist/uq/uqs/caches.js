export class Cache {
    get() {
        try {
            if (this.value !== undefined)
                return this.value;
            let text = localStorage.getItem(this.key);
            return this.value = JSON.parse(text);
        }
        catch (err) {
            localStorage.removeItem(this.key);
            return;
        }
    }
    set(value) {
        this.value = value;
        localStorage.setItem(this.key, JSON.stringify(value));
    }
    remove() {
        localStorage.removeItem(this.key);
        this.value = undefined;
    }
}
export class UqAppCache extends Cache {
    constructor(appOwner, appName) {
        super();
        this.appOwner = appOwner;
        this.appName = appName;
    }
    get key() { return `app-${this.appOwner}.${this.appName}`; }
}
export class UqCache extends Cache {
    constructor(uqData) {
        super();
        this.uqData = uqData;
    }
    get key() {
        let { uqOwner, uqName } = this.uqData;
        return `uq-${uqOwner}.${uqName}`;
    }
}
export class EntityCache extends Cache {
    constructor(entity) {
        super();
        this.entity = entity;
    }
    get key() {
        let { name, uq } = this.entity;
        let { uqOwner, uqName } = uq;
        return `entity-${uqOwner}.${uqName}-${name}`;
    }
}
//# sourceMappingURL=caches.js.map