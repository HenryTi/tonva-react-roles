import { Controller, TypeVPage, NavSettings } from '../../components';
import { UqData } from '../../net';
import { CUq, UqUI } from '../cUq';
import { UQsMan } from '../../uq';
export interface RoleAppUI {
    CApp?: typeof CApp;
    CUq?: typeof CUq;
    main?: TypeVPage<CApp>;
    uqs: {
        [uq: string]: UqUI | (() => Promise<UqUI>);
    };
    res?: any;
}
export interface AppUI extends RoleAppUI, NavSettings {
    appName: string;
    version: string;
    roles?: {
        [role: string]: RoleAppUI | (() => Promise<RoleAppUI>);
    };
}
export declare class CApp extends Controller {
    private readonly cUqCollection;
    private readonly cImportUqs;
    protected ui: AppUI;
    readonly name: string;
    readonly version: string;
    readonly uqs: UQsMan;
    readonly caption: string;
    appUnits: any[];
    constructor(ui: AppUI);
    getImportUq(uqOwner: string, uqName: string): CUq;
    protected newCUq(uqData: UqData, uqUI: UqUI): CUq;
    get cUqArr(): CUq[];
    getCUq(uq: string): CUq;
    protected get VAppMain(): TypeVPage<CApp>;
    protected beforeStart(): Promise<boolean>;
    userFromId(userId: number): Promise<any>;
    private load;
    protected internalStart(param: any): Promise<void>;
    protected clearPrevPages(): void;
    private showUnsupport;
    private showMainPage;
    private getCUqFromId;
}
