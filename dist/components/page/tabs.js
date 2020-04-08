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
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import '../../css/va-tab.css';
class Tab {
    constructor() {
        this.loaded = false;
    }
    get content() {
        if (this.load && this.loaded === false)
            return;
        if (this.selected === false)
            return this._content;
        if (!this._content) {
            if (this.contentBuilder !== undefined) {
                this._content = this.contentBuilder();
            }
            else if (this.page !== undefined) {
                this._content = this.page.content();
            }
            else {
                this._content = React.createElement("div", { className: "p-5" }, "tab \u5E94\u8BE5\u5B9A\u4E49content\u6216\u8005page");
            }
        }
        return this._content;
    }
    shown() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.onShown !== undefined) {
                yield this.onShown();
            }
            if (this.load !== undefined) {
                if (this.loaded === false) {
                    yield this.load();
                    this.loaded = true;
                }
            }
        });
    }
}
__decorate([
    observable
], Tab.prototype, "loaded", void 0);
__decorate([
    observable
], Tab.prototype, "selected", void 0);
export const TabCaptionComponent = (label, icon, color) => React.createElement("div", { className: 'd-flex justify-content-center align-items-center flex-column cursor-pointer ' + color },
    React.createElement("div", null,
        React.createElement("i", { className: 'fa fa-lg fa-' + icon })),
    React.createElement("small", null, label));
