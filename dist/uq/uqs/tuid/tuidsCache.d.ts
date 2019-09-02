import { Uq } from '../uq';
export declare class TuidsCache {
    private readonly uq;
    private modifyMax;
    private cacheTimer;
    constructor(uq: Uq);
    cacheTuids(defer: number): void;
    private clearCacheTimer;
    private loadIds;
    pullModify(modifyMax: number): void;
    private innerPullModify;
}
