var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Page } from '../page';
import { observer } from 'mobx-react';
import { ItemEdit } from './itemEdit';
export class IdItemEdit extends ItemEdit {
    constructor() {
        super(...arguments);
        this.onChange = (value) => {
            this.newValue = value;
            let preValue = this.value;
            this.isChanged = (this.newValue != preValue);
        };
        this.page = observer((props) => {
            /*
            let {resolve, reject} = props;
            let {list} = this.uiItem;
            let content = list?
                list.map((v, index:number) => {
                    let {title, value} = v;
                    return <div key={index} className="px-3 py-2 cursor-pointer bg-white mb-1" onClick={()=>{this.onChange(value); resolve(this.newValue)}}>
                        {title || value}
                    </div>;
                })
                :
                <>no list defined</>;
            return <Page header={'更改' + this.label}>
                <div className="my-3">
                    {content}
                </div>
            </Page>;
            */
            return React.createElement(Page, { header: '更改' + this.label }, "ddd");
        });
    }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                //let element = React.createElement(this.page, {resolve:resolve, reject:reject});
                //nav.push(element,reject);
                let { pickId } = this.uiItem;
                if (pickId === undefined) {
                    alert('IdItemEdit.pickId = undefined');
                    return;
                }
                let boxId = yield pickId(undefined, undefined, this.value);
                //if (typeof id === 'object') {
                //    id = (id as any).id;
                //}
                this.onChange(boxId.id);
                resolve(boxId);
                //this.newValue = id;
            }));
        });
    }
    internalEnd() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
//# sourceMappingURL=idItemEdit.js.map