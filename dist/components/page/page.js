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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { PageHeader } from './pageHeader';
import { TabsView } from './tabs';
var scrollAfter = 20; // 20ms之后，scroll执行
var Scroller = /** @class */ (function () {
    function Scroller(el) {
        this.el = el;
    }
    Scroller.prototype.scrollToTop = function () {
        var _this = this;
        setTimeout(function () { return _this.el.scrollTo(0, 0); }, scrollAfter);
    };
    Scroller.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () { return _this.el.scrollTo(0, _this.el.scrollTop + _this.el.offsetHeight); }, scrollAfter);
    };
    return Scroller;
}());
export { Scroller };
var scrollTimeGap = 100;
var ScrollView = /** @class */ (function (_super) {
    __extends(ScrollView, _super);
    function ScrollView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bottomTime = 0;
        _this.topTime = 0;
        _this.onScroll = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var _a, onScroll, onScrollTop, onScrollBottom, el, scroller, topTime, bottomTime;
            return __generator(this, function (_b) {
                _a = this.props, onScroll = _a.onScroll, onScrollTop = _a.onScrollTop, onScrollBottom = _a.onScrollBottom;
                if (onScroll)
                    this.props.onScroll(e);
                el = e.target;
                scroller = new Scroller(el);
                if (el.scrollTop < 30) {
                    //this.eachChild(this, 'top');
                    if (onScrollTop !== undefined) {
                        topTime = new Date().getTime();
                        if (topTime - this.topTime > scrollTimeGap) {
                            this.topTime = topTime;
                            onScrollTop(scroller);
                        }
                    }
                }
                if (el.scrollTop + el.offsetHeight > el.scrollHeight - 30) {
                    //this.eachChild(this, 'bottom');
                    if (onScrollBottom !== undefined) {
                        bottomTime = new Date().getTime();
                        if (bottomTime - this.bottomTime > scrollTimeGap) {
                            this.bottomTime = bottomTime;
                            onScrollBottom(scroller);
                        }
                    }
                }
                return [2 /*return*/];
            });
        }); };
        return _this;
    }
    ScrollView.prototype.eachChild = function (c, direct) {
        var _this = this;
        var props = c.props;
        if (props === undefined)
            return;
        var children = props.children;
        if (children === undefined)
            return;
        React.Children.forEach(children, function (child, index) {
            var _$scroll = child._$scroll;
            if (_$scroll)
                _$scroll(direct);
            console.log(child.toString());
            _this.eachChild(child, direct);
        });
    };
    ScrollView.prototype.render = function () {
        var _a = this.props, className = _a.className, bgClassName = _a.bgClassName;
        return React.createElement("div", { className: classNames('tv-page', bgClassName), onScroll: this.onScroll },
            React.createElement("article", { className: className }, this.props.children));
    };
    return ScrollView;
}(React.Component));
/*
export interface PageState {
    cur?: Tab;
    tabs?: TabState[];
}
*/
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page(props) {
        var _this = _super.call(this, props) || this;
        var tabsProps = props.tabsProps;
        if (tabsProps !== undefined) {
            _this.tabsView = new TabsView(tabsProps);
        }
        return _this;
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
    Page.prototype.renderSingle = function (footer) {
        var _a = this.props, back = _a.back, header = _a.header, right = _a.right, onScroll = _a.onScroll, onScrollTop = _a.onScrollTop, onScrollBottom = _a.onScrollBottom, children = _a.children, headerClassName = _a.headerClassName, afterBack = _a.afterBack;
        var pageHeader = header !== false && React.createElement(PageHeader, { back: back, center: header, right: right, logout: this.props.logout, className: headerClassName, afterBack: afterBack });
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
    };
    Page.prototype.renderHeader = function () {
        var _a = this.props, back = _a.back, header = _a.header, right = _a.right, headerClassName = _a.headerClassName, afterBack = _a.afterBack;
        var pageHeader = header !== false && React.createElement(PageHeader, { back: back, center: header, right: right, logout: this.props.logout, className: headerClassName, afterBack: afterBack });
        return pageHeader;
    };
    Page.prototype.renderFooter = function () {
        var footer = this.props.footer;
        //let elTabs = this.tabsView === undefined? undefined : this.tabsView.footerTabs();
        if (footer) {
            var elFooter = React.createElement("footer", null, footer);
            return React.createElement(React.Fragment, null,
                React.createElement("section", { className: "tv-page-footer" }, elFooter),
                elFooter);
        }
    };
    Page.prototype.render = function () {
        var _a = this.props, onScroll = _a.onScroll, onScrollTop = _a.onScrollTop, onScrollBottom = _a.onScrollBottom, children = _a.children, tabsProps = _a.tabsProps, className = _a.className, bgClassName = _a.bgClassName;
        if (tabsProps === undefined) {
            return React.createElement(ScrollView, { onScroll: onScroll, onScrollTop: onScrollTop, onScrollBottom: onScrollBottom, className: className, bgClassName: bgClassName },
                this.renderHeader(),
                React.createElement("main", null, children),
                this.renderFooter());
        }
        return React.createElement(this.tabsView.content, null);
    };
    Page = __decorate([
        observer
    ], Page);
    return Page;
}(React.Component));
export { Page };
//# sourceMappingURL=page.js.map