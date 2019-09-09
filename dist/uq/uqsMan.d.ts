import { UqMan } from './uqMan';
import { LocalMap, LocalCache } from '../tool';
import { UqData } from '../net';
export declare class UQsMan {
    private collection;
    readonly name: string;
    readonly appOwner: string;
    readonly appName: string;
    readonly localMap: LocalMap;
    readonly localData: LocalCache;
    id: number;
    constructor(tonvaAppName: string);
    addUq(uq: UqMan): void;
    init(uqsData: UqData[]): Promise<void>;
    load(): Promise<string[]>;
    readonly uqsColl: any;
    private createBoxId;
    setTuidImportsLocal(): string[];
    private setInner;
}
