import { Controller } from "../components";
import { IConstructor } from "./CAppBase";
export declare abstract class CBase extends Controller {
    protected readonly _uqs: any;
    protected readonly _cApp: any;
    constructor(cApp: any);
    protected get uqs(): any;
    get cApp(): any;
    isRole(role: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'): boolean;
    protected newC<T extends CBase>(type: IConstructor<T>): T;
    protected newSub<T extends CSub>(type: IConstructor<T>): T;
}
export declare abstract class CSub extends CBase {
    protected _owner: CBase;
    constructor(owner: CBase);
    protected get owner(): CBase;
}
