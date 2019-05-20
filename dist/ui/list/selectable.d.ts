/// <reference types="react" />
import { ListBase } from './base';
export interface SelectableItem {
    selected: boolean;
    item: any;
    labelId: string;
}
export declare class Selectable extends ListBase {
    private _items;
    private _selectedItems;
    private input;
    private buildItems;
    readonly items: SelectableItem[];
    updateProps(nextProps: any): void;
    private onSelect;
    readonly selectedItems: any[];
    render(item: SelectableItem, index: number): JSX.Element;
}
