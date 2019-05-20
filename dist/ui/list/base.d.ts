/// <reference types="react" />
import { IObservableArray } from 'mobx';
import { List } from './index';
export declare abstract class ListBase {
    protected list: List;
    constructor(list: List);
    readonly isPaged: boolean;
    readonly items: any[] | IObservableArray<any>;
    readonly loading: boolean;
    readonly selectedItems: any[];
    updateProps(nextProps: any): void;
    abstract render(item: any, index: number): JSX.Element;
    protected renderContent(item: any, index: number): JSX.Element;
}
