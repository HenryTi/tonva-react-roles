/// <reference types="react" />
import { TuidLocal } from "./tuid";
import { IdDivCache } from "./idCache";
import { TuidBox } from "./tuidBox";
import { BoxId } from "./boxId";
import { Field, Uq } from "../uq";
import { Entity } from "../entity";
export declare class TuidDiv extends Entity {
    readonly typeName = "div";
    private cacheFields;
    protected tuid: TuidLocal;
    protected idName: string;
    protected idCache: IdDivCache;
    ui: React.StatelessComponent<any>;
    res: any;
    constructor(uq: Uq, tuid: TuidLocal, name: string);
    readonly owner: TuidLocal;
    setSchema(schema: any): void;
    setUIRes(ui: any, res: any): void;
    buildFieldsTuid(): void;
    buildTuidBox(ownerField: Field): TuidBox;
    getIdFromObj(obj: any): number;
    cacheValue(value: any): void;
    useId(id: number, defer?: boolean): void;
    boxId(id: number): BoxId;
    valueFromId(id: number): any;
    getObjFromId<T>(id: number): Promise<T>;
    cacheIds(): Promise<void>;
    cacheTuidFieldValues(values: any): void;
    unpackTuidIds(values: any[] | string): any[];
}
