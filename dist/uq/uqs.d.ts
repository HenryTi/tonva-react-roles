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
    setTuidImportsLocal(): void;
    private setInner;
}
