/// <reference types="react" />
import { Tuid } from './tuid';
import { TuidDiv } from './tuidDiv';
import { TvTemplet } from '../../tools';
export declare class BoxId {
    readonly id: number;
    protected tuid: Tuid;
    readonly obj: any;
    constructor(tuid: Tuid, id: number);
    render(ui: TvTemplet, x: any): JSX.Element;
    boxName(): string;
    isUndefined(): boolean;
    ui(): TvTemplet;
    res(): any;
    assure(): Promise<void>;
}
export declare class BoxDivId extends BoxId {
    private div;
    constructor(tuid: Tuid, div: TuidDiv, id: number);
    readonly obj: any;
    boxName(): string;
    isUndefined(): boolean;
    ui(): TvTemplet;
    res(): any;
    assure(): Promise<void>;
}
