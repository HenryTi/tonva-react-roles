import * as React from 'react';
import { PageItems } from '../../pageItems';
import "../../css/va-list.css";
import { IObservableArray } from 'mobx';
declare type StaticRow = string | JSX.Element | (() => string | JSX.Element);
export interface ListProps {
    className?: string | string[];
    items: any[] | IObservableArray<any> | PageItems<any>;
    item: {
        className?: string | string[];
        render?: (item: any, index: number) => JSX.Element;
        onSelect?: (item: any, isSelected: boolean, anySelected: boolean) => void;
        onClick?: (item: any) => void;
        key?: (item: any) => string | number;
    };
    compare?: (item: any, selectItem: any) => boolean;
    selectedItems?: any[];
    header?: StaticRow;
    footer?: StaticRow;
    before?: StaticRow;
    loading?: StaticRow;
    none?: StaticRow;
}
export declare class List extends React.Component<ListProps> {
    private listBase;
    constructor(props: ListProps);
    _$scroll: (direct: "top" | "bottom") => void;
    componentWillUpdate(nextProps: ListProps, nextState: any, nextContext: any): void;
    readonly selectedItems: any[];
    render(): JSX.Element;
}
export {};
