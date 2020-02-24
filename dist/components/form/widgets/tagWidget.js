import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
const radioStyle = { height: 'auto' };
class TagWidget extends Widget {
    constructor() {
        super(...arguments);
        this.inputs = {};
    }
    get ui() { return this._ui; }
    ;
    setElementValue(value) {
        for (let i in this.inputs) {
            let input = this.inputs[i];
            input.checked = value === input.value;
        }
    }
    setReadOnly(value) {
        this.readOnly = value;
        for (let i in this.inputs)
            this.inputs[i].readOnly = value;
    }
    setDisabled(value) {
        this.disabled = value;
        for (let i in this.inputs)
            this.inputs[i].disabled = value;
    }
    render() {
        let { defaultValue, list } = this.ui;
        let { isRow } = this.context;
        let rowKey;
        if (isRow === true) {
            rowKey = this.context.rowKey;
        }
        let cn = classNames(this.className, 'py-0');
        let name = this.name;
        if (rowKey !== undefined)
            name += '-' + rowKey;
        return React.createElement("div", { className: cn, style: radioStyle },
            React.createElement("div", { className: "row row-cols-3 row-cols-sm-4 row-cols-md-5" }, list.map((v, index) => {
                return this.renderItem(v, index, name);
            })));
    }
}
export class TagSingleWidget extends TagWidget {
    renderItem(item, index, widgetName) {
        let { id, name, ext } = item;
        return React.createElement("div", { className: "col" },
            React.createElement("label", { key: index, className: "form-radio-inline" },
                React.createElement("input", { ref: input => this.inputs[index] = input, type: "radio", name: widgetName, value: id, defaultChecked: this.defaultValue === id, onChange: this.onInputChange }),
                name));
    }
}
export class TagMultiWidget extends TagWidget {
    constructor() {
        super(...arguments);
        this.onInputChange = (evt) => {
            let values = [];
            for (let i in this.inputs) {
                let input = this.inputs[i];
                if (input.checked === true)
                    values.push(input.value);
            }
            this.changeValue(values.join('\n'), true);
        };
    }
    init() {
        super.init();
        let def = this.defaultValue;
        switch (typeof def) {
            default:
                this.defaultArr = [];
                break;
            case 'string':
                this.defaultArr = def.split('\n').map(v => Number(v));
                break;
        }
    }
    renderItem(item, index, widgetName) {
        let { id, name, ext } = item;
        return React.createElement("div", { className: "col" },
            React.createElement("label", { key: index, className: "form-radio-inline" },
                React.createElement("input", { ref: input => this.inputs[index] = input, type: "checkbox", value: id, defaultChecked: this.defaultArr.indexOf(id) >= 0, onChange: this.onInputChange }),
                name));
    }
}
//# sourceMappingURL=tagWidget.js.map