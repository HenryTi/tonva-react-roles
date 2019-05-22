import { Widget } from './widget';
import { UiSelect, UiSelectValue, UiSelectItem, UiSelectBase } from '../../schema';

export abstract class SelectBaseWidget extends Widget {
    protected ui: UiSelectBase;
    protected items: UiSelectValue[];

    protected init() {
        super.init();
        if (this.ui !== undefined) {
            let {list} = this.ui;
            if (list !== undefined) {
                this.items = [];
                for (let item of list) {
                    if (typeof(item) === 'object') this.items.push(item);
                    else {
                        let p = item.indexOf(':');
                        if (p < 0) throw 'not valid item: ' + item;
                        this.items.push({
                            value: Number(item.substr(0, p)),
                            title: item.substr(p+1),
                        });
                    }
                }
            }
        }
    }
}
