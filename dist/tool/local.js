import { env } from './env';
export class LocalData {
    constructor() {
        this.user = env.localDb.child('user');
        this.guest = env.localDb.child('guest');
        this.unit = env.localDb.child('unit');
    }
    logoutClear() {
        [
            this.user,
            this.unit,
        ].forEach(d => d.remove());
    }
}
//# sourceMappingURL=local.js.map