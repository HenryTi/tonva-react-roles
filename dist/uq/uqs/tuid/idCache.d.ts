import { BoxId } from '../boxId';
import { TuidInner, TuidDiv } from './tuid';
export declare class IdCache {
    private queue;
    private cache;
    protected waitingIds: number[];
    protected tuidInner: TuidInner;
    constructor(tuidLocal: TuidInner);
    useId(id: number, defer?: boolean): void;
    private moveToHead;
    getValue(id: number): any;
    valueFromId(id: number | BoxId): any;
    resetCache(id: number): void;
    cacheValue(val: any): boolean;
    protected getIdFromObj(val: any): number;
    cacheIds(): Promise<void>;
    private cacheIdValues;
    protected divName: string;
    protected loadIds(): Promise<any[]>;
    protected unpackTuidIds(values: any[] | string): any[];
    protected cacheTuidFieldValues(tuidValue: any): void;
    assureObj(id: number): Promise<void>;
}
export declare class IdDivCache extends IdCache {
    private div;
    protected divName: string;
    constructor(tuidLocal: TuidInner, div: TuidDiv);
    protected getIdFromObj(val: any): number;
    protected unpackTuidIds(values: any[] | string): any[];
    protected cacheTuidFieldValues(tuidValue: any): void;
}
