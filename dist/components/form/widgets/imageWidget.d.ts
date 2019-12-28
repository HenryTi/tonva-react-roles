/// <reference types="react" />
import { Widget } from './widget';
import { UiImageItem } from '../../schema';
export declare class ImageWidget extends Widget {
    protected input: HTMLInputElement;
    protected get ui(): UiImageItem;
    private imageSrc;
    init(): void;
    protected onClick: () => Promise<void>;
    render(): JSX.Element;
    private observerRender;
}
