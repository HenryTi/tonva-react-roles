import * as React from 'react';
import { Widget } from './widget';
import { UiTextItem, ItemSchema } from '../../schema';
import { Context } from '../context';
import { FieldProps } from '../field';
export declare class TextWidget extends Widget {
    protected inputType: string;
    protected get ui(): UiTextItem;
    protected input: HTMLInputElement;
    hasFocus: boolean;
    constructor(context: Context, itemSchema: ItemSchema, fieldProps: FieldProps, children: React.ReactNode);
    protected setElementValue(value: any): void;
    protected get placeholder(): string;
    protected onKeyDown: (evt: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
    protected internalOnKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): void;
    protected onBlur: (evt: React.FocusEvent<any>) => void;
    protected onFocus: (evt: React.FocusEvent<any>) => void;
    protected onChange(evt: React.ChangeEvent<any>): void;
    setReadOnly(value: boolean): void;
    setDisabled(value: boolean): void;
    render(): JSX.Element;
}
