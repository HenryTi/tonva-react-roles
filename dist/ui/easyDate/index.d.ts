import * as React from 'react';
export interface EasyDateProps {
    date: Date | number;
}
export declare class EasyDate extends React.Component<EasyDateProps> {
    render(): string;
}
export declare class EasyTime extends React.Component<EasyDateProps> {
    render(): string;
}
