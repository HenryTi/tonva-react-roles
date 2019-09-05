import { Caller } from '../net';
import { Entity } from './entity';
import { Action } from './action';
import { Query } from './query';
export declare abstract class EntityCaller<T> extends Caller<T> {
    private tries;
    protected entity: Entity;
    constructor(entity: Entity, params: T);
    request(): Promise<any>;
    protected innerCall(): Promise<any>;
    innerRequest(): Promise<any>;
    xresult(res: any): any;
    readonly headers: {
        [header: string]: string;
    };
    private retry;
    private rebuildSchema;
}
export declare abstract class ActionCaller extends EntityCaller<any> {
    protected entity: Action;
}
export declare class QueryQueryCaller extends EntityCaller<any> {
    protected entity: Query;
    readonly path: string;
    xresult(res: any): any;
    buildParams(): any;
}
export declare class QueryPageCaller extends EntityCaller<any> {
    protected readonly params: {
        pageStart: any;
        pageSize: number;
        params: any;
    };
    protected entity: Query;
    readonly path: string;
    buildParams(): any;
    xresult(res: any): any;
}
