import { Widget } from './widget';
import { UiSelectValue, UiSelectBase } from '../../schema';
export declare abstract class SelectBaseWidget extends Widget {
    protected ui: UiSelectBase;
    protected items: UiSelectValue[];
    protected init(): void;
}
