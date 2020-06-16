import React from 'react';
export declare class Scroller {
    private el;
    constructor(el: HTMLBaseElement);
    scrollToTop(): void;
    scrollToBottom(): void;
}
export interface ScrollProps {
    onScroll?: (e: any) => void;
    onScrollTop?: (scroller?: Scroller) => Promise<boolean>;
    onScrollBottom?: (scroller?: Scroller) => Promise<void>;
    className?: string;
}
interface ScrollViewProps extends ScrollProps {
    className?: string;
    style?: React.CSSProperties;
}
export declare class ScrollView extends React.Component<ScrollViewProps, null> {
    private bottomTime;
    private topTime;
    private div;
    private refDiv;
    private onResize;
    private onScroll;
    private eachChild;
    render(): JSX.Element;
}
export {};
