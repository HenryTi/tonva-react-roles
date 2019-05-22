import { UiSelectBase, UiSelectValue } from '../schema';
import { ItemEdit } from './itemEdit';
export declare abstract class SelectItemBaseEdit extends ItemEdit {
    protected uiItem: UiSelectBase;
    protected items: UiSelectValue[];
    protected init(): void;
}
