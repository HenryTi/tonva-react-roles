import * as React from 'react';
import {FetchError} from '../net/fetchError';
import { refetchApi } from '../net';
import { Page } from './page';
import { nav } from './nav';
import { FA } from './simple';

export interface FetchErrorProps extends FetchError {
    clearError: ()=>void
}

export default class FetchErrorView extends React.Component<FetchErrorProps, null> {
    private reApi = async () => {
        this.props.clearError();
        const {channel, url, options, resolve, reject} = this.props;
        await refetchApi(channel, url, options, resolve, reject);
    }
    private close = async () => {
        this.props.clearError();
    }
    render() {
        let {error, url, type} = this.props;
        let buttons: any;
        let errContent:any;
        let errText: string;
        if (typeof error === 'object') {
            errText = '网络遇到问题';
            let err = [];
            for (let i in error) {
                err.push(<div key={i} className="form-group row">
                    <label className="col-sm-2 col-form-label">{i}</label>
                    <div className="col-sm-10 col-form-label" style={{wordWrap:"break-word"}}>{error[i]}</div>
                </div>);
            }
            errContent = <div className="p-3">{err}</div>;
        }
        else {
            errText = error;
        }
        if (type === 'message') {
            buttons = <button className="btn btn-outline-primary mr-3" onClick={()=>{
                nav.resetAll()
            }}>升级权限</button>
        }
        else {
            buttons = <>
                <button className="btn btn-outline-primary mr-3" type='button' onClick={this.reApi}>重新访问</button>
                <button className="btn btn-outline-primary" type='button' onClick={this.close}>关闭</button>
            </>;
        }
        let divErr = <>
            <div className="p-3 bg-white">
                <div className="">
                    <FA className="text-danger" name="exclamation-circle" size="lg" />&nbsp; {errText}
                </div>
                <div className="text-info" style={{wordWrap:"break-word"}}>{url}</div>
                <div className="pt-3">{buttons}</div>
            </div>
            {errContent}
        </>;
        return <li>
            <article className="page-container">
                <section>
                    <div className="">
                        {divErr}
                    </div>
                </section>
            </article>
        </li>;
    }
}

export const SystemNotifyPage = ({message}:{message:string}):JSX.Element => {
    return <Page header="系统提醒">
        <div className="px-3">{message}</div>
    </Page>;
}