import { Entity } from "./entity";
interface TagValue {
    id: number;
    name: string;
    ext: string;
}
export declare class Tag extends Entity {
    get typeName(): string;
    values: TagValue[];
    loadValues(): Promise<TagValue[]>;
}
export {};
