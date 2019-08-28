var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Caller } from '../../net';
export class EntityCaller extends Caller {
    constructor(entity, params) {
        super(params);
        this.tries = 0;
        this.entity = entity;
    }
    buildParams() { return this.entity.buildParams(this.params); }
    request() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.loadSchema();
            return yield this.innerRequest();
        });
    }
    innerCall() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.uqApi.xcall(this);
        });
    }
    innerRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.innerCall();
            if (typeof this.result === 'object') {
                let { $uq } = this.result;
                if ($uq !== undefined) {
                    return yield this.retry($uq);
                }
            }
            return this.xresult();
        });
    }
    xresult() { return this.result; }
    get headers() {
        let { ver, uq } = this.entity;
        let { uqVersion } = uq;
        return {
            uq: `${uqVersion}`,
            en: `${ver}`,
        };
    }
    retry(schema) {
        return __awaiter(this, void 0, void 0, function* () {
            ++this.tries;
            if (this.tries > 10)
                throw 'can not get right uq response schema, 10 tries';
            this.rebuildSchema(schema);
            return yield this.innerRequest();
        });
    }
    rebuildSchema(schema) {
        let { uq, entity } = schema;
        if (uq !== undefined)
            this.entity.uq.buildEntities(uq);
        if (entity !== undefined)
            this.entity.setSchema(entity);
    }
}
export class ActionCaller extends EntityCaller {
}
export class QueryQueryCaller extends EntityCaller {
    get path() { return `query/${this.entity.name}`; }
    xresult() {
        let data = this.entity.unpackReturns(this.result);
        return data;
    }
}
export class QueryPageCaller extends EntityCaller {
    get path() { return `query-page/${this.entity.name}`; }
    buildParams() {
        let { pageStart, pageSize, params } = this.params;
        let p;
        if (params === undefined) {
            p = { key: '' };
        }
        else {
            p = this.entity.buildParams(params);
        }
        /*
        switch (typeof params) {
            case 'undefined': p = {key: ''}; break;
            default: p = _.clone(params); break;
        }
        */
        p['$pageStart'] = pageStart;
        p['$pageSize'] = pageSize;
        return p;
    }
    ;
    xresult() {
        let data = this.entity.unpackReturns(this.result);
        return data.$page; // as any[];
    }
}
//# sourceMappingURL=caller.js.map