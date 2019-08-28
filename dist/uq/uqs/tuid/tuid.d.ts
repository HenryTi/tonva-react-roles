import { Entity } from '../entity';
import { Uq, Field, SchemaFrom } from '../uq';
import { BoxId } from '../boxId';
import { IdCache, IdDivCache } from './idCache';
export interface TuidSaveResult {
    id: number;
    inId: number;
}
export declare abstract class Tuid extends Entity {
    readonly typeName: string;
    protected idName: string;
    unique: string[];
    constructor(uq: Uq, name: string, typeId: number);
    setSchema(schema: any): void;
    buildTuidBox(): TuidBox;
    getIdFromObj(obj: any): number;
    abstract useId(id: number): void;
    abstract boxId(id: number): BoxId;
    abstract valueFromId(id: number): any;
    abstract assureBox(id: number): Promise<void>;
    cacheIds(): void;
    isImport: boolean;
    abstract readonly hasDiv: boolean;
    abstract div(name: string): TuidDiv;
    abstract load(id: number | BoxId): Promise<any>;
    abstract save(id: number, props: any): Promise<TuidSaveResult>;
    abstract search(key: string, pageStart: string | number, pageSize: number): Promise<any>;
    abstract searchArr(owner: number, key: string, pageStart: string | number, pageSize: number): Promise<any>;
    abstract loadArr(arr: string, owner: number, id: number): Promise<any>;
    abstract saveArr(arr: string, owner: number, id: number, props: any): Promise<void>;
    abstract posArr(arr: string, owner: number, id: number, order: number): Promise<void>;
}
export declare class TuidInner extends Tuid {
    private divs;
    protected cacheFields: Field[];
    protected idCache: IdCache;
    setSchema(schema: any): void;
    useId(id: number, defer?: boolean): void;
    boxId(id: number): BoxId;
    valueFromId(id: number): any;
    assureBox(id: number): Promise<void>;
    cacheIds(): void;
    cacheTuids(defer: number): void;
    readonly hasDiv: boolean;
    div(name: string): TuidDiv;
    loadTuidIds(divName: string, ids: number[]): Promise<any[]>;
    load(id: number | BoxId): Promise<any>;
    cacheTuidFieldValues(values: any): void;
    buildFieldsTuid(): void;
    unpackTuidIds(values: any[] | string): any[];
    save(id: number, props: any): Promise<TuidSaveResult>;
    search(key: string, pageStart: string | number, pageSize: number): Promise<any>;
    searchArr(owner: number, key: string, pageStart: string | number, pageSize: number): Promise<any>;
    loadArr(arr: string, owner: number, id: number): Promise<any>;
    saveArr(arr: string, owner: number, id: number, props: any): Promise<any>;
    posArr(arr: string, owner: number, id: number, order: number): Promise<any>;
}
export declare class TuidImport extends Tuid {
    private tuidLocal;
    constructor(uq: Uq, name: string, typeId: number, from: SchemaFrom);
    setFrom(tuidLocal: TuidInner): void;
    readonly from: SchemaFrom;
    isImport: boolean;
    useId(id: number): void;
    boxId(id: number): BoxId;
    valueFromId(id: number): any;
    assureBox(id: number): Promise<void>;
    readonly hasDiv: boolean;
    div(name: string): TuidDiv;
    load(id: number | BoxId): Promise<any>;
    save(id: number, props: any): Promise<TuidSaveResult>;
    search(key: string, pageStart: string | number, pageSize: number): Promise<any>;
    searchArr(owner: number, key: string, pageStart: string | number, pageSize: number): Promise<any>;
    loadArr(arr: string, owner: number, id: number): Promise<any>;
    saveArr(arr: string, owner: number, id: number, props: any): Promise<void>;
    posArr(arr: string, owner: number, id: number, order: number): Promise<void>;
}
export declare class TuidBox {
    tuid: Tuid;
    ownerField: Field;
    constructor(tuid: Tuid);
    boxId(id: number): BoxId;
    getIdFromObj(obj: any): number;
    useId(id: number): void;
    showInfo(): Promise<void>;
}
export declare class TuidDiv extends TuidInner {
    readonly typeName: string;
    protected cacheFields: Field[];
    protected tuid: TuidInner;
    protected idName: string;
    protected idCache: IdDivCache;
    constructor(uq: Uq, tuid: TuidInner, name: string);
    readonly owner: TuidInner;
    buildFieldsTuid(): void;
    buildTuidDivBox(ownerField: Field): TuidBoxDiv;
    getIdFromObj(obj: any): number;
    cacheValue(value: any): void;
    useId(id: number, defer?: boolean): void;
    valueFromId(id: number): any;
    assureBox(id: number): Promise<void>;
    cacheIds(): Promise<void>;
    cacheTuidFieldValues(values: any): void;
    unpackTuidIds(values: any[] | string): any[];
}
export declare class TuidBoxDiv extends TuidBox {
    ownerField: Field;
    private div;
    constructor(tuid: Tuid, div: TuidDiv, ownerField: Field);
    boxId(id: number): BoxId;
    getIdFromObj(obj: any): number;
    useId(id: number): void;
}
