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
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { PageHeader } from './pageHeader';
import { TabsView } from './tabs';
const scrollAfter = 20; // 20ms之后，scroll执行
export class Scroller {
    constructor(el) {
        this.el = el;
    }
    scrollToTop() {
        setTimeout(() => this.el.scrollTo(0, 0), scrollAfter);
    }
    scrollToBottom() {
        setTimeout(() => this.el.scrollTo(0, this.el.scrollTop + this.el.offsetHeight), scrollAfter);
    }
}
const scrollTimeGap = 100;
class ScrollView extends React.Component {
    constructor() {
        super(...arguments);
        this.bottomTime = 0;
        this.topTime = 0;
        this.onScroll = (e) => __awaiter(this, void 0, void 0, function* () {
            let { onScroll, onScrollTop, onScrollBottom } = this.props;
            if (onScroll)
                this.props.onScroll(e);
            let el = e.target;
            let scroller = new Scroller(el);
            if (el.scrollTop < 30) {
                //this.eachChild(this, 'top');
                if (onScrollTop !== undefined) {
                    let topTime = new Date().getTime();
                    if (topTime - this.topTime > scrollTimeGap) {
                        this.topTime = topTime;
                        onScrollTop(scroller);
                    }
                }
            }
            if (el.scrollTop + el.offsetHeight > el.scrollHeight - 30) {
                //this.eachChild(this, 'bottom');
                if (onScrollBottom !== undefined) {
                    let bottomTime = new Date().getTime();
                    if (bottomTime - this.bottomTime > scrollTimeGap) {
                        this.bottomTime = bottomTime;
                        onScrollBottom(scroller);
                    }
                }
            }
        });
    }
    eachChild(c, direct) {
        let { props } = c;
        if (props === undefined)
            return;
        let { children } = props;
        if (children === undefined)
            return;
        React.Children.forEach(children, (child, index) => {
            let { _$scroll } = child;
            if (_$scroll)
                _$scroll(direct);
            console.log(child.toString());
            this.eachChild(child, direct);
        });
    }
    render() {
        let { className, bgClassName } = this.props;
        return React.createElement("div", { className: classNames('tv-page', bgClassName), onScroll: this.onScroll },
            React.createElement("article", { className: className }, this.props.children));
    }
}
/*
export interface PageState {
    cur?: Tab;
    tabs?: TabState[];
}
*/
let Page = class Page extends React.Component {
    constructor(props) {
        super(props);
        let { tabsProps } = props;
        if (tabsProps !== undefined) {
            this.tabsView = new TabsView(tabsProps);
        }
    }
    //private tabs:TabState[];
    /*
    constructor(props: PageProps) {
        super(props);
        let {tabs} = props;
        if (tabs === undefined || tabs.length === 0) return;
        this.tabs = tabs;
        let cur:Tab;
        let tabStates:Tab[] = [];
        for (let tab of tabs) {
            let t:TabState = _.clone(tab);
            if (cur === undefined) {
                if (t.isSelected === true)
                    cur = t;
                else
                    t.isSelected = false;
            }
            else {
                t.isSelected = false;
            }
            t.isMounted = false;
            tabStates.push(t);
        }
        this.state = {
            cur: cur,
            tabs: tabStates,
        };
    }
    */
    /*
    async componentDidMount() {
        if (this.tabs === undefined) return;
        let t0 = this.state.tabs.find(v => v.isSelected === true);
        if (t0 === undefined) {
            t0 = this.state.tabs[0];
            if (t0 === undefined) return;
        }
        await t0.load?.();
    }
    */
    /*
    private async onTabClick(tab: TabState) {
        if (tab.isSelected === true) return;
        let cur:TabState;
        let tabs = this.state.tabs;
        for (let t of tabs) {
            if (t === tab) {
                t.isSelected = true;
                cur = t;
            }
            else
                t.isSelected = false;
        }
        if (cur.isMounted !== true) {
            let {load} = cur;
            if (load !== undefined) {
                await load();
            }
        }
        this.setState({
            cur: cur,
            tabs: tabs
        });
    }

    private onTouchStart(evt: React.TouchEvent<HTMLElement>) {
    }

    private renderTabs(footer: JSX.Element) {
        const {header, back, right, keepHeader, headerClassName, tabPosition, afterBack} = this.props;
        let cur = this.state.cur;
        let tabs = <div>{
                this.state.tabs.map((tab, index) => {
                    const {icon, isSelected, title, redDot, className} = tab;
                    let img:any, redDotView:any, cn:any;
                    if (icon !== undefined) img = <img src={icon} alt="tab icon" />;
                    if (redDot !== undefined) {
                        let v = redDot.get();
                        if (v < 0) {
                            cn = classNames('red-dot', className);
                            redDotView = <u />;
                        }
                        else if (v > 0) {
                            cn = classNames('red-dot', 'num', className);
                            redDotView = <u>{v}</u>;
                        }
                    }
                    return <div key={index}
                        className= {classNames('va-tab', {cur: isSelected})}
                        onClick={() => this.onTabClick(tab)}>
                        {img}<div className={cn}>{title}{redDotView}</div>
                    </div>
                })
            }</div>;
        let pageHeader = header !== false &&
            <PageHeader
                back={back}
                center={keepHeader===true? (header as string) : (cur && (cur.header || cur.title))}
                right={right}
                className={headerClassName}
                afterBack={afterBack}
            />;

        return <article className='page-container'>
            {pageHeader}
            {tabPosition==='top' && tabs}
            <section className="position-relative">
            {this.props.sideBar}
            {
                this.state.tabs.map((tab, index) => {
                    let {isSelected, isMounted, content} = tab;
                    if (isSelected === true || isMounted === true) {
                        tab.isMounted = true;
                        return <ScrollView key={index}
                            className={classNames({invisible: isSelected===false})}
                            onScroll={tab.onScroll}
                            onScrollTop={tab.onScrollTop}
                            onScrollBottom={tab.onScrollBottom}
                        >
                            {(typeof content)==='function'? (content as ()=>JSX.Element)():content}
                        </ScrollView>;
                    }
                    return undefined;
                })
            }
            </section>
            {tabPosition!=='top' && tabs}
            {footer}
        </article>;
    }
    */
    renderSingle(footer) {
        const { back, header, right, onScroll, onScrollTop, onScrollBottom, children, headerClassName, afterBack } = this.props;
        let pageHeader = header !== false && React.createElement(PageHeader, { back: back, center: header, right: right, logout: this.props.logout, className: headerClassName, afterBack: afterBack });
        return React.createElement(ScrollView, { onScroll: onScroll, onScrollTop: onScrollTop, onScrollBottom: onScrollBottom },
            pageHeader,
            React.createElement("main", null, children),
            footer);
        /*
        return <article onTouchStart={this.onTouchStart}>
            <section className="vpage-header">
                {pageHeader}
            </section>
            <section className="position-relative vpage-body">
                {this.props.sideBar}
                <ScrollView
                    onScroll={onScroll}
                    onScrollTop={onScrollTop}
                    onScrollBottom={onScrollBottom}
                >
                    {pageHeader}
                    {children}
                    {footer}
                </ScrollView>
            </section>
            <section className="vpage-footer">
                {footer}
            </section>
        </article>;
        */
    }
    renderHeader() {
        const { back, header, right, headerClassName, afterBack } = this.props;
        let pageHeader = header !== false && React.createElement(PageHeader, { back: back, center: header, right: right, logout: this.props.logout, className: headerClassName, afterBack: afterBack });
        return pageHeader;
    }
    renderFooter() {
        const { footer } = this.props;
        //let elTabs = this.tabsView === undefined? undefined : this.tabsView.footerTabs();
        if (footer) {
            let elFooter = React.createElement("footer", null, footer);
            return React.createElement(React.Fragment, null,
                React.createElement("section", { className: "tv-page-footer" }, elFooter),
                elFooter);
        }
    }
    render() {
        const { onScroll, onScrollTop, onScrollBottom, children, tabsProps, className, bgClassName } = this.props;
        if (tabsProps === undefined) {
            return React.createElement(ScrollView, { onScroll: onScroll, onScrollTop: onScrollTop, onScrollBottom: onScrollBottom, className: className, bgClassName: bgClassName },
                this.renderHeader(),
                React.createElement("main", null, children),
                this.renderFooter());
        }
        return React.createElement(this.tabsView.content, null);
    }
};
Page = __decorate([
    observer
], Page);
export { Page };
//# sourceMappingURL=page.js.map