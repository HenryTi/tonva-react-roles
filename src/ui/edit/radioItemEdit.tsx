import * as React from 'react';
import { UiRadio } from '../schema';
import { nav } from '../nav';
import { Page } from '../page';
import { observer } from 'mobx-react';
import { SelectItemBaseEdit } from './selectBaseItemEdit';

export class RadioItemEdit extends SelectItemBaseEdit {
    protected uiItem: UiRadio;
    protected async internalStart():Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let element = React.createElement(this.page, {resolve:resolve, reject:reject});
            nav.push(element,reject);
        });
    }

    private onChange = (value: any) => {
        this.newValue = value;
        let preValue = this.value;
        this.isChanged = (this.newValue != preValue);
    }

    private page = observer((props:{resolve:(value:any)=>void, reject: (resean?:any)=>void}):JSX.Element => {
        let {resolve, reject} = props;
        let {name} = this.itemSchema;
        let {list, defaultValue} = this.uiItem;
        let right = <button
            className="btn btn-sm btn-success"
            disabled={!this.isChanged}
            onClick={()=>{
                this.verifyValue();
                if (this.error === undefined) resolve(this.newValue);
            }}>保存</button>;
        let content = this.items?
        this.items.map((v, index:number) => {
                let {title, value} = v;
                return <label key={index} className="px-3 py-2 cursor-pointer">
                    <input name={name} type="radio" value={value} 
                        onClick={()=>this.onChange(value)} 
                        defaultChecked={value === defaultValue} /> {title || value} &nbsp;
                </label>;
            })
            :
            <>no list defined</>;
        return <Page header={'更改' + this.label} right={right}>
            <div className="m-3">{content}</div>
        </Page>;
    })
}
