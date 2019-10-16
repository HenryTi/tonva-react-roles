var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { observable, autorun } from 'mobx';
import classNames from 'classnames';
import { ListBase } from './base';
import { uid } from '../../tool/uid';
var Selectable = /** @class */ (function (_super) {
    __extends(Selectable, _super);
    function Selectable(list) {
        var _this = _super.call(this, list) || this;
        _this.buildItems = function () {
            console.log('buildItems in selectable.tsx');
            var _a = _this.list.props, items = _a.items, selectedItems = _a.selectedItems, compare = _a.compare;
            var itemsArray;
            if (items === undefined) {
                _this._items = undefined;
                return;
            }
            if (items === null) {
                _this._items = null;
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
            var comp;
            if (compare === undefined) {
                comp = function (item, selectItem) { return item === selectItem; };
            }
            else {
                comp = compare;
            }
            var retItems = itemsArray.map(function (v) {
                //let isObserved = isObservable(v);
                //let obj = isObserved === true? toJS(v) : v;
                //let obj = v;
                var selected = selectedItems === undefined ?
                    false
                    : selectedItems.find(function (si) { return comp(v, si); }) !== undefined;
                return {
                    selected: selected,
                    item: v,
                    labelId: uid()
                };
            });
            _this._items = retItems;
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
        _this.render = function (item, index) {
            var _a = _this.list.props.item, className = _a.className, key = _a.key;
            var labelId = item.labelId, selected = item.selected, obItem = item.item;
            return React.createElement("li", { key: key === undefined ? index : key(item), className: classNames(className) },
                React.createElement("div", { className: "d-flex align-items-center px-3" },
                    React.createElement("input", { ref: function (input) {
                            if (!input)
                                return;
                            _this.input = input;
                            input.checked = selected;
                        }, className: "", type: "checkbox", value: "", id: labelId, defaultChecked: selected, onChange: function (e) {
                            _this.onSelect(item, e.target.checked);
                        } }),
                    React.createElement("label", { className: "", style: { flex: 1, marginBottom: 0 }, htmlFor: labelId }, _this.renderContent(obItem, index))));
        };
        _this.disposer = autorun(_this.buildItems);
        return _this;
        //this.buildItems();
    }
    Selectable.prototype.dispose = function () { this.disposer(); };
    ;
    Object.defineProperty(Selectable.prototype, "items", {
        get: function () {
            //if (this._items === undefined) 
            //this.buildItems();
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Selectable.prototype.selectAll = function () {
        if (this._items)
            this._items.forEach(function (v) { return v.selected = true; });
    };
    Selectable.prototype.unselectAll = function () {
        if (this._items)
            this._items.forEach(function (v) { return v.selected = false; });
    };
    /*
    updateProps(nextProps:any) {
        if (nextProps.selectedItems === this._selectedItems) return;
        this.buildItems();
    }
    */
    Selectable.prototype.onSelect = function (item, selected) {
        item.selected = selected;
        var anySelected = this._items.some(function (v) { return v.selected; });
        this.list.props.item.onSelect(item.item, selected, anySelected);
    };
    Object.defineProperty(Selectable.prototype, "selectedItems", {
        get: function () {
            return this._items.filter(function (v) { return v.selected === true; }).map(function (v) { return v.item; });
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        observable
    ], Selectable.prototype, "_items", void 0);
    return Selectable;
}(ListBase));
export { Selectable };
/*
<label>
<label className="custom-control custom-checkbox">
    <input type='checkbox' className="custom-control-input"
        //checked={selected}
        onChange={(e)=>this.onSelect(item, e.target.checked)} />
    <span className="custom-control-indicator" />
</label>
{this.renderContent(item.item, index)}
</label>
*/
//# sourceMappingURL=selectable.js.map