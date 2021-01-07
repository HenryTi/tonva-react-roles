import * as React from 'react';
import { Widget } from './widget';
import { UiIdItem, ItemSchema } from '../../schema';
import { Context } from '../context';
import { FieldProps } from '../field';
export declare class IdWidget extends Widget {
    protected get ui(): UiIdItem;
    value: number;
    constructor(context: Context, itemSchema: ItemSchema, fieldProps: FieldProps, children: React.ReactNode);
    setReadOnly(value: boolean): void;
    setDisabled(value: boolean): void;
    protected onClick: () => Promise<void>;
    render(): JSX.Element;
}
