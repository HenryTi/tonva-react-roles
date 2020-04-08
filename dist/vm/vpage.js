import * as React from 'react';
import { Page } from "../components";
import { View } from "./view";
export class VPage extends View {
    open(param) {
        this.init(param);
        this.openPageElement(this.renderPage());
        return;
    }
    render(param) {
        this.init(param);
        return this.content();
    }
    init(param) { return; }
    header() { return null; }
    right() { return null; }
    content() { return null; }
    footer() { return null; }
    renderPage() {
        return React.createElement(Page, { header: this.header(), right: this.right(), footer: this.footer(), onScroll: (e) => this.onPageScroll(e), onScrollTop: (scroller) => this.onPageScrollTop(scroller), onScrollBottom: (scroller) => this.onPageScrollBottom(scroller), back: this.back, headerClassName: this.headerClassName, bgClassName: this.bgClassName, afterBack: () => this.afterBack(), tabsProps: this.tabsProps }, this.content());
    }
    onPageScroll(e) { }
    onPageScrollTop(scroller) { }
    onPageScrollBottom(scroller) { }
    afterBack() { }
    get back() { return 'back'; }
    get headerClassName() { return; }
    get bgClassName() { return; }
    get tabsProps() { return; }
}
//# sourceMappingURL=vpage.js.map