import * as React from 'react';
import { Widget } from './widget';
import { ItemSchema, UiImageItem } from '../../schema';
import { Context } from '../context';
import { FieldProps } from '../field';
export declare class ImageWidget extends Widget {
    protected input: HTMLInputElement;
    protected get ui(): UiImageItem;
    imageSrc: string;
    constructor(context: Context, itemSchema: ItemSchema, fieldProps: FieldProps, children: React.ReactNode);
    init(): void;
    protected onClick: () => Promise<void>;
    render(): React.FunctionComponentElement<{}>;
    private observerRender;
}
