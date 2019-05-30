import { Tuid, TuidDiv, TuidBox } from './tuid';
import { Action } from './action';
import { Sheet } from './sheet';
import { Query } from './query';
import { Book } from './book';
import { History } from './history';
import { UqApi, UqData } from '../../net';
import { Map } from './map';
import { Pending } from './pending';
import { UqApp } from './uqApp';
export declare type FieldType = 'id' | 'tinyint' | 'smallint' | 'int' | 'bigint' | 'dec' | 'char' | 'text' | 'datetime' | 'date' | 'time';
export declare function fieldDefaultValue(type: FieldType): "" | 0 | "2000-1-1" | "0:00";
export interface Field {
    name: string;
    type: FieldType;
    tuid?: string;
    arr?: string;
    null?: boolean;
    size?: number;
    owner?: string;
    _tuid: TuidBox;
}
export interface ArrFields {
    name: string;
    fields: Field[];
    id?: string;
    order?: string;
}
export interface FieldMap {
    [name: string]: Field;
}
export interface SchemaFrom {
    owner: string;
    uq: string;
}
export declare class Uq {
    private tuids;
    private actions;
    private sheets;
    private queries;
    private books;
    private maps;
    private histories;
    private pendings;
    private tuidsCache;
    private uqApp;
    name: string;
    uqApi: UqApi;
    id: number;
    constructor(uqApp: UqApp, uqData: UqData);
    tuid(name: string): Tuid;
    tuidDiv(name: string, div: string): TuidDiv;
    action(name: string): Action;
    sheet(name: string): Sheet;
    query(name: string): Query;
    book(name: string): Book;
    map(name: string): Map;
    history(name: string): History;
    pending(name: string): Pending;
    sheetFromTypeId(typeId: number): Sheet;
    tuidArr: Tuid[];
    actionArr: Action[];
    sheetArr: Sheet[];
    queryArr: Query[];
    bookArr: Book[];
    mapArr: Map[];
    historyArr: History[];
    pendingArr: Pending[];
    init(): Promise<void>;
    loadAccess(): Promise<void>;
    loadEntities(): Promise<void>;
    private buildEntities;
    checkAccess(): Promise<boolean>;
    loadEntitySchema(entityName: string): Promise<any>;
    getTuid(name: string): Tuid;
    private buildTuids;
    private buildAccess;
    cacheTuids(defer: number): void;
    newAction(name: string, id: number): Action;
    private newTuid;
    newQuery(name: string, id: number): Query;
    private newBook;
    private newMap;
    private newHistory;
    private newPending;
    newSheet(name: string, id: number): Sheet;
    private fromType;
    private fromObj;
    private buildSheet;
    buildFieldTuid(fields: Field[], mainFields?: Field[]): void;
    buildArrFieldsTuid(arrFields: ArrFields[], mainFields: Field[]): void;
}
