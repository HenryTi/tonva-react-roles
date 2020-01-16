/// <reference types="react" />
import { Controller } from "../components";
import { UQsMan, TVs } from "../uq";
export interface IConstructor<T> {
    new (...args: any[]): T;
}
export interface AppConfig {
    appName: string;
    version: string;
    tvs: TVs;
    uqNameMap?: {
        [uqName: string]: string;
    };
    loginTop?: JSX.Element;
    oem?: string;
    privacy?: string;
}
export declare abstract class CAppBase extends Controller {
    protected _uqs: any;
    protected readonly name: string;
    protected readonly version: string;
    readonly uqsMan: UQsMan;
    appUnits: any[];
    roles: number;
    mainUqId: number;
    constructor(config: AppConfig);
    get uqs(): any;
    isRole(role: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'): boolean;
    protected beforeStart(): Promise<boolean>;
    userFromId(userId: number): Promise<any>;
    private load;
    private showUnsupport;
}
