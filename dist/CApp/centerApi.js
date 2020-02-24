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
export class CenterApi extends CenterApiBase {
    userAppUnits(app) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('tie/user-app-units', { app: app });
        });
    }
    userFromId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('user/user-name-nick-icon-from-id', { userId: userId });
        });
    }
}
export const centerApi = new CenterApi('tv/', undefined);
//# sourceMappingURL=centerApi.js.map