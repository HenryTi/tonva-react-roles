/// <reference types="react" />
import { Controller } from '../vm';
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
    constructor(config: AppConfig);
    get uqs(): any;
    internalT(str: string): any;
    protected setRes(res: any): void;
    protected beforeStart(): Promise<boolean>;
    userFromId(userId: number): Promise<any>;
    private load;
    private showUnsupport;
}
