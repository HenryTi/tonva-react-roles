var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Entity } from "./entity";
export class Tag extends Entity {
    get typeName() { return 'tag'; }
    loadValues() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.values !== undefined)
                return this.values;
            this.values = [];
            let ret = yield this.uqApi.get('tag/values' + this.name);
            if (ret === undefined)
                return;
            let lines = ret.split('\n');
            for (let line of lines) {
                if (line.length === 0)
                    continue;
                let parts = line.split('\t');
                this.values.push({
                    id: Number(parts[0]),
                    name: parts[1],
                    ext: parts[2],
                });
            }
            return this.values;
        });
    }
}
//# sourceMappingURL=tag.js.map