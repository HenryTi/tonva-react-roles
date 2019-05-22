import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
//const radioStyle:React.CSSProperties = {display: 'flex'};
const autoHeight = { height: 'auto' };
export class RadioWidget extends Widget {
    constructor() {
        super(...arguments);
        this.inputs = {};
    }
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
        let { defaultValue, list, radioClassName } = this.ui;
        let { isRow, inNode } = this.context;
        let rowKey;
        if (isRow === true) {
            rowKey = this.context.rowKey;
        }
        let cn = classNames(this.className);
        return React.createElement("div", { className: cn, style: autoHeight }, list.map((v, index) => {
            let { value, title } = v;
            let name = this.name;
            if (rowKey !== undefined)
                name += '-' + rowKey;
            return React.createElement("label", { key: index, className: classNames('form-radio-inline', radioClassName) },
                React.createElement("input", { ref: input => this.inputs[index] = input, type: "radio", name: name, value: value, defaultChecked: (this.defaultValue || defaultValue) === value, onChange: this.onInputChange }),
                title || value);
            //</span>
        }));
    }
}
//# sourceMappingURL=radioWidget.js.map