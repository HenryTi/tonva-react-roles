/// <reference types="react" />
import { Controller, TypeVPage, NavSettings } from '../../ui';
import { UqData } from '../../net';
import { CUq, UqUI } from './cUq';
import { Uqs } from '../uqs';
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
    readonly name: string;
    readonly version: string;
    readonly uqApp: Uqs;
    private cImportUqs;
    protected ui: AppUI;
    appUnits: any[];
    constructor(ui: AppUI);
    readonly caption: string;
    cUqCollection: {
        [uq: string]: CUq;
    };
    getImportUq(uqOwner: string, uqName: string): CUq;
    protected newCUq(uqData: UqData, uqUI: UqUI): CUq;
    readonly cUqArr: CUq[];
    getCUq(uq: string): CUq;
    protected readonly VAppMain: TypeVPage<CApp>;
    protected beforeStart(): Promise<boolean>;
    private load;
    protected internalStart(param: any): Promise<void>;
    render(): JSX.Element;
    protected clearPrevPages(): void;
    private showUnsupport;
    private showMainPage;
    private getCUqFromId;
    renderRow: (item: any, index: number) => JSX.Element;
    onRowClick: (item: any) => Promise<void>;
    protected selectUnitPage: () => JSX.Element;
}
