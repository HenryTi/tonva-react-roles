var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { observer } from 'mobx-react';
import { PageHeader } from './pageHeader';
import { TabsView } from './tabs';
import { ScrollView } from './scrollView';
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page(props) {
        var _this = _super.call(this, props) || this;
        var tabsProps = props.tabsProps;
        if (tabsProps) {
            _this.tabsView = new TabsView(tabsProps);
        }
        return _this;
    }
    Page.prototype.renderHeader = function () {
        var _a = this.props, back = _a.back, header = _a.header, right = _a.right, headerClassName = _a.headerClassName, afterBack = _a.afterBack;
        var pageHeader = header !== false && React.createElement(PageHeader, { back: back, center: header, right: right, logout: this.props.logout, className: headerClassName, afterBack: afterBack });
        return pageHeader;
    };
    Page.prototype.renderFooter = function () {
        var footer = this.props.footer;
        if (footer) {
            var elFooter = React.createElement("footer", null, footer);
            return React.createElement(React.Fragment, null,
                React.createElement("section", { className: "tv-page-footer" }, elFooter),
                elFooter);
        }
    };
    Page.prototype.render = function () {
        if (this.tabsView) {
            return React.createElement(this.tabsView.content);
        }
        var _a = this.props, onScroll = _a.onScroll, onScrollTop = _a.onScrollTop, onScrollBottom = _a.onScrollBottom, children = _a.children, className = _a.className, bgClassName = _a.bgClassName;
        return React.createElement(ScrollView, { onScroll: onScroll, onScrollTop: onScrollTop, onScrollBottom: onScrollBottom, className: className, bgClassName: bgClassName },
            this.renderHeader(),
            React.createElement("main", null, children),
            this.renderFooter());
    };
    Page = __decorate([
        observer
    ], Page);
    return Page;
}(React.Component));
export { Page };
//# sourceMappingURL=page.js.map