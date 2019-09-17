import * as React from 'react';
import { IObservableValue } from 'mobx/lib/internal';
import '../../css/va-tab.css';
export declare type TabCaption = (selected: boolean) => JSX.Element;
export interface TabProp {
    name: string;
    caption: TabCaption;
    content: () => JSX.Element;
    notify?: IObservableValue<number>;
    load?: () => Promise<void>;
}
export interface TabsProps {
    tabs: TabProp[];
    tabPosition?: 'top' | 'bottom';
    size?: 'sm' | 'lg' | 'md';
    tabBack?: string;
    contentBack?: string;
    sep?: string;
    selected?: string;
}
export declare const TabCaptionComponent: (label: string, icon: string, color: string) => JSX.Element;
export declare class Tabs extends React.Component<TabsProps> {
    private size;
    private tabBack;
    private contentBack;
    private sep;
    private selectedTab;
    private tabs;
    constructor(props: TabsProps);
    componentWillMount(): Promise<void>;
    private tabClick;
    showTab(tabName: string): void;
    render(): JSX.Element;
}
