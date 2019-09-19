import { Controller } from "../components";
import { IConstructor } from "./CAppBase";
export declare abstract class CBase extends Controller {
    protected readonly _uqs: any;
    readonly cApp: any;
    constructor(cApp: any);
    protected readonly uqs: any;
    protected init(): void;
    protected newC<T extends CBase>(type: IConstructor<T>): T;
    protected newSub<T extends CSub>(type: IConstructor<T>): T;
}
export declare abstract class CSub extends CBase {
    protected readonly owner: CBase;
    constructor(owner: CBase);
}
