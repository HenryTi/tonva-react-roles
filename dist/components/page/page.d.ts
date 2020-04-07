import * as React from 'react';
import { TabsProps } from './tabs';
export declare class Scroller {
    private el;
    constructor(el: HTMLBaseElement);
    scrollToTop(): void;
    scrollToBottom(): void;
}
export interface ScrollProps {
    onScroll?: (e: any) => void;
    onScrollTop?: (scroller: Scroller) => void;
    onScrollBottom?: (scroller: Scroller) => void;
}
export interface PageProps extends ScrollProps {
    back?: 'close' | 'back' | 'none';
    header?: boolean | string | JSX.Element;
    keepHeader?: boolean;
    right?: JSX.Element;
    sideBar?: JSX.Element;
    footer?: JSX.Element;
    logout?: boolean | (() => Promise<void>);
    headerClassName?: string;
    afterBack?: () => void;
    tabsProps?: TabsProps;
}
export declare class Page extends React.Component<PageProps> {
    private tabsView;
    constructor(props: PageProps);
    private renderSingle;
    private renderHeader;
    private renderFooter;
    render(): JSX.Element;
}
