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
import { VPage, Page, FA, nav, LMR, List } from "../components";
import { appInFrame } from '../net';
/*
export class VAppMain extends VPage<CMainBase> {
    async open(param?:any) {
        this.openPage(this.appPage);
    }

    render(param?:any) {
        return this.appContent();
    }

    protected appPage = () => {
        let {caption} = this.controller;
        return <Page header={caption} logout={async()=>{appInFrame.unit = undefined}}>
            {this.appContent()}
        </Page>;
    }

    protected appContent = () => {
        let {cUqArr} = this.controller;
        let content:any;
        if (cUqArr.length === 0) {
            content = <div className="text-danger">
                <FA name="" /> 此APP没有绑定任何的UQ
            </div>;
        }
        else {
            content = cUqArr.map((v,i) => <div key={i}>{v.render()}</div>);
        }
        return <>{content}</>;
    };
}
*/
export class VUnsupportedUnit extends VPage {
    constructor() {
        super(...arguments);
        this.page = (predefinedUnit) => {
            let { user } = nav;
            let userName = user ? user.name : '[未登录]';
            let { appOwner, appName } = this.controller.uqsMan;
            return React.createElement(Page, { header: "APP\u65E0\u6CD5\u8FD0\u884C", logout: true },
                React.createElement("div", { className: "m-3 text-danger container" },
                    React.createElement("div", { className: "form-group row" },
                        React.createElement("div", { className: "col-sm-3 font-weight-bold" }, "\u767B\u5F55\u7528\u6237"),
                        React.createElement("div", { className: "col-sm text-body" }, userName)),
                    React.createElement("div", { className: "form-group row" },
                        React.createElement("div", { className: "col-sm-3 font-weight-bold" }, "App"),
                        React.createElement("div", { className: "col-sm text-body" }, `${appOwner}/${appName}`)),
                    React.createElement("div", { className: "form-group row" },
                        React.createElement("div", { className: "col-sm-3 font-weight-bold" }, "\u9884\u8BBE\u5C0F\u53F7"),
                        React.createElement("div", { className: "col-sm text-body" }, predefinedUnit || React.createElement("small", { className: "" }, "[\u65E0\u9884\u8BBE\u5C0F\u53F7]"))),
                    React.createElement("div", { className: "form-group row" },
                        React.createElement("div", { className: "col-sm-3 font-weight-bold" },
                            "\u53EF\u80FD\u539F\u56E0",
                            React.createElement(FA, { name: "exclamation-triangle" })),
                        React.createElement("div", { className: "col-sm text-body" },
                            React.createElement("ul", { className: "p-0" },
                                React.createElement("li", null,
                                    "\u6CA1\u6709\u5C0F\u53F7\u8FD0\u884C ",
                                    appName),
                                React.createElement("li", null,
                                    "\u7528\u6237 ",
                                    React.createElement("b", null, userName),
                                    " \u6CA1\u6709\u52A0\u5165\u4EFB\u4F55\u4E00\u4E2A\u8FD0\u884C",
                                    appName,
                                    "\u7684\u5C0F\u53F7"),
                                predefinedUnit &&
                                    React.createElement("li", null,
                                        "\u9884\u8BBE\u5C0F\u53F7 ",
                                        React.createElement("b", null, predefinedUnit),
                                        " \u6CA1\u6709\u8FD0\u884CApp ",
                                        appName)))),
                    React.createElement("div", { className: "form-group row" },
                        React.createElement("div", { className: "col-sm-3 font-weight-bold" },
                            "\u5C0F\u53F7",
                            predefinedUnit),
                        React.createElement("div", { className: "col-sm text-body" },
                            "\u9884\u8BBE\u5C0F\u53F7\u5B9A\u4E49\u5728 public/unit.json \u6587\u4EF6\u4E2D\u3002 \u5B9A\u4E49\u4E86\u8FD9\u4E2A\u6587\u4EF6\u7684\u7A0B\u5E8F\uFF0C\u53EA\u80FD\u7531url\u76F4\u63A5\u542F\u52A8\u3002 \u7528\u6237\u7B2C\u4E00\u6B21\u8BBF\u95EEapp\u4E4B\u540E\uFF0C\u4F1A\u7F13\u5B58\u5728localStorage\u91CC\u3002",
                            React.createElement("br", null),
                            "\u5982\u679C\u8981\u5220\u53BB\u7F13\u5B58\u7684\u9884\u5B9A\u4E49Unit\uFF0Clogout\u7136\u540E\u518Dlogin\u3002"))));
        };
    }
    open(predefinedUnit) {
        return __awaiter(this, void 0, void 0, function* () {
            this.openPage(this.page, predefinedUnit);
        });
    }
}
export class VUnitSelect extends VPage {
    constructor() {
        super(...arguments);
        this.renderRow = (item, index) => {
            let { id, nick, name } = item;
            return React.createElement(LMR, { className: "px-3 py-2", right: 'id: ' + id },
                React.createElement("div", null, nick || name));
        };
        this.onRowClick = (item) => __awaiter(this, void 0, void 0, function* () {
            appInFrame.unit = item.id; // 25;
            yield this.controller.start();
        });
        this.page = () => {
            return React.createElement(Page, { header: "\u9009\u62E9\u5C0F\u53F7", logout: true },
                React.createElement(List, { items: this.controller.appUnits, item: { render: this.renderRow, onClick: this.onRowClick } }));
        };
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            this.openPage(this.page);
        });
    }
}
export class VErrorsPage extends VPage {
    constructor() {
        super(...arguments);
        this.page = (errors) => {
            return React.createElement(Page, { header: "ERROR" },
                React.createElement("div", { className: "m-3" },
                    React.createElement("div", null, "Load Uqs \u53D1\u751F\u9519\u8BEF\uFF1A"),
                    errors.errors.map((r, i) => React.createElement("div", { key: i }, r))));
        };
    }
    open(errors) {
        return __awaiter(this, void 0, void 0, function* () {
            this.openPage(this.page, { errors: errors });
        });
    }
}
export class VStartError extends VPage {
    constructor() {
        super(...arguments);
        this.page = (error) => {
            return React.createElement(Page, { header: "App start error!" },
                React.createElement("pre", null, typeof error === 'string' ? error : error.message));
        };
    }
    open(error) {
        return __awaiter(this, void 0, void 0, function* () {
            this.openPage(this.page, error);
        });
    }
}
//# sourceMappingURL=vMain.js.map