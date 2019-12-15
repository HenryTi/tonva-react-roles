import * as React from 'react';
import { User } from '../tool';
export interface UserIconProps {
    id: number;
    className?: string;
    style?: React.CSSProperties;
    altImage?: string;
    noneImage?: any;
}
export declare const UserIcon: (props: UserIconProps) => JSX.Element;
export interface UserViewProps {
    id: number;
    render: (user: User) => JSX.Element;
}
export declare const UserView: (props: UserViewProps) => JSX.Element;
