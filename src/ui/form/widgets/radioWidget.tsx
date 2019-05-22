import * as React from 'react';
import classNames from 'classnames';
import { Widget } from './widget';
import { UiRadio } from '../../schema';
import { RowContext } from '../context';
import { SelectBaseWidget } from './selectBaseWidget';

//const radioStyle:React.CSSProperties = {display: 'flex'};
const autoHeight:React.CSSProperties = {height: 'auto'};
export class RadioWidget extends SelectBaseWidget {
    protected inputs: {[index:number]: HTMLInputElement} = {};
    protected ui: UiRadio;

    protected setElementValue(value:any) {
        for (let i in this.inputs) {
            let input = this.inputs[i];
            input.checked = value === input.value;
        }
    }
    setReadOnly(value:boolean) {
        this.readOnly = value;
        for (let i in this.inputs) this.inputs[i].readOnly = value;
    }
    setDisabled(value:boolean) {
        this.disabled = value;
        for (let i in this.inputs) this.inputs[i].disabled = value
    }

    render() {
        let {defaultValue, radioClassName} = this.ui;
        let {isRow, inNode} = this.context;
        let rowKey:number;
        if (isRow === true) {
            rowKey = (this.context as RowContext).rowKey;
        }
        let cn = classNames(this.className);
        return <div className={cn} style={autoHeight}>
            {this.ui.list.map((v,index) => {
                let {value, title} = v;
                let name = this.name;
                if (rowKey !== undefined) name += '-' + rowKey;
                return <label key={index} className={classNames('form-radio-inline', radioClassName)}>
                    <input ref={input=>this.inputs[index]=input} type="radio" name={name}
                        value={value} defaultChecked={(this.defaultValue || defaultValue)===value}
                        onChange={this.onInputChange} />
                    {title || value}
                </label>;
                //</span>
            })}
        </div>;
    }
}
