import * as React from 'react';
export interface PageHeaderProps {
    back?: 'back' | 'close' | 'none';
    center: string | JSX.Element;
    right?: JSX.Element;
    logout?: boolean | (() => Promise<void>);
    className?: string;
    afterBack?: () => void;
    ex?: JSX.Element;
}
export declare class PageHeader extends React.Component<PageHeaderProps> {
    private back;
    openWindow(): void;
    private logoutClick;
    private logout;
    render(): JSX.Element;
}
