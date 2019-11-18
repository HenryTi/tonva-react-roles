import * as React from 'react';
interface Props {
    message: string;
}
interface State {
    seconds: number;
}
export declare class ReloadPage extends React.Component<Props, State> {
    private timerHandler;
    constructor(props: Props);
    private reload;
    render(): JSX.Element;
}
export {};
