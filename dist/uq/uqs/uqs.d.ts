import { Uq } from './uq';
import { UqAppCache } from './caches';
export declare class Uqs {
    private collection;
    readonly name: string;
    readonly appOwner: string;
    readonly appName: string;
    readonly uqAppCache: UqAppCache;
    id: number;
    constructor(tonvaAppName: string);
    addUq(uq: Uq): void;
    setTuidImportsLocal(): void;
    private setInner;
}
