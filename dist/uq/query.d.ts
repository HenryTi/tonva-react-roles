import { IObservableArray } from 'mobx';
import { PageItems } from '../tool';
import { ArrFields } from './uqMan';
import { Entity } from './entity';
import { QueryQueryCaller, QueryPageCaller } from './caller';
export declare type QueryPageApi = (name: string, pageStart: any, pageSize: number, params: any) => Promise<string>;
export declare class QueryPager<T extends any> extends PageItems<T> {
    private query;
    constructor(query: Query, pageSize?: number, firstSize?: number);
    protected onLoad(): Promise<void>;
    protected load(param: any, pageStart: any, pageSize: number): Promise<T[]>;
    protected setPageStart(item: T): void;
}
export declare class Query extends Entity {
    get typeName(): string;
    private pageStart;
    private pageSize;
    private params;
    private more;
    private startField;
    list: IObservableArray;
    returns: ArrFields[];
    isPaged: boolean;
    setSchema(schema: any): void;
    resetPage(size: number, params: any): void;
    get hasMore(): boolean;
    loadPage(): Promise<void>;
    protected pageCaller(params: any, showWaiting?: boolean): QueryPageCaller;
    page(params: any, pageStart: any, pageSize: number, showWaiting?: boolean): Promise<any[]>;
    protected queryCaller(params: any, showWaiting?: boolean): QueryQueryCaller;
    query(params: any, showWaiting?: boolean): Promise<any>;
    table(params: any, showWaiting?: boolean): Promise<any[]>;
    obj(params: any, showWaiting?: boolean): Promise<any>;
    scalar(params: any, showWaiting?: boolean): Promise<any>;
}
