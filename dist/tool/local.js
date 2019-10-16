import { env } from './env';
var LocalData = /** @class */ (function () {
    function LocalData() {
        this.user = env.localDb.child('user');
        this.guest = env.localDb.child('guest');
        this.unit = env.localDb.child('unit');
    }
    LocalData.prototype.logoutClear = function () {
        [
            this.user,
            this.unit,
        ].forEach(function (d) { return d.remove(); });
    };
    return LocalData;
}());
export { LocalData };
//# sourceMappingURL=local.js.map