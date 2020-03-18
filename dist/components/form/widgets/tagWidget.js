import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
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
}
export class TagSingleWidget extends TagWidget {
    render() {
        let { valuesView, wrapClassName } = this.ui;
        if (valuesView === undefined)
            return React.createElement(React.Fragment, null, "valuesView must be defined");
        let { isRow } = this.context;
        let rowKey;
        if (isRow === true) {
            rowKey = this.context.rowKey;
        }
        let cn = classNames(this.className, 'py-0');
        let name = this.name;
        if (rowKey !== undefined)
            name += '-' + rowKey;
        let options = {
            className: cn,
            inputName: name,
            wrapClassName,
            onInputChange: this.onInputChange
        };
        return valuesView.renderRadios(this.defaultValue, options);
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
            this.changeValue(values.join('|'), true);
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
                this.defaultArr = def.split('|').map(v => Number(v));
                break;
        }
    }
    render() {
        let { valuesView, wrapClassName } = this.ui;
        if (valuesView === undefined)
            return React.createElement(React.Fragment, null, "valuesView must be defined");
        let cn = classNames(this.className, 'py-0');
        let options = {
            className: cn,
            inputs: this.inputs,
            wrapClassName,
            onInputChange: this.onInputChange
        };
        return valuesView.renderChecks(this.defaultValue, options);
    }
}
//# sourceMappingURL=tagWidget.js.map