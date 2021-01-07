import { ItemSchema, UiImageItem, UiItem } from '../schema';
import { ItemEdit } from './itemEdit';
import { Edit } from './edit';
export declare class ImageItemEdit extends ItemEdit {
    get uiItem(): UiImageItem;
    resId: string;
    constructor(edit: Edit, itemSchema: ItemSchema, uiItem: UiItem, label: string, value: any);
    protected internalStart(): Promise<any>;
    private page;
}
