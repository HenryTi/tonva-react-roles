/// <reference types="react" />
import { Controller } from "../components";
import { Tuid, Action, Sheet, Query, Map, UQsMan } from "../uq";
declare type EntityType = Tuid | Action | Sheet | Query | Map;
interface AppUqs {
    [uqName: string]: {
        [entityName: string]: EntityType;
    };
}
interface TVs {
    [uqName: string]: {
        [tuidName: string]: (values: any) => JSX.Element;
    };
}
export interface AppConfig {
    appName: string;
    version: string;
    tvs: TVs;
    loginTop?: JSX.Element;
}
export declare abstract class CAppBase extends Controller {
    protected readonly name: string;
    protected readonly version: string;
    protected readonly appUqs: AppUqs;
    protected readonly tvs: TVs;
    readonly uqs: UQsMan;
    appUnits: any[];
    constructor(config: AppConfig);
    protected beforeStart(): Promise<boolean>;
    private load;
    private showUnsupport;
}
export {};
