import { BoxId } from "./boxId";
import { TuidLocal } from "./tuid";
import { TuidDiv } from './tuidDiv';
export declare class IdCache {
    private queue;
    private cache;
    protected waitingIds: number[];
    protected tuidLocal: TuidLocal;
    constructor(tuidLocal: TuidLocal);
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
    getObjFromId<T>(id: number): Promise<T>;
}
export declare class IdDivCache extends IdCache {
    private div;
    protected divName: string;
    constructor(tuidLocal: TuidLocal, div: TuidDiv);
    protected getIdFromObj(val: any): number;
    protected unpackTuidIds(values: any[] | string): any[];
    protected cacheTuidFieldValues(tuidValue: any): void;
}
