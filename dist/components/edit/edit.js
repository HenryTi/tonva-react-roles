var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
//import _ from 'lodash';
import { observer } from 'mobx-react';
import { StringItemEdit } from './stringItemEdit';
import { ImageItemEdit } from './imageItemEdit';
import { RadioItemEdit } from './radioItemEdit';
import { SelectItemEdit } from './selectItemEdit';
import { IdItemEdit } from './idItemEdit';
import { TagSingleItemEdit, TagMultiItemEdit } from './tagItemEdit';
let Edit = class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.defaultSepClassName = 'border-top edit-sep-light-gray';
        this.defaultRowContainerClassName = 'd-flex px-3 py-2 bg-white align-items-center';
        this.rowClick = (itemEdit /*, itemSchema: ItemSchema, uiItem: UiItem, label:string, value: any*/) => __awaiter(this, void 0, void 0, function* () {
            if (itemEdit === undefined) {
                alert('item has no edit');
                return;
            }
            let { itemSchema, uiItem, value } = itemEdit;
            let { onItemChanged, onItemClick, stopEdit } = this.props;
            if (stopEdit === true)
                return;
            let changeValue;
            if (onItemClick !== undefined) {
                yield onItemClick(itemSchema, uiItem, value);
                return;
            }
            //let itemEdit:ItemEdit = createItemEdit(itemSchema, uiItem, label, value);
            if (itemEdit === undefined) {
                alert('undefined: let itemEdit:ItemEdit = createItemEdit(itemSchema, uiItem, label, value);');
                return;
            }
            try {
                changeValue = yield itemEdit.start();
                if (changeValue !== value) {
                    // 2020-04-15：改值之后，应该赋值吧。所以移到这里来
                    this.props.data[itemSchema.name] = changeValue;
                    if (onItemChanged === undefined) {
                        alert(`${itemSchema.name} value changed, new: ${changeValue}, pre: ${value}`);
                        // 2020-04-15：改值之后，应该赋值吧。所以这一句移到前面去
                        //this.props.data[itemSchema.name] = changeValue;
                    }
                    else {
                        yield onItemChanged(itemSchema, changeValue, value);
                    }
                }
                yield itemEdit.end();
            }
            catch (err) {
                // 如果直接back，会触发reject，就到这里了
                console.log('no value changed');
            }
        });
        let { topBorderClassName, bottomBorderClassName, sepClassName, rowContainerClassName, uiSchema, stopEdit } = props;
        this.topBorder = React.createElement("div", { className: topBorderClassName || this.defaultSepClassName });
        this.bottomBorder = React.createElement("div", { className: bottomBorderClassName || this.defaultSepClassName });
        this.rowContainerClassName = rowContainerClassName || this.defaultRowContainerClassName;
        if (stopEdit !== true)
            this.rowContainerClassName += ' cursor-pointer';
        this.sep = React.createElement("div", { className: sepClassName || this.defaultSepClassName });
        this.uiSchema = (uiSchema && uiSchema.items) || {};
    }
    render() {
        let { schema } = this.props;
        let sep;
        return React.createElement("div", null,
            this.topBorder,
            schema.map((itemSchema, index) => {
                let { name } = itemSchema;
                let uiItem = this.uiSchema === undefined ? undefined : this.uiSchema[name];
                let label, labelHide;
                if (uiItem !== undefined) {
                    label = uiItem.label || name;
                    labelHide = uiItem.labelHide;
                }
                ;
                let value = this.props.data[name];
                let itemEdit = createItemEdit(itemSchema, uiItem, label, value);
                let { required } = itemSchema;
                let requireFlag = required === true && React.createElement("span", { className: "text-danger" }, "*");
                let divLabel, cn = 'flex-fill d-flex ';
                if (labelHide === true) {
                    divLabel = undefined;
                }
                else {
                    divLabel = React.createElement("div", null,
                        label,
                        " ",
                        requireFlag);
                    cn += 'justify-content-end';
                }
                let ret = React.createElement(React.Fragment, { key: index },
                    sep,
                    React.createElement("div", { className: 'd-flex align-items-center' + this.rowContainerClassName, onClick: () => __awaiter(this, void 0, void 0, function* () { return yield this.rowClick(itemEdit); }) },
                        divLabel,
                        React.createElement("div", { className: cn }, itemEdit === undefined ? undefined : itemEdit.renderContent()),
                        this.props.stopEdit !== true && React.createElement("div", { className: "w-2c text-right" },
                            React.createElement("i", { className: "fa fa-angle-right" }))));
                sep = this.sep;
                return ret;
            }),
            this.bottomBorder);
    }
};
Edit = __decorate([
    observer
], Edit);
export { Edit };
function createItemEdit(itemSchema, uiItem, label, value) {
    let ie;
    let itemEdit;
    if (uiItem !== undefined) {
        switch (uiItem.widget) {
            default: break;
            case 'id':
                itemEdit = IdItemEdit;
                break;
            case 'text':
                itemEdit = StringItemEdit;
                break;
            case 'image':
                itemEdit = ImageItemEdit;
                break;
            case 'select':
                itemEdit = SelectItemEdit;
                break;
            case 'radio':
                ie = new RadioItemEdit(itemSchema, uiItem, label, value);
                break;
            case 'tagSingle':
                ie = new TagSingleItemEdit(itemSchema, uiItem, label, value);
                break;
            case 'tagMulti':
                ie = new TagMultiItemEdit(itemSchema, uiItem, label, value);
                break;
        }
    }
    if (ie === undefined) {
        if (itemEdit === undefined) {
            switch (itemSchema.type) {
                case 'string':
                    itemEdit = StringItemEdit;
                    break;
                case 'image':
                    itemEdit = ImageItemEdit;
                    break;
            }
        }
        if (itemEdit === undefined)
            return;
        ie = new itemEdit(itemSchema, uiItem, label, value);
    }
    ie.init();
    return ie;
}
//# sourceMappingURL=edit.js.map