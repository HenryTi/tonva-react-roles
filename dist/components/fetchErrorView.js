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
import { refetchApi } from '../net';
import { Page } from './page';
import { nav } from './nav';
import { FA } from './simple';
export default class FetchErrorView extends React.Component {
    constructor() {
        super(...arguments);
        this.reApi = () => __awaiter(this, void 0, void 0, function* () {
            this.props.clearError();
            const { channel, url, options, resolve, reject } = this.props;
            yield refetchApi(channel, url, options, resolve, reject);
        });
        this.close = () => __awaiter(this, void 0, void 0, function* () {
            this.props.clearError();
        });
    }
    render() {
        let { error, url, type } = this.props;
        let buttons;
        let errContent;
        let errText;
        if (typeof error === 'object') {
            errText = '网络遇到问题';
            let err = [];
            for (let i in error) {
                err.push(React.createElement("div", { key: i, className: "form-group row" },
                    React.createElement("label", { className: "col-sm-2 col-form-label" }, i),
                    React.createElement("div", { className: "col-sm-10 col-form-label", style: { wordWrap: "break-word" } }, error[i])));
            }
            errContent = React.createElement("div", { className: "p-3" }, err);
        }
        else {
            errText = error;
        }
        if (type === 'message') {
            buttons = React.createElement("button", { className: "btn btn-outline-primary mr-3", onClick: () => {
                    nav.resetAll();
                } }, "\u5347\u7EA7\u6743\u9650");
        }
        else {
            buttons = React.createElement(React.Fragment, null,
                React.createElement("button", { className: "btn btn-outline-primary mr-3", type: 'button', onClick: this.reApi }, "\u91CD\u65B0\u8BBF\u95EE"),
                React.createElement("button", { className: "btn btn-outline-primary", type: 'button', onClick: this.close }, "\u5173\u95ED"));
        }
        let divErr = React.createElement(React.Fragment, null,
            React.createElement("div", { className: "p-3 bg-white" },
                React.createElement("div", { className: "" },
                    React.createElement(FA, { className: "text-danger", name: "exclamation-circle", size: "lg" }),
                    "\u00A0 ",
                    errText),
                React.createElement("div", { className: "text-info", style: { wordWrap: "break-word" } }, url),
                React.createElement("div", { className: "pt-3" }, buttons)),
            errContent);
        return React.createElement("li", null,
            React.createElement("article", { className: "page-container" },
                React.createElement("section", null,
                    React.createElement("div", { className: "" }, divErr))));
    }
}
export const SystemNotifyPage = ({ message }) => {
    return React.createElement(Page, { header: "\u7CFB\u7EDF\u63D0\u9192" },
        React.createElement("div", { className: "px-3" }, message));
};
//# sourceMappingURL=fetchErrorView.js.map