import * as React from 'react';
import { User } from '../tool';
export declare type UserLoader = (userId: number) => Promise<any>;
export declare class UserCache<T> {
    private loader;
    private map;
    constructor(loader: UserLoader);
    use(id: number | any): void;
    getValue(id: number | any): any;
}
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
