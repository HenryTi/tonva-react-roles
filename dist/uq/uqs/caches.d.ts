import { UqAppData, UqData } from '../../net';
import { Entity } from './entity';
export declare abstract class Cache<T> {
    protected value: T;
    abstract readonly key: string;
    get(): T;
    set(value: T): void;
    remove(): void;
}
export declare class UqAppCache extends Cache<UqAppData> {
    private readonly appOwner;
    private readonly appName;
    constructor(appOwner: string, appName: string);
    readonly key: string;
}
export declare class UqCache extends Cache<any> {
    private uqData;
    constructor(uqData: UqData);
    readonly key: string;
}
export declare class EntityCache extends Cache<Entity> {
    private entity;
    constructor(entity: Entity);
    readonly key: string;
}
