import { Uq } from './uq';
import { LocalMap, LocalCache } from '../tool';
import { UqData } from '../net';
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
    init(uqsData: UqData[]): Promise<void>;
    load(): Promise<string[]>;
    readonly uqsColl: any;
    private createBoxId;
    setTuidImportsLocal(): string[];
    private setInner;
}
