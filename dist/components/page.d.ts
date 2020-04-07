import * as React from 'react';
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
    tabPosition?: 'top' | 'bottom';
    logout?: boolean | (() => Promise<void>);
    headerClassName?: string;
    afterBack?: () => void;
}
export declare class Page extends React.Component<PageProps> {
    private renderSingle;
    render(): JSX.Element;
}
