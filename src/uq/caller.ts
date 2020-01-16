//import _ from 'lodash';
import { Caller } from '../net';
import { Entity } from './entity';
import { Action } from './action';
import { Query } from './query';
import { nav } from '../components';

interface UqResponseSchema {
    uq: any;
    entity: any;
}

export abstract class EntityCaller<T> extends Caller<T> {
    private tries: number;
    protected _entity: Entity;

    constructor(entity: Entity, params:T, waiting: boolean = true) {
        super(params, waiting);
        this.tries = 0;
        this._entity = entity;
    }

    protected get entity(): Entity {return this._entity;}

    //大多的entityCaller都不需要这个
    //buildParams() {return this._entity.buildParams(this.params);}
    
    async request(): Promise<any> {
        await this._entity.loadSchema();
        let ret = await this.innerRequest();
        return ret;
    }

    protected async innerCall(): Promise<any> {
        return await this._entity.uqApi.xcall(this);
    }

    async innerRequest(): Promise<any> {
        let jsonResult = await this.innerCall();
        let {$uq, $modify, res, $roles} = jsonResult;
        if ($roles) {
            nav.clear();
            nav.onError({
                channel: undefined, //HttpChannel;
                url: undefined, //string;
                options: undefined, //any;
                resolve: undefined, //(value?:any)=>void;
                reject: undefined, //(reason?:any)=>void;
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
        return await this.retry($uq);
    }

    xresult(res:any):any {return res}

    get headers(): {[header:string]: string} {
        let {ver, uq} = this._entity;
        let {uqVersion, } = uq;
        return {
            app: String(uq.appId),
            uq: `${uqVersion}`,
            en: `${ver}`,
        }
    }

    private async retry(schema: UqResponseSchema) {
        ++this.tries;
        if (this.tries > 5) throw new Error('can not get right uq response schema, 5 tries');
        this.rebuildSchema(schema);
        return await this.innerRequest();
    }

    private rebuildSchema(schema: UqResponseSchema) {
        let {uq, entity} = schema;
        if (uq !== undefined) this._entity.uq.buildEntities(uq);
        if (entity !== undefined) this._entity.setSchema(entity);
    }
}

export abstract class ActionCaller extends EntityCaller<any> {
    protected get entity(): Action {return this._entity as Action;}
}

export class QueryQueryCaller extends EntityCaller<any> {
    protected get entity(): Query {return this._entity as Query};
    get path():string {return `query/${this._entity.name}`;}
    xresult(res:any) {
        let data = this._entity.unpackReturns(res);
        return data;
    }
    buildParams() {return this._entity.buildParams(this.params);}
}

export class QueryPageCaller extends EntityCaller<any> {
    protected get params(): {pageStart:any; pageSize:number, params:any} {return this._params};
    protected get entity(): Query {return this._entity as Query};
    get path():string {return `query-page/${this._entity.name}`;}
    buildParams() {
        let {pageStart, pageSize, params} = this.params;
        let p:any;
        if (params === undefined) {
            p = {key: ''};
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
    };
    xresult(res:any) {
        let data = this._entity.unpackReturns(res);
        return data.$page;// as any[];
    }
}
