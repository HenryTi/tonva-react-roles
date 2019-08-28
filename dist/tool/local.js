export class Data {
    constructor(name) { this.name = name; }
    get() {
        if (this.value !== undefined)
            return this.value;
        let v = localStorage.getItem(this.name);
        return this.value = v === null ? undefined : JSON.parse(v);
    }
    set(value) {
        if (!value) {
            this.clear();
            return;
        }
        this.value = value;
        localStorage.setItem(this.name, JSON.stringify(value));
    }
    clear() {
        this.value = undefined;
        localStorage.removeItem(this.name);
    }
}
export class LocalData {
    constructor() {
        this.user = new Data('user');
        this.guest = new Data('guest');
        this.unit = new Data('unit');
    }
    //testing = new Data<boolean>('testing');
    logoutClear() {
        [
            this.user,
            this.unit,
        ].map(d => d.clear());
    }
}
//# sourceMappingURL=local.js.map