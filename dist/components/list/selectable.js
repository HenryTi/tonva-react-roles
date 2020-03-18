var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { observable, isObservableArray, observe } from 'mobx';
import classNames from 'classnames';
import { ListBase } from './base';
import { uid } from '../../tool/uid';
import { observer } from 'mobx-react';
export class Selectable extends ListBase {
    constructor(list) {
        super(list);
        this.inputItems = {};
        this.buildItems = () => {
            let { items, selectedItems, compare } = this.list.props;
            let itemsArray;
            if (items === undefined) {
                this._items = undefined;
                return;
            }
            if (items === null) {
                this._items = null;
                return;
            }
            if (Array.isArray(items) === true) {
                itemsArray = items;
            }
            else {
                itemsArray = items.items;
            }
            //let items = this.items;
            //this._selectedItems = selectedItems;
            let comp;
            if (compare === undefined) {
                comp = (item, selectItem) => item === selectItem;
            }
            else {
                comp = compare;
            }
            let retItems = itemsArray.map(v => {
                //let isObserved = isObservable(v);
                //let obj = isObserved === true? toJS(v) : v;
                //let obj = v;
                let selected = selectedItems === undefined ?
                    false
                    : selectedItems.find(si => comp(v, si)) !== undefined;
                return {
                    selected: selected,
                    item: v,
                    labelId: uid()
                };
            });
            this._items = retItems;
        };
        /*
        set selectedItems(value: any[]) {
            if (value === undefined) return;
            if (this._items === undefined) return;
            let sLen = this._items.length;
            let list = value.slice();
            for (let n=0; n<sLen; n++) {
                let sItem = this._items[n];
                let len = list.length;
                if (len === 0) break;
                let item = sItem.item;
                for (let i=0; i<len; i++) {
                    let v = list[i];
                    if (item === v) {
                        sItem.selected = true;
                        value.splice(i, 1);
                        break;
                    }
                }
            };
        }
        */
        //w-100 mb-0 pl-3
        //m-0 w-100
        this.render = (item, index) => {
            let { key } = this.list.props.item;
            return React.createElement(this.row, { item: item, index: index, key: key === undefined ? index : key(item) });
        };
        this.row = observer((props) => {
            let { item, index } = props;
            let { className } = this.list.props.item;
            let { labelId, selected, item: obItem } = item;
            return React.createElement("li", { className: classNames(className) },
                React.createElement("div", { className: "d-flex align-items-center px-3" },
                    React.createElement("input", { ref: input => { if (input)
                            this.inputItems[labelId] = input; }, className: "", type: "checkbox", value: "", id: labelId, defaultChecked: selected, onChange: (e) => {
                            this.onSelect(item, e.target.checked);
                        } }),
                    React.createElement("label", { className: "", style: { flex: 1, marginBottom: 0 }, htmlFor: labelId }, this.renderContent(obItem, index))));
        });
        //this.disposer = autorun(this.buildItems);
        this.buildItems();
        this.listenArraySplice();
    }
    //dispose() {this.disposer()};
    listenArraySplice() {
        let { items, selectedItems, compare } = this.list.props;
        if (items === undefined)
            return;
        if (items === null)
            return;
        let itemsArray;
        if (Array.isArray(items) === true) {
            itemsArray = items;
        }
        else {
            itemsArray = items.items;
        }
        if (isObservableArray(items) === true) {
            observe(itemsArray, (change) => {
                if (change.type === 'splice') {
                    let { index, removedCount, added } = change;
                    let _added = added && added.map(v => {
                        return {
                            selected: false,
                            item: v,
                            labelId: uid()
                        };
                    });
                    this._items.splice(index, removedCount, ..._added);
                    this.buildItems();
                }
            }, true);
        }
    }
    get items() {
        //if (this._items === undefined) 
        //this.buildItems();
        return this._items;
    }
    checkAll(on) {
        for (let i in this.inputItems)
            this.inputItems[i].checked = on;
        for (let item of this._items)
            item.selected = on;
    }
    selectAll() {
        //if (this._items) this._items.forEach(v => v.selected = true);
        this.checkAll(true);
        this.list.props.item.onSelect(undefined, true, this.anySelected);
    }
    unselectAll() {
        // if (this._items) this._items.forEach(v => v.selected = false);
        this.checkAll(false);
        this.list.props.item.onSelect(undefined, false, this.anySelected);
    }
    /*
    updateProps(nextProps:any) {
        if (nextProps.selectedItems === this._selectedItems) return;
        this.buildItems();
    }
    */
    get anySelected() { return this._items.some(v => v.selected); }
    onSelect(item, selected) {
        item.selected = selected;
        this.list.props.item.onSelect(item.item, selected, this.anySelected);
    }
    get selectedItems() {
        return this._items.filter(v => v.selected === true).map(v => v.item);
    }
}
__decorate([
    observable
], Selectable.prototype, "_items", void 0);
//# sourceMappingURL=selectable.js.map