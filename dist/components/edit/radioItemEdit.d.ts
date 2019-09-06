import { ItemSchema, UiRadio } from '../schema';
import { ItemEdit } from './itemEdit';
export declare class RadioItemEdit extends ItemEdit {
    protected uiItem: UiRadio;
    constructor(itemSchema: ItemSchema, uiItem: UiRadio, label: string, value: any);
    protected internalStart(): Promise<any>;
    private onChange;
    private page;
}