export class TabsView {
    constructor(props) {
        this.tabClick = (tab) => __awaiter(this, void 0, void 0, function* () {
            if (!tab) {
                tab = this.selectedTab;
                if (tab === undefined) {
                    if (this.tabArr === undefined)
                        return;
                    if (this.tabArr.length === 0)
                        return;
                    tab = this.tabArr[0];
                }
            }
            this.selectedTab.selected = false;
            tab.selected = true;
            this.selectedTab = tab;
            yield tab.shown();
        });
        /*
        showTab(tabName: string) {
            let tab = this.tabs.find(v => v.name === tabName);
            if (tab === undefined) return;
            if (this.selectedTab !== undefined) this.selectedTab.selected = false;
            tab.selected = true;
            this.selectedTab = tab;
        }
        */
        this.tabs = observer(() => {
            let { tabPosition, borderColor } = this.props;
            let bsCur, bsTab;
            if (borderColor) {
                bsCur = {
                    borderColor: borderColor,
                    borderStyle: 'solid',
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                };
                bsTab = {
                    borderColor: borderColor,
                    borderStyle: 'solid',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                };
                if (tabPosition === 'top') {
                    bsCur.borderBottomWidth = 0;
                    bsCur.borderTopLeftRadius = 10;
                    bsCur.borderTopRightRadius = 10;
                    bsTab.borderTopWidth = 0;
                }
                else {
                    bsCur.borderTopWidth = 0;
                    bsCur.borderBottomLeftRadius = 10;
                    bsCur.borderBottomRightRadius = 10;
                    bsTab.borderBottomWidth = 0;
                }
            }
            let cn = classNames('tv-tabs', this.tabBg, this.sep, 'tv-tabs-' + this.size);
            let tabs = React.createElement("div", { className: cn }, this.tabArr.map((v, index) => {
                let { selected, caption, notify } = v;
                let notifyCircle;
                if (notify !== undefined) {
                    let num = notify.get();
                    if (num !== undefined) {
                        if (num > 0)
                            notifyCircle = React.createElement("u", null, num > 99 ? '99+' : num);
                        else if (num < 0)
                            notifyCircle = React.createElement("u", { className: "dot" });
                    }
                }
                return React.createElement("div", { key: index, onClick: () => this.tabClick(v), style: selected === true ? bsCur : bsTab },
                    React.createElement("div", null,
                        notifyCircle,
                        caption(selected)));
            }));
            return tabs;
        });
        this.content = observer(() => {
            let displayNone = { visibility: 'hidden' };
            return React.createElement(React.Fragment, null, this.tabArr.map((v, index) => {
                let { tabPosition } = this.props;
                let { content, page } = v;
                let tabs = React.createElement(this.tabs, null);
                let pageHeader, pageFooter;
                if (page !== undefined) {
                    pageHeader = page.header();
                    pageFooter = page.footer();
                }
                let header, footer;
                let visibility = { visibility: 'hidden' };
                if (tabPosition === 'top') {
                    header = React.createElement(React.Fragment, null,
                        React.createElement("section", { className: "tv-page-header" },
                            React.createElement("header", null,
                                tabs,
                                pageHeader)),
                        React.createElement("header", { style: visibility },
                            tabs,
                            pageHeader));
                    if (pageFooter !== undefined) {
                        footer = React.createElement(React.Fragment, null,
                            React.createElement("footer", { style: visibility }, pageFooter),
                            React.createElement("section", { className: "tv-page-footer" },
                                React.createElement("footer", null, pageFooter)));
                    }
                }
                else {
                    if (pageHeader !== undefined) {
                        header = React.createElement(React.Fragment, null,
                            React.createElement("section", { className: 'tv-page-header' },
                                React.createElement("header", null, pageHeader)),
                            React.createElement("header", { style: visibility }, pageHeader));
                    }
                    footer = React.createElement(React.Fragment, null,
                        React.createElement("footer", { style: visibility },
                            pageFooter,
                            tabs),
                        React.createElement("section", { className: 'tv-page-footer' },
                            React.createElement("footer", null,
                                pageFooter,
                                tabs)));
                }
                let style;
                if (v.selected === false)
                    style = displayNone;
                return React.createElement("div", { key: index, className: classNames('tv-page', this.contentBg), style: style },
                    React.createElement("article", null,
                        header,
                        content,
                        footer));
            }));
        });
        this.props = props;
        let { size, tabs, tabBg: tabBack, contentBg: contentBack, sep, selected } = props;
        this.size = size || 'md';
        this.tabArr = tabs.map(v => {
            let tab = new Tab();
            let { name, caption, content, page, notify, load, onShown, isSelected } = v;
            tab.name = name;
            if (isSelected === true || name === selected) {
                this.selectedTab = tab;
            }
            tab.selected = false;
            tab.caption = caption;
            if (content !== undefined) {
                tab.contentBuilder = content;
            }
            else if (page !== undefined) {
                tab.page = page;
                //contentBuilder = () => {return page.content()};
            }
            tab.notify = notify;
            tab.load = load;
            tab.onShown = onShown;
            return tab;
        });
        this.tabBg = tabBack;
        this.contentBg = contentBack;
        this.sep = sep;
        if (this.selectedTab === undefined) {
            this.selectedTab = this.tabArr[0];
        }
        this.selectedTab.selected = true;
    }
    render() {
        let { tabPosition } = this.props;
        let tabs = React.createElement(this.tabs, null);
        let cnContainer, header, footer;
        let visibility = { display: 'none' };
        if (tabPosition === 'top') {
            cnContainer = 'tv-page-header';
            header = React.createElement("header", null, tabs);
        }
        else {
            cnContainer = 'tv-page-footer';
            footer = React.createElement("footer", null, tabs);
        }
        return React.createElement(React.Fragment, null,
            header,
            this.tabArr.map((v, index) => {
                let style;
                if (v.selected === false)
                    style = visibility;
                return React.createElement("div", { key: index, className: classNames(this.contentBg), style: style }, v.content);
            }),
            footer);
    }
}
__decorate([
    observable
], TabsView.prototype, "selectedTab", void 0);
__decorate([
    observable
], TabsView.prototype, "tabArr", void 0);
;
let Tabs = class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.tabsView = new TabsView(props);
        setTimeout(() => {
            this.tabsView.tabClick(undefined);
        }, 100);
    }
    render() {
        return this.tabsView.render();
    }
};
Tabs = __decorate([
    observer
], Tabs);
export { Tabs };
;
/*
{
    tabPosition === 'top'?
        <>{tabs}{content}</> :
        <>{content}{tabs}</>
}
*/ 
//# sourceMappingURL=tabs.js.map