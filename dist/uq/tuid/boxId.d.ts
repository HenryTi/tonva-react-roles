import { Tuid } from "./tuid";
export interface BoxId {
    readonly id: number;
    obj: any;
    boxName: string;
    isUndefined: boolean;
    assure(): Promise<any>;
}
export declare type CreateBoxId = (tuid: Tuid, id: number) => BoxId;
