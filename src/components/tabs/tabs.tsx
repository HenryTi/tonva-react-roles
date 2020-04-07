import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { IObservableValue } from 'mobx/lib/internal';
import '../../css/va-tab.css';

export type TabCaption = (selected:boolean) => JSX.Element;

export interface TabProp {
    name: string;
    caption: TabCaption;
    content: () => JSX.Element;
    notify?: IObservableValue<number>;
    load?: () => Promise<void>;
    onShown?: () => Promise<void>;
}

export interface TabsProps {
    tabs: TabProp[];
    tabPosition?: 'top' | 'bottom';
    size?: 'sm' | 'lg' | 'md';
    tabBg?: string;
    contentBg?: string;
    sep?: string;
    selected?: string;
    borderColor?: string;
    borderWidth?: string;
}

class Tab {
    name: string;
    @observable selected: boolean;
    caption: TabCaption;
    contentBuilder: ()=>JSX.Element;
    notify: IObservableValue<number>;
    load?: () => Promise<void>;
    onShown?: () => Promise<void>;

    private _content: JSX.Element;
    
    get content(): JSX.Element {
        if (this.selected !== true) return this._content;
        if (this._content !== undefined) return this._content;
        return this._content = this.contentBuilder();
    }

    async shown() {
        if (this.onShown !== undefined) {
            await this.onShown();
        }
        if (this._content !== undefined) return;
        if (this.load !== undefined) {
            await this.load();
        }
    }
}

export const TabCaptionComponent = (label:string, icon:string, color:string) => <div 
    className={'d-flex justify-content-center align-items-center flex-column cursor-pointer ' + color}>
    <div><i className={'fa fa-lg fa-' + icon} /></div>
    <small><small>{label}</small></small>
</div>;

@observer export class Tabs extends React.Component<TabsProps> {
    private size: string;
    private tabBg: string;
    private contentBg: string;
    private sep: string;
    @observable private selectedTab: Tab;
    @observable private tabs: Tab[];

    constructor(props: TabsProps) {
        super(props);
        let {size, tabs, tabBg: tabBack, contentBg: contentBack, sep, selected} = this.props;
        this.size = size || 'md';
        this.tabs = tabs.map(v => {
            let tab = new Tab();
            let {name, caption, content, notify, load, onShown} = v;
            tab.name = name;
            tab.selected = false;
            tab.caption = caption;
            tab.contentBuilder = content;
            tab.notify = notify;
            tab.load = load;
            tab.onShown = onShown;
            return tab;
        });
        this.tabBg = tabBack; // || 'bg-light';
        this.contentBg = contentBack;
        this.sep = sep; // || 'border-top border-gray';
        if (selected !== undefined) {
            this.selectedTab = this.tabs.find(v => v.name === selected);
        }
        if (this.selectedTab === undefined) this.selectedTab = this.tabs[0];
        this.selectedTab.selected = true;
    }
    async componentDidMount() {
        if (this.tabs === undefined) return;
        if (this.tabs.length === 0) return;
        let tab = this.tabs[0];
        await tab.shown();
    }

    private tabClick = async (tab:Tab) => {
        await tab.shown();
        this.selectedTab.selected = false;
        tab.selected = true;
        this.selectedTab = tab;
    }

    showTab(tabName: string) {
        let tab = this.tabs.find(v => v.name === tabName);
        if (tab === undefined) return;
        if (this.selectedTab !== undefined) this.selectedTab.selected = false;
        tab.selected = true;
        this.selectedTab = tab;
    }

    render() {
        let {tabPosition, borderColor} = this.props;
        let bsCur:React.CSSProperties, bsTab:React.CSSProperties
        if (borderColor) {
            bsCur = {
                borderColor: borderColor,
                borderStyle: 'solid',
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: 1,
            }
            bsTab = {
                borderColor: borderColor,
                borderStyle: 'solid',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderLeftWidth: 0,
                borderRightWidth: 0,
            }
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

		/*
		let cnContainer = classNames(
			tabPosition==='top'? 'tv-page-header':'tv-page-footer'
		);
		*/
		let cn = classNames('tv-tabs', this.tabBg, this.sep, 'tv-tabs-' + this.size);

		let tabs = <div className={cn}>
            {this.tabs.map((v,index) => {
                let {selected, caption, notify} = v;
                let notifyCircle:any;
                if (notify !== undefined) {
                    let num = notify.get();
                    if (num !== undefined) {
                        if (num > 0) notifyCircle = <u>{num>99?'99+':num}</u>;
                        else if (num < 0) notifyCircle = <u className="dot" />;
                    }
                }
                return <div key={index} onClick={()=>this.tabClick(v)} style={selected===true? bsCur:bsTab}>
					{notifyCircle}
					{caption(selected)}
                </div>
            })}
		</div>;

		let cnContainer:string, header:any, footer:any;
		let visibility:React.CSSProperties = {visibility:'hidden'};
		if (tabPosition === 'top') {
			cnContainer = 'tv-page-header';
			header = <>
				<section className={cnContainer}>
					<header>{tabs}</header>
				</section>
				<header style={visibility}>{tabs}</header>
			</>;
		}
		else {
			cnContainer = 'tv-page-footer';
			footer = <>
				<footer style={visibility}>{tabs}</footer>
				<section className={cnContainer}>
					<footer>{tabs}</footer>
				</section>
			</>;
		}

		let displayNone:React.CSSProperties = {display: 'none'};
		let content = <ul className="va">
			{this.tabs.map((v,index) => {
				let style:React.CSSProperties;
				if (v.selected===false) style = displayNone;
				return <li key={index} className={classNames(this.contentBg)} style={style}>
					<article>
						{header}
						{v.content}
						{footer}
					</article>
				</li>
			})}
		</ul>;
		return content;
		/*
        return <article>
			{content}
			<section className={cnContainer}>
				{tabs}
			</section>
		</article>
		*/
    }
};
/*
{
	tabPosition === 'top'? 
		<>{tabs}{content}</> :
		<>{content}{tabs}</>
}
*/