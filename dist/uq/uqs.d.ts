import { Uq } from './uq';
import { LocalMap, LocalCache } from '../tool';
export declare class Uqs {
    private collection;
    readonly name: string;
    readonly appOwner: string;
    readonly appName: string;
    readonly localMap: LocalMap;
    readonly localData: LocalCache;
    id: number;
    constructor(tonvaAppName: string);
    addUq(uq: Uq): void;
    init(uqsData: any): Promise<void>;
    load(): Promise<string[]>;
    readonly uqsColl: any;
    private createBoxId;
    setTuidImportsLocal(): string[];
    private setInner;
}
