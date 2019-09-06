/// <reference types="react" />
import { VPage } from "../../components";
import { CApp } from "./CApp";
export declare class VAppMain extends VPage<CApp> {
    open(param?: any): Promise<void>;
    render(param?: any): JSX.Element;
    protected appPage: () => JSX.Element;
    protected appContent: () => JSX.Element;
}
export declare class VUnsupportedUnit extends VPage<CApp> {
    open(predefinedUnit: number): Promise<void>;
    private page;
}
export declare class VUnitSelect extends VPage<CApp> {
    open(): Promise<void>;
    private renderRow;
    private onRowClick;
    private page;
}
export declare class VErrorsPage extends VPage<CApp> {
    open(errors: string[]): Promise<void>;
    private page;
}
export declare class VAppStartError extends VPage<CApp> {
    open(error: any): Promise<void>;
    private page;
}
