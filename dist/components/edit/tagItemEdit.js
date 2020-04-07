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
import { Page } from '../page/page';
import { observer } from 'mobx-react';
import { ItemEdit } from './itemEdit';
class TagItemEdit extends ItemEdit {
    constructor() {
        super(...arguments);
        this.inputs = {};
        this.page = observer((props) => {
            let { resolve } = props;
            let { name } = this.itemSchema;
            //let {valuesView} = this.uiItem;
            let right = React.createElement("button", { className: "btn btn-sm btn-success align-self-center", disabled: !this.isChanged, onClick: () => {
                    this.verifyValue();
                    if (this.error === undefined)
                        resolve(this.newValue);
                } }, "\u4FDD\u5B58");
            /*
            let content = list?
                list.map((v, index:number) => {
                    let {name:itemName, id} = v;
                    return <div key={index} className="col"><label className="px-3 py-2 cursor-pointer">
                        <input ref={input=>this.inputs[id] = input} name={name} type={this.inputType} value={id}
                            onClick={(e)=>this.onChange(e.currentTarget.checked, id)}
                            defaultChecked={this.defaultChecked(id)} /> {itemName} &nbsp;
                    </label></div>;
                })
                :
                <>no list defined</>;
            */
            return React.createElement(Page, { header: '更改' + this.label, right: right },
                React.createElement("div", { className: "p-3" }, this.renderInputs()));
        });
    }
    get uiItem() { return this._uiItem; }
    ;
    init() {
        if (this.value === undefined) {
            this.value = this._uiItem === undefined ? undefined : this._uiItem.defaultValue;
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
    renderContent() {
        let valuesView = this.uiItem.valuesView;
        if (valuesView === undefined)
            return super.renderContent();
        return valuesView.render(this.value);
    }
}
export class TagSingleItemEdit extends TagItemEdit {
    constructor() {
        super(...arguments);
        this.inputType = 'radio';
        this.onInputChange = (evt) => {
            let { currentTarget } = evt;
            if (currentTarget.checked === false)
                return;
            this.newValue = Number(currentTarget.value);
            let preValue = this.value;
            this.isChanged = (this.newValue !== preValue);
        };
    }
    renderInputs() {
        let { valuesView } = this.uiItem;
        let options = {
            inputs: this.inputs,
            onInputChange: this.onInputChange,
        };
        return valuesView.renderRadios(this.value, options);
    }
}
export class TagMultiItemEdit extends TagItemEdit {
    constructor() {
        super(...arguments);
        //private arr:number[];
        this.inputType = 'checkbox';
        this.onInputChange = (evt) => {
            let values = [];
            for (let i in this.inputs) {
                let input = this.inputs[i];
                if (input.checked === true)
                    values.push(input.value);
            }
            this.newValue = values.join('|');
            //this.newValue = value;
            let preValue = this.value;
            this.isChanged = (this.newValue !== preValue);
        };
    }
    renderInputs() {
        let { valuesView } = this.uiItem;
        let options = {
            inputs: this.inputs,
            onInputChange: this.onInputChange
        };
        return valuesView.renderChecks(this.value, options);
    }
}
//# sourceMappingURL=tagItemEdit.js.map