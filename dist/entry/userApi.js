var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CenterApiBase } from '../net';
import { decodeUserToken } from '../tool/user';
;
export class UserApi extends CenterApiBase {
    login(params) {
        return __awaiter(this, void 0, void 0, function* () {
            //(params as any).device = nav.local.device.get();
            let ret = yield this.get('user/login', params);
            switch (typeof ret) {
                default: return;
                case 'string': return decodeUserToken(ret);
                case 'object':
                    let token = ret.token;
                    let user = decodeUserToken(token);
                    let { nick, icon } = ret;
                    if (nick)
                        user.nick = nick;
                    if (icon)
                        user.icon = icon;
                    return user;
            }
            // !== undefined) return decodeToken(token);
        });
    }
    register(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('user/register', params);
        });
    }
    setVerify(account, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('user/set-verify', { account: account, type: type });
        });
    }
    checkVerify(account, verify) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('user/check-verify', { account: account, verify: verify });
        });
    }
    isExists(account) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('user/is-exists', { account: account });
        });
    }
    resetPassword(account, password, verify, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('user/reset-password', { account: account, password, verify, type });
        });
    }
    userSetProp(prop, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post('tie/user-set-prop', { prop: prop, value: value });
        });
    }
}
export const userApi = new UserApi('tv/', undefined);
//# sourceMappingURL=userApi.js.map