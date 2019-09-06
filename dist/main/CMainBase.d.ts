/// <reference types="react" />
import { Controller } from "../components";
import { Tuid, Action, Sheet, Query, Map, Uqs } from "../uq";
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
export interface MainConfig {
    appName: string;
    version: string;
    CMain?: new (config: MainConfig) => CMainBase;
    tvs: TVs;
    loginTop?: JSX.Element;
}
export declare abstract class CMainBase extends Controller {
    protected readonly name: string;
    protected readonly version: string;
    protected readonly appUqs: AppUqs;
    protected readonly tvs: TVs;
    readonly uqs: Uqs;
    appUnits: any[];
    constructor(config: MainConfig);
    protected beforeStart(): Promise<boolean>;
    private load;
    private showUnsupport;
}
export {};
