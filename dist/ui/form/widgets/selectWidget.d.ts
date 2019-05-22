import * as React from 'react';
import { UiSelect } from '../../schema';
import { SelectBaseWidget } from './selectBaseWidget';
export declare class SelectWidget extends SelectBaseWidget {
    protected select: HTMLSelectElement;
    protected ui: UiSelect;
    protected readOnly: boolean;
    protected setElementValue(value: any): void;
    protected onInputChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
    setReadOnly(value: boolean): void;
    setDisabled(value: boolean): void;
    render(): JSX.Element;
}
