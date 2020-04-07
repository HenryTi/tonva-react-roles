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
import classNames from 'classnames';
import { Widget } from './widget';
import { observable } from 'mobx';
export class TextWidget extends Widget {
    constructor() {
        super(...arguments);
        this.inputType = 'text';
        this.onKeyDown = (evt) => __awaiter(this, void 0, void 0, function* () {
            this.internalOnKeyDown(evt);
            if (evt.keyCode !== 13)
                return;
            let { onEnter } = this.context.form.props;
            if (onEnter === undefined)
                return;
            this.changeValue(evt.currentTarget.value, true);
            //this.checkRules();
            //this.context.checkContextRules();
            this.input.blur();
            let ret = yield onEnter(this.name, this.context);
            if (ret !== undefined) {
                this.context.setError(this.name, ret);
            }
        });
        this.onBlur = (evt) => {
            this.onInputChange(evt);
            this.checkRules();
            this.context.checkContextRules();
            this.hasFocus = false;
        };
        this.onFocus = (evt) => {
            this.clearError();
            this.context.removeErrorWidget(this);
            this.context.clearErrors();
            this.hasFocus = true;
        };
    }
    get ui() { return this._ui; }
    ;
    setElementValue(value) {
        if (this.input === null)
            return;
        this.input.value = value;
    }
    get placeholder() { return (this.ui && this.ui.placeholder) || this.name; }
    internalOnKeyDown(evt) {
    }
    onChange(evt) {
    }
    setReadOnly(value) {
        if (this.input === null)
            return;
        this.input.readOnly = this.readOnly = value;
    }
    setDisabled(value) {
        if (this.input === null)
            return;
        this.input.disabled = this.disabled = value;
    }
    render() {
        let renderTemplet = this.renderTemplet();
        if (renderTemplet !== undefined)
            return renderTemplet;
        let cn = {
        //'form-control': true,
        };
        if (this.hasError === true) {
            cn['is-invalid'] = true;
        }
        else {
            cn['required-item'] = this.itemSchema.required === true;
        }
        return React.createElement(React.Fragment, null,
            React.createElement("input", { ref: input => this.input = input, className: classNames(this.className, cn), type: this.inputType, defaultValue: this.value, onChange: (evt) => this.onChange(evt), placeholder: this.placeholder, readOnly: this.readOnly, disabled: this.disabled, onKeyDown: this.onKeyDown, onFocus: this.onFocus, onBlur: this.onBlur, maxLength: this.itemSchema.maxLength }),
            this.renderErrors());
    }
}
__decorate([
    observable
], TextWidget.prototype, "hasFocus", void 0);
//# sourceMappingURL=textWidget.js.map