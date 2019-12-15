/// <reference types="react" />
import { IObservableArray } from 'mobx';
import { TypeVPage } from '../../components';
import { PageItems } from '../../tool';
import { Sheet, StateCount } from '../../uq';
import { CEntity, EntityUI } from '../CVEntity';
export interface SheetActionUI {
    label: string;
}
export interface StateUI {
    label: string;
    actions: {
        [name: string]: SheetActionUI;
    };
}
export interface SheetUI extends EntityUI {
    CSheet?: typeof CSheet;
    states?: {
        [name: string]: StateUI;
    };
    main?: TypeVPage<CSheet>;
    sheetNew?: TypeVPage<CSheet>;
    sheetSaved?: TypeVPage<CSheet>;
    sheetEdit?: TypeVPage<CSheet>;
    sheetAction?: TypeVPage<CSheet>;
    listRow?: (row: any) => JSX.Element;
    sheetTitle?: (sheetValues: any, x: any) => string;
}
export interface SheetData {
    brief: any;
    data: any;
    flows: any[];
}
export declare class CSheet extends CEntity<Sheet, SheetUI> {
    statesCount: IObservableArray<StateCount>;
    curState: string;
    pageStateItems: PageItems<any>;
    protected internalStart(): Promise<void>;
    protected onMessage(msg: any): Promise<void>;
    private onSheet;
    private sheetActPreState;
    private sheetActState;
    private changeStateCount;
    protected get VSheetMain(): TypeVPage<CSheet>;
    protected get VSheetNew(): TypeVPage<CSheet>;
    protected get VSheetSaved(): TypeVPage<CSheet>;
    protected get VSheetEdit(): TypeVPage<CSheet>;
    protected get VSheetSchema(): TypeVPage<CSheet>;
    protected get VArchives(): TypeVPage<CSheet>;
    protected get VArchived(): TypeVPage<CSheet>;
    protected get VSheetList(): TypeVPage<CSheet>;
    protected get VSheetAction(): TypeVPage<CSheet>;
    protected get VSheetProcessing(): TypeVPage<CSheet>;
    protected onEvent(type: string, value: any): Promise<void>;
    startSheet(sheetId: number): Promise<void>;
    showAction(sheetId: number): Promise<void>;
    showProcessing(sheetId: number): Promise<void>;
    editSheet(sheetData: SheetData): Promise<any>;
    showArchived(inBrief: any): Promise<void>;
    onSave: (values: any, valuesWithBox: any) => Promise<void>;
    showSaved(sheetData: any): Promise<void>;
    private getStateUI;
    getStateLabel(stateName: string): any;
    getActionLabel(stateName: string, actionName: string): any;
    private loadStateSheetCount;
    getSheetData(sheetId: number): Promise<SheetData>;
    getArchived(sheetId: number): Promise<SheetData>;
    saveSheet(values: any, valuesWithBox: any): Promise<any>;
    action(id: number, flow: number, state: string, actionName: string): Promise<any>;
}
