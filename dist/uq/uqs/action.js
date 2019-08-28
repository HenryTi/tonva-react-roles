var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Entity } from './entity';
import { ActionCaller } from './caller';
export class Action extends Entity {
    get typeName() { return 'action'; }
    submit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //await this.loadSchema();
            //let text = this.pack(data);
            //return await this.uqApi.action(this.name, {data:text});
            return yield new ActionSubmitCaller(this, data).request();
        });
    }
    submitReturns(data) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let text = this.pack(data);
            let result = await this.uqApi.actionReturns(this.name, {data:text});
            */
            return yield new SubmitReturnsCaller(this, data).request();
        });
    }
}
export class ActionSubmitCaller extends ActionCaller {
    get path() { return 'action/' + this.entity.name; }
    buildParams() { return { data: this.entity.pack(this.params) }; }
}
class SubmitReturnsCaller extends ActionSubmitCaller {
    get path() { return 'action/' + this.entity.name + '/returns'; }
    xresult() {
        let { returns } = this.entity;
        let len = returns.length;
        let ret = {};
        for (let i = 0; i < len; i++) {
            let retSchema = returns[i];
            ret[retSchema.name] = this.result[i];
        }
        return ret;
    }
}
//# sourceMappingURL=action.js.map