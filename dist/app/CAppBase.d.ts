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
}
export declare abstract class CAppBase extends Controller {
    protected readonly name: string;
    protected readonly version: string;
    readonly uqs: any;
    readonly uqsMan: UQsMan;
    appUnits: any[];
    constructor(config: AppConfig);
    protected beforeStart(): Promise<boolean>;
    private load;
    private showUnsupport;
}
