var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { nav } from '../nav';
import { Page } from '../page';
import { observer } from 'mobx-react';
import { ItemEdit } from './itemEdit';
export class RadioItemEdit extends ItemEdit {
    constructor() {
        super(...arguments);
        this.onChange = (value) => {
            this.newValue = value;
            let preValue = this.value;
            this.isChanged = (this.newValue !== preValue);
        };
        this.page = observer((props) => {
            let { resolve } = props;
            let { name } = this.itemSchema;
            let { list } = this.uiItem;
            let right = React.createElement("button", { className: "btn btn-sm btn-success align-self-center", disabled: !this.isChanged, onClick: () => {
                    this.verifyValue();
                    if (this.error === undefined)
                        resolve(this.newValue);
                } }, "\u4FDD\u5B58");
            let content = list ?
                list.map((v, index) => {
                    let { title, value } = v;
                    return React.createElement("div", { key: index, className: "col" },
                        React.createElement("label", { className: "px-3 py-2 cursor-pointer" },
                            React.createElement("input", { name: name, type: "radio", value: value, onClick: () => this.onChange(value), defaultChecked: value === this.value }),
                            " ",
                            title || value,
                            " \u00A0"));
                })
                :
                    React.createElement(React.Fragment, null, "no list defined");
            return React.createElement(Page, { header: '更改' + this.label, right: right },
                React.createElement("div", { className: "m-3" },
                    React.createElement("div", { className: "row row-cols-2 row-cols-sm-3 row-cols-md-4" }, content)));
        });
    }
    get uiItem() { return this._uiItem; }
    init() {
        var _a;
        if (this.value === undefined) {
            this.value = (_a = this._uiItem) === null || _a === void 0 ? void 0 : _a.defaultValue;
        }
    }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let element = React.createElement(this.page, { resolve: resolve, reject: reject });
                nav.push(element, reject);
            });
        });
    }
}
//# sourceMappingURL=radioItemEdit.js.map