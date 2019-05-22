/// <reference types="react" />
import { UiRadio } from '../../schema';
import { SelectBaseWidget } from './selectBaseWidget';
export declare class RadioWidget extends SelectBaseWidget {
    protected inputs: {
        [index: number]: HTMLInputElement;
    };
    protected ui: UiRadio;
    protected setElementValue(value: any): void;
    setReadOnly(value: boolean): void;
    setDisabled(value: boolean): void;
    render(): JSX.Element;
}
