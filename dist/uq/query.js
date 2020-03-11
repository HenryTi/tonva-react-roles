var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { observable } from 'mobx';
import { PageItems } from '../tool';
import { Entity } from './entity';
import { QueryQueryCaller, QueryPageCaller } from './caller';
export class QueryPager extends PageItems {
    constructor(query, pageSize, firstSize, itemObservable) {
        super(itemObservable);
        this.query = query;
        if (pageSize !== undefined)
            this.pageSize = pageSize;
        if (firstSize !== undefined)
            this.firstSize = firstSize;
    }
    setReverse() {
        this.appendPosition = 'head';
    }
    onLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            let { schema } = this.query;
            if (schema === undefined)
                yield this.query.loadSchema();
        });
    }
    loadResults(param, pageStart, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            //if (pageStart === undefined) pageStart = 0;
            //let ret = await this.query.page(param, pageStart, pageSize);
            //return ret;
            let ret = yield this.query.page(param, pageStart, pageSize);
            return ret;
        });
    }
    setPageStart(item) {
        let { schema } = this.query;
        if (schema === undefined)
            return;
        let $page = schema.returns.find(v => v.name === '$page');
        if ($page === undefined)
            return;
        let { order } = $page;
        if (order === undefined)
            return;
        /*
        if (order === 'desc') {
            this.appendPosition = 'head';
        }
        else {
            this.appendPosition = 'tail';
        }
        */
        if (item !== undefined) {
            let field = $page.fields[0];
            if (field) {
                let start = item[field.name];
                if (start === null)
                    start = undefined;
                else if (start !== undefined) {
                    if (typeof start === 'object') {
                        start = start.id;
                    }
                }
                this.pageStart = start;
            }
        }
        /*
        let {field, type, asc} = order;
        let start:any;
        if (item !== undefined) start = item[field];
        if (asc === false) {
            this.appendPosition = 'head';
            switch (type) {
                default:
                case 'tinyint':
                case 'smallint':
                case 'int':
                case 'bigint':
                case 'dec': start = 999999999999; break;
                case 'date':
                case 'datetime': start = undefined; break;          // 会自动使用现在
                case 'char': start = ''; break;
            }
        }
        else {
            this.appendPosition = 'tail';
            switch (type) {
                default:
                case 'tinyint':
                case 'smallint':
                case 'int':
                case 'bigint':
                case 'dec': start = 0; break;
                case 'date':
                case 'datetime': start = '1970-1-1'; break;
                case 'char': start = ''; break;
            }
        }
        this.pageStart = start;
        */
    }
}
export class Query extends Entity {
    get typeName() { return 'query'; }
    setSchema(schema) {
        super.setSchema(schema);
        let { returns } = schema;
        //this.returns = returns;
        this.isPaged = returns && returns.find(v => v.name === '$page') !== undefined;
    }
    resetPage(size, params) {
        this.pageStart = undefined;
        this.pageSize = size;
        this.params = params;
        this.more = false;
        this.list = undefined;
    }
    get hasMore() { return this.more; }
    loadPage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pageSize === undefined) {
                throw new Error('call resetPage(size:number, params:any) first');
            }
            let pageStart;
            if (this.pageStart !== undefined) {
                switch (this.startField.type) {
                    default:
                        pageStart = this.pageStart;
                        break;
                    case 'date':
                    case 'time':
                    case 'datetime':
                        pageStart = this.pageStart.getTime();
                        break;
                }
            }
            let ret = yield this.page(this.params, pageStart, this.pageSize + 1);
            let page = ret.$page;
            /*
            await this.loadSchema();
            let res = await this.tvApi.page(this.name, pageStart, this.pageSize+1, this.params);
            let data = await this.unpackReturns(res);
            let page = data['$page'] as any[];
            */
            this.list = observable.array([], { deep: false });
            if (page !== undefined) {
                if (page.length > this.pageSize) {
                    this.more = true;
                    page.pop();
                    let ret = this.returns.find(r => r.name === '$page');
                    this.startField = ret.fields[0];
                    this.pageStart = page[page.length - 1][this.startField.name];
                }
                else {
                    this.more = false;
                }
                this.list.push(...page);
            }
            //this.loaded = true;
        });
    }
    pageCaller(params, showWaiting = true) {
        return new QueryPageCaller(this, params, showWaiting);
    }
    page(params, pageStart, pageSize, showWaiting = true) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let res = await this.uqApi.page(this.name, pageStart, pageSize+1, this.buildParams(params));
            */
            let p = { pageStart: pageStart, pageSize: pageSize, params: params };
            let res = yield this.pageCaller(p, showWaiting).request();
            //let data = this.unpackReturns(res);
            //return data.$page;// as any[];
            return res;
        });
    }
    queryCaller(params, showWaiting = true) {
        return new QueryQueryCaller(this, params, showWaiting);
    }
    query(params, showWaiting = true) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            await this.loadSchema();
            let res = await this.uqApi.query(this.name, this.buildParams(params));
            */
            let res = yield this.queryCaller(params, showWaiting).request();
            //let data = this.unpackReturns(res);
            //return data;
            return res;
        });
    }
    table(params, showWaiting = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.query(params, showWaiting);
            for (let i in ret) {
                return ret[i];
            }
        });
    }
    obj(params, showWaiting = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.table(params, showWaiting);
            if (ret.length > 0)
                return ret[0];
        });
    }
    scalar(params, showWaiting = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = yield this.obj(params, showWaiting);
            for (let i in ret)
                return ret[i];
        });
    }
}
__decorate([
    observable
], Query.prototype, "list", void 0);
//# sourceMappingURL=query.js.map