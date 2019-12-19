import { UiImageItem } from '../schema';
import { ItemEdit } from './itemEdit';
export declare class ImageItemEdit extends ItemEdit {
    protected uiItem: UiImageItem;
    private resId;
    protected internalStart(): Promise<any>;
    private page;
}
