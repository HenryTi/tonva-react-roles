import * as React from 'react';
import { TabsProps } from './tabs';
import { ScrollProps } from './scrollView';
export interface IVPage {
    content(): JSX.Element;
    header(): JSX.Element;
    footer(): JSX.Element;
}
export interface PageProps extends ScrollProps {
    back?: 'close' | 'back' | 'none';
    header?: boolean | string | JSX.Element;
    right?: JSX.Element;
    footer?: JSX.Element;
    logout?: boolean | (() => Promise<void>);
    headerClassName?: string;
    className?: string;
    bgClassName?: string;
    afterBack?: () => void;
    tabsProps?: TabsProps;
}
export declare class Page extends React.Component<PageProps> {
    private tabsView;
    constructor(props: PageProps);
    private renderHeader;
    private renderFooter;
    render(): JSX.Element;
}
