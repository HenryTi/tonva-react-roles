/// <reference types="react" />
import { UiButton } from '../../schema';
import { Widget } from './widget';
export declare class ButtonWidget extends Widget {
    protected get ui(): UiButton;
    protected onClick: () => Promise<void>;
    private observerRender;
    protected get label(): string;
    render(): JSX.Element;
}
