import * as React from 'react';
import { nav } from './nav';
import { Page } from './page';

interface Props {
    message: string
}

interface State {
    seconds: number
}

export class ReloadPage extends React.Component<Props, State> {
    private timerHandler:any;
    constructor(props:Props) {
        super(props);
        this.state = {seconds: 10};
        this.timerHandler = setInterval(() => {
            let seconds = this.state.seconds;
            seconds--;
            if (seconds <= 0) {
                this.reload();
            }
            else {
                this.setState({seconds: seconds});
            }
        }, 1000);
    }
    private reload = () => {
        clearInterval(this.timerHandler);
        nav.reload();
    }
    render() {
        return <Page header={false}>
            <div className="text-center p-5">
                <div className="text-info py-5">
                    程序需要升级，{this.state.seconds}秒钟之后自动重启动...
                    <br/>
                    <span className="small text-muted">{this.props.message}</span>
                </div>
                <button className="btn btn-danger" onClick={this.reload}>立刻升级</button>
            </div>
        </Page>;
    }
}
