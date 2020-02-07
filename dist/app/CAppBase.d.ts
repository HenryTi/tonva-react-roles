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
    private _mainUqId;
    private mainUqMan;
    appUnits: any[];
    roles: number;
    constructor(config: AppConfig);
    get uqs(): any;
    set mainUqId(value: number);
    hasRole(role: string): boolean;
    protected beforeStart(): Promise<boolean>;
    userFromId(userId: number): Promise<any>;
    private load;
    private showUnsupport;
}
