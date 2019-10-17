var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { decodeGuestToken } from '../tool/user';
import { CenterApiBase } from './uqApi';
export class GuestApi extends CenterApiBase {
    guest() {
        return __awaiter(this, void 0, void 0, function* () {
            //let guest = nav.local.guest.get();
            let ret = yield this.get('', {});
            switch (typeof ret) {
                default: return;
                case 'string': return decodeGuestToken(ret);
                case 'object':
                    let guest = decodeGuestToken(ret.token);
                    return guest;
            }
        });
    }
    unitFromName(unitName) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.get(unitName);
            return ret && ret.unit;
        });
    }
}
export const guestApi = new GuestApi('tv/guest/', undefined);
//# sourceMappingURL=guestApi.js.map