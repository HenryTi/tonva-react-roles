import { env } from './env';
export class LocalData {
    constructor() {
        this.user = env.localDb.child('user');
        this.guest = env.localDb.child('guest');
        this.unit = env.localDb.child('unit');
    }
    readToMemory() {
        this._user = this.user.get();
        this._guest = this.guest.get();
        this._unit = this.unit.get();
    }
    saveToLocalStorage() {
        this.user.set(this._user);
        this.guest.set(this._guest);
        this.unit.set(this._unit);
    }
    logoutClear() {
        [
            this.user,
            this.unit,
        ].forEach(d => d.remove());
    }
}
//# sourceMappingURL=local.js.map