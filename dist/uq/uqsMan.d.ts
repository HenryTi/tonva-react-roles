/// <reference types="react" />
import { UqMan } from './uqMan';
import { LocalMap, LocalCache } from '../tool';
import { UqData } from '../net';
export interface TVs {
    [uqName: string]: {
        [tuidName: string]: (values: any) => JSX.Element;
    };
}
export declare class UQsMan {
    private collection;
    private readonly tvs;
    readonly name: string;
    readonly appOwner: string;
    readonly appName: string;
    readonly localMap: LocalMap;
    readonly localData: LocalCache;
    id: number;
    constructor(tonvaAppName: string, tvs: TVs);
    addUq(uq: UqMan): void;
    private buildTVs;
    init(uqsData: UqData[]): Promise<void>;
    load(): Promise<string[]>;
    writeUQs(uqs: any): void;
    setTuidImportsLocal(): string[];
    private setInner;
}
