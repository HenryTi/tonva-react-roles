/// <reference types="react" />
import { Entity } from "../entity";
import { TuidDiv } from "./tuidDiv";
import { Uq, SchemaFrom } from "../uq";
import { TuidBox } from './tuidBox';
import { BoxId } from './boxId';
export interface TuidSaveResult {
    id: number;
    inId: number;
}
export declare abstract class Tuid extends Entity {
    readonly typeName = "tuid";
    private idName;
    unique: string[];
    ui: React.StatelessComponent<any>;
    res: any;
    constructor(uq: Uq, name: string, typeId: number);
    setSchema(schema: any): void;
    buildTuidBox(): TuidBox;
    setUIRes(ui: any, res: any): void;
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
export declare class TuidLocal extends Tuid {
    private idCache;
    private cacheFields;
    private divs;
    setSchema(schema: any): void;
    setUIRes(ui: any, res: any): void;
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
    setFrom(tuidLocal: TuidLocal): void;
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
