import { ItemSchema, UiItem, UiSelect } from '../schema';
import { SelectItemBaseEdit } from './selectBaseItemEdit';
export declare class SelectItemEdit extends SelectItemBaseEdit {
    protected uiItem: UiSelect;
    constructor(itemSchema: ItemSchema, uiItem: UiItem, label: string, value: any);
    protected internalStart(): Promise<any>;
    private onChange;
    private page;
}
