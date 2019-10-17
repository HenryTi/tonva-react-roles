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
import { observer } from 'mobx-react';
import { tv } from '../../cUq/reactBoxId';
import { VField, RedMark } from './vField';
const buttonStyle = {
    textAlign: 'left',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    overflow: 'hidden'
};
export class VTuidField extends VField {
    constructor(vForm, field, fieldUI, fieldRes) {
        super(vForm, field, fieldUI, fieldRes);
        this.onClick = () => __awaiter(this, void 0, void 0, function* () {
            if (this.readonly === true) {
                if (!this.value)
                    return;
                yield this.tuid.showInfo(); //this.value.id);
                return;
            }
            let id;
            if (this.input !== undefined) {
                id = yield this.input.select(this.vForm, this.field, this.vForm.getValues());
            }
            else {
                alert('call undefined');
                id = 0;
            }
            this.setValue(this.tuid.boxId(id));
        });
        this.view = observer(() => {
            let { placeHolder } = this.fieldRes;
            let disabled = false;
            //let {_ownerField} = this.field;
            let { _tuid } = this.field;
            let { ownerField } = _tuid;
            if (ownerField !== undefined) {
                let { name } = ownerField;
                disabled = this.vForm.getValue(name) === null;
            }
            let content;
            if (this.value === null)
                content = React.createElement(React.Fragment, null, placeHolder || this.input.placeHolder);
            else if (typeof this.value === 'object') {
                content = tv(this.value);
            }
            else {
                let idBox = this.tuid.boxId(this.value);
                content = tv(idBox); // idBox.content();
            }
            if (this.readonly === true) {
                return React.createElement("div", { className: "form-control form-control-plaintext border border-info rounded bg-light cursor-pointer", onClick: this.onClick }, content);
            }
            let { required } = this.fieldUI;
            let redDot = (required === true || this.field.null === false) && React.createElement(RedMark, null);
            return React.createElement(React.Fragment, null,
                redDot,
                React.createElement("button", { className: "form-control btn btn-outline-info", type: "button", disabled: disabled, style: buttonStyle, onClick: this.onClick }, content));
        });
        this.tuid = field._tuid;
        this.vForm = vForm;
        this.input = vForm.inputs[field.name];
    }
}
//# sourceMappingURL=vTuidField.js.map