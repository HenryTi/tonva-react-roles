var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Entity } from "../entity";
import { TagView } from "./tagView";
export class Tag extends Entity {
    constructor() {
        super(...arguments);
        this.coll = {};
    }
    get typeName() { return 'tag'; }
    get view() {
        if (this._view !== undefined)
            return this._view;
        return this._view = new TagView(this);
    }
    nameFromId(id) {
        return this.coll[id].name;
    }
    namesFromIds(ids) {
        var _a;
        let ret = [];
        for (let id of ids.split('|')) {
            let name = (_a = this.coll[Number(id)]) === null || _a === void 0 ? void 0 : _a.name;
            if (name !== undefined)
                ret.push(name);
        }
        return ret;
    }
    loadValues() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.values !== undefined)
                return this.values;
            this.values = [];
            let ret = yield this.uqApi.get('tag/values/' + this.name);
            if (ret === undefined)
                return;
            let lines = ret.split('\n');
            for (let line of lines) {
                if (line.length === 0)
                    continue;
                let parts = line.split('\t');
                let id = Number(parts[0]);
                let val = {
                    id: id,
                    name: parts[1],
                    ext: parts[2],
                };
                this.values.push(val);
                this.coll[id] = val;
            }
            return this.values;
        });
    }
}
//# sourceMappingURL=tag.js.map