import { BoxId } from "./boxId";
import { Tuid } from "./tuid";
import { TuidDiv } from "./tuidDiv";
import { Field } from "../uq";
export declare class TuidBox {
    tuid: Tuid;
    ownerField: Field;
    constructor(tuid: Tuid);
    boxId(id: number): BoxId;
    getIdFromObj(obj: any): number;
    useId(id: number): void;
    showInfo(): Promise<void>;
}
export declare class TuidBoxDiv extends TuidBox {
    ownerField: Field;
    private div;
    constructor(tuid: Tuid, div: TuidDiv, ownerField: Field);
    boxId(id: number): BoxId;
    getIdFromObj(obj: any): number;
    useId(id: number): void;
}
