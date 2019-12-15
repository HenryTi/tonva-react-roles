/// <reference types="react" />
import { ListBase } from './base';
import { List } from './index';
export interface SelectableItem {
    selected: boolean;
    item: any;
    labelId: string;
}
export declare class Selectable extends ListBase {
    private _items;
    private input;
    private disposer;
    constructor(list: List);
    dispose(): void;
    private buildItems;
    get items(): SelectableItem[];
    selectAll(): void;
    unselectAll(): void;
    private onSelect;
    get selectedItems(): any[];
    render: (item: SelectableItem, index: number) => JSX.Element;
}
