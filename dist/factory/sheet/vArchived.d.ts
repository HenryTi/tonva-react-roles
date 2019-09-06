/// <reference types="react" />
import { VSheetView } from './vSheetView';
import { SheetData } from './cSheet';
export interface SheetStateFlows {
    flows: any;
    data: any;
}
export declare class VArchived extends VSheetView {
    open(sheetData: SheetData): Promise<void>;
    protected view: () => JSX.Element;
}
