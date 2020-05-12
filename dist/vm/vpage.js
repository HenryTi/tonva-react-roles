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
import * as React from 'react';
import { Page } from "../components";
import { View } from "./view";
var VPage = /** @class */ (function (_super) {
    __extends(VPage, _super);
    function VPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VPage.prototype.open = function (param) {
        this.init(param);
        this.openPageElement(this.renderPage());
        return;
    };
    VPage.prototype.render = function (param) {
        this.init(param);
        //return this.content();
        return this.renderPage();
    };
    VPage.prototype.init = function (param) { return; };
    VPage.prototype.header = function () { return null; };
    VPage.prototype.right = function () { return null; };
    VPage.prototype.content = function () { return null; };
    VPage.prototype.footer = function () { return null; };
    VPage.prototype.logout = function () { return false; };
    VPage.prototype.renderPage = function () {
        var _this = this;
        var header = this.header();
        if (!header)
            header = false;
        return React.createElement(Page, { header: header, right: this.right(), footer: this.footer(), onScroll: function (e) { return _this.onPageScroll(e); }, onScrollTop: function (scroller) { return _this.onPageScrollTop(scroller); }, onScrollBottom: function (scroller) { return _this.onPageScrollBottom(scroller); }, back: this.back, headerClassName: this.headerClassName, bgClassName: this.bgClassName, afterBack: function () { return _this.afterBack(); }, tabsProps: this.tabsProps, logout: this.logout() }, this.content());
    };
    VPage.prototype.onPageScroll = function (e) { };
    VPage.prototype.onPageScrollTop = function (scroller) { };
    VPage.prototype.onPageScrollBottom = function (scroller) { };
    VPage.prototype.afterBack = function () { };
    Object.defineProperty(VPage.prototype, "back", {
        get: function () { return 'back'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VPage.prototype, "headerClassName", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VPage.prototype, "bgClassName", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VPage.prototype, "tabsProps", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    return VPage;
}(View));
export { VPage };
//# sourceMappingURL=vpage.js.map