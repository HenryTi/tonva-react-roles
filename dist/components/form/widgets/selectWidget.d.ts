import * as React from 'react';
import { Widget } from './widget';
import { ItemSchema, UiSelect } from '../../schema';
import { Context } from '../context';
import { FieldProps } from '../field';
export declare class SelectWidget extends Widget {
    protected select: HTMLSelectElement;
    protected get ui(): UiSelect;
    readOnly: boolean;
    constructor(context: Context, itemSchema: ItemSchema, fieldProps: FieldProps, children: React.ReactNode);
    protected setElementValue(value: any): void;
    protected onInputChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
    setReadOnly(value: boolean): void;
    setDisabled(value: boolean): void;
    render(): JSX.Element;
}
