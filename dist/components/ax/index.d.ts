import React from "react";
export interface AxProps {
    children: React.ReactNode;
    href: string;
    onClick: (event: React.MouseEvent) => void;
    className?: string;
    aClassName?: string;
    naClassName?: string;
    target?: string;
}
export declare const Ax: (props: AxProps) => JSX.Element;
export declare const A: (props: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => JSX.Element;
