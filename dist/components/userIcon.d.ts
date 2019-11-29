import * as React from 'react';
export interface UserIconProps {
    id: number;
    className?: string;
    style?: React.CSSProperties;
    altImage?: string;
    noneImage?: any;
}
export declare const UserIcon: (props: UserIconProps) => JSX.Element;
