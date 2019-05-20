import * as React from 'react';
export interface Action {
    icon?: string;
    caption?: string;
    action?: () => void;
}
export interface DropdownActionsProps {
    icon?: string;
    actions: Action[];
    isRight?: boolean;
}
export interface DropdownActionsState {
    dropdownOpen: boolean;
}
export declare class DropdownActions extends React.Component<DropdownActionsProps, DropdownActionsState> {
    private menu;
    private button;
    constructor(props: DropdownActionsProps);
    componentWillMount(): void;
    componentWillUnmount(): void;
    private handleDocumentClick;
    private toggle;
    render(): JSX.Element;
}
