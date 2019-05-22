import { UiRadio } from '../schema';
import { SelectItemBaseEdit } from './selectBaseItemEdit';
export declare class RadioItemEdit extends SelectItemBaseEdit {
    protected uiItem: UiRadio;
    protected internalStart(): Promise<any>;
    private onChange;
    private page;
}
