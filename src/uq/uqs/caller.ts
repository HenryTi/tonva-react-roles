import _ from 'lodash';
import { Caller } from '../../net';
import { Entity } from './entity';
import { Action } from './action';
import { Query } from './query';

interface UqResponseSchema {
    uq: any;
    entity: any;
}

export abstract class EntityCaller<T> extends Caller<T> {
    private tries: number;
    protected entity: Entity;

    constructor(entity: Entity, params:T) {
        super(params);
        this.tries = 0;
        this.entity = entity;
    }

    buildParams() {return this.entity.buildParams(this.params);}
    
    async request(): Promise<any> {
        await this.entity.loadSchema();
        return await this.innerRequest();
    }

    protected async innerCall(): Promise<void> {
        await this.entity.uqApi.xcall(this);
    }

    private async innerRequest(): Promise<any> {
        await this.innerCall();
        if (typeof this.result === 'object') {
            let {$uq} = this.result;
            if ($uq !== undefined) {
                return await this.retry($uq);
            }
        }
        return this.xresult();
    }

    xresult():any {return this.result}

    get headers(): {[header:string]: string} {
        let {ver, uq} = this.entity;
        let {uqVersion} = uq;
        return {
            uq: `${uqVersion}`,
            en: `${ver}`,
        }
    }

    private async retry(schema: UqResponseSchema) {
        ++this.tries;
        if (this.tries > 10) throw 'can not get right uq response schema, 10 tries';
        this.rebuildSchema(schema);
        return await this.innerRequest();
    }

    private rebuildSchema(schema: UqResponseSchema) {
        let {uq, entity} = schema;
        if (uq !== undefined) this.entity.uq.buildEntities(uq);
        if (entity !== undefined) this.entity.setSchema(entity);
    }
}

export abstract class ActionCaller extends EntityCaller<any> {
    protected entity: Action;
}

export class QueryQueryCaller extends EntityCaller<any> {
    protected entity: Query;
    get path():string {return `query/${this.entity.name}`;}
    xresult() {
        let data = this.entity.unpackReturns(this.result);
        return data;
    }
}

export class QueryPageCaller extends EntityCaller<any> {
    protected readonly params: {pageStart:any; pageSize:number, params:any};
    protected entity: Query;
    get path():string {return `query-page/${this.entity.name}`;}
    buildParams() {
        let {pageStart, pageSize, params} = this.params;
        let p:any;
        if (params === undefined) {
            p = {key: ''};
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
    };
    xresult() {
        let data = this.entity.unpackReturns(this.result);
        return data.$page;// as any[];
    }
}
