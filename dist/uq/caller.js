var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import _ from 'lodash';
import { Caller } from '../net';
import { nav } from '../components';
export class EntityCaller extends Caller {
    constructor(entity, params, waiting = true) {
        super(params, waiting);
        this.tries = 0;
        this._entity = entity;
    }
    get entity() { return this._entity; }
    //大多的entityCaller都不需要这个
    //buildParams() {return this._entity.buildParams(this.params);}
    request() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._entity.loadSchema();
            let ret = yield this.innerRequest();
            return ret;
        });
    }
    innerCall() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._entity.uqApi.xcall(this);
        });
    }
    innerRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            let jsonResult = yield this.innerCall();
            let { $uq, $modify, res, $roles } = jsonResult;
            if ($roles) {
                nav.clear();
                nav.onError({
                    channel: undefined,
                    url: undefined,
                    options: undefined,
                    resolve: undefined,
                    reject: undefined,
                    error: '操作权限发生变化，需要重新加载程序',
                    type: 'message'
                });
                //nav.showReloadPage('操作权限发生变化，需要重新加载程序');
                //return {}; 
            }
            this._entity.uq.pullModify($modify);
            if ($uq === undefined) {
                //if (res === undefined) debugger;
                let ret = this.xresult(res);
                //if (ret === undefined) debugger;
                return ret;
            }
            return yield this.retry($uq);
        });
    }
    xresult(res) { return res; }
    get headers() {
        let { ver, uq } = this._entity;
        let { uqVersion, } = uq;
        return {
            app: String(uq.appId),
            uq: `${uqVersion}`,
            en: `${ver}`,
        };
    }
    retry(schema) {
        return __awaiter(this, void 0, void 0, function* () {
            ++this.tries;
            if (this.tries > 5)
                throw new Error('can not get right uq response schema, 5 tries');
            this.rebuildSchema(schema);
            return yield this.innerRequest();
        });
    }
    rebuildSchema(schema) {
        let { uq, entity } = schema;
        if (uq !== undefined)
            this._entity.uq.buildEntities(uq);
        if (entity !== undefined)
            this._entity.setSchema(entity);
    }
}
export class ActionCaller extends EntityCaller {
    get entity() { return this._entity; }
}
export class QueryQueryCaller extends EntityCaller {
    get entity() { return this._entity; }
    ;
    get path() { return `query/${this._entity.name}`; }
    xresult(res) {
        let data = this._entity.unpackReturns(res);
        return data;
    }
    buildParams() { return this._entity.buildParams(this.params); }
}
export class QueryPageCaller extends EntityCaller {
    get params() { return this._params; }
    ;
    get entity() { return this._entity; }
    ;
    get path() { return `query-page/${this._entity.name}`; }
    buildParams() {
        let { pageStart, pageSize, params } = this.params;
        let p;
        if (params === undefined) {
            p = { key: '' };
        }
        else {
            p = this._entity.buildParams(params);
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
    xresult(res) {
        let data = this._entity.unpackReturns(res);
        return data.$page; // as any[];
    }
}
//# sourceMappingURL=caller.js.map