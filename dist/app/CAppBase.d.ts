/// <reference types="react" />
import { Controller } from '../vm';
import { TVs } from "../uq";
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
    noUnit?: boolean;
    htmlTitle?: string;
}
export interface Elements {
    [id: string]: (element: HTMLElement) => void;
}
export declare abstract class CAppBase extends Controller {
    private appConfig;
    protected _uqs: any;
    protected readonly name: string;
    protected readonly noUnit: boolean;
    appUnits: any[];
    constructor(config?: AppConfig);
    get uqs(): any;
    internalT(str: string): any;
    protected setRes(res: any): void;
    protected hookElements(elements: Elements): void;
    protected beforeStart(): Promise<boolean>;
    userFromId(userId: number): Promise<any>;
    private showUnsupport;
}
