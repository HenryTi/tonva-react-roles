import { UiSelectBase, UiSelectValue } from '../schema';
import { ItemEdit } from './itemEdit';

export abstract class SelectItemBaseEdit extends ItemEdit {
    protected uiItem: UiSelectBase;
    protected items: UiSelectValue[];

    protected init() {
        super.init();
        if (this.uiItem !== undefined) {
            let {list} = this.uiItem;
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
