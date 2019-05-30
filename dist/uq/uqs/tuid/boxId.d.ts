/// <reference types="react" />
import { Tuid } from './tuid';
import { TuidDiv } from './tuidDiv';
import { TvTemplet } from '../../tools';
export declare class BoxId {
    readonly id: number;
    protected tuid: Tuid;
    constructor(tuid: Tuid, id: number);
    render(ui: TvTemplet, x: any): JSX.Element;
    boxName(): string;
    valueFromId(): any;
    isUndefined(): boolean;
    ui(): TvTemplet;
    res(): any;
    getObj<T>(): Promise<T>;
}
export declare class BoxDivId extends BoxId {
    private div;
    constructor(tuid: Tuid, div: TuidDiv, id: number);
    boxName(): string;
    valueFromId(): any;
    isUndefined(): boolean;
    ui(): TvTemplet;
    res(): any;
    getObj<T>(): Promise<T>;
}
