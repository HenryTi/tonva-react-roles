import { VPage } from "../components";
import { CMainBase } from "./CMainBase";
export declare class VUnsupportedUnit extends VPage<CMainBase> {
    open(predefinedUnit: number): Promise<void>;
    private page;
}
export declare class VUnitSelect extends VPage<CMainBase> {
    open(): Promise<void>;
    private renderRow;
    private onRowClick;
    private page;
}
export declare class VErrorsPage extends VPage<CMainBase> {
    open(errors: string[]): Promise<void>;
    private page;
}
export declare class VStartError extends VPage<CMainBase> {
    open(error: any): Promise<void>;
    private page;
}
