import * as React from 'react';
import _ from 'lodash';
import {nav, Page, resOptions} from '../components';
import { User, env } from '../tool';
import { VPage } from './vpage';
import { View } from './view';

export interface ConfirmOptions {
    caption?: string;
    message: string | JSX.Element;
    classNames?: string;
    ok?: string;
    yes?: string;
    no?: string;
}

export abstract class Controller {
    readonly res: any;
	readonly x: any;
	private _t: any = {};
	readonly t: (str:string)=>any;
    icon: string|JSX.Element;
    label:string;
    readonly isDev:boolean = env.isDevelopment;
    get user():User {return nav.user}
    get isLogined():boolean {
        let {user} = nav;
        if (user === undefined) return false;
        return user.id > 0;
    }
    constructor(res:any) {
        this.res = res || {};
		this.x = this.res.x || {};
		this.t = (str:string):any => this.internalT(str) || str;
	}

	init() {}

	internalT(str:string):any {
		return this._t[str];
	}
	
	protected setRes(res:any) {
		if (res === undefined) return;
		let {$lang, $district} = resOptions;
		_.merge(this._t, res);
		if ($lang !== undefined) {
			let l = res[$lang];
			if (l !== undefined) {
				_.merge(this._t, l);
				let d = l[$district];
				if (d !== undefined) {
					_.merge(this._t, d);
				}
			}
		}		
	}

    private receiveHandlerId:number;
    private disposer:()=>void;

    private dispose() {
        // message listener的清理
        nav.unregisterReceiveHandler(this.receiveHandlerId);
        this.onDispose();
    }

    protected onDispose() {
    }

    protected async openVPage<C extends Controller>(vp: new (controller: C)=>VPage<C>, param?:any):Promise<void> {
        await (new vp((this as any) as C)).open(param);
    }

    protected renderView<C extends Controller>(view: new (controller: C)=>View<C>, param?:any) {
        return (new view((this as any) as C)).render(param);
    }

    async event(type:string, value:any) {
        await this.onEvent(type, value);
    }

    protected async onEvent(type:string, value:any) {
    }

    protected msg(text:string) {
        alert(text);
    }
    protected errorPage(header:string, err:any) {
        this.openPage(<Page header="App error!">
            <pre>
                {typeof err === 'string'? err : err.message}
            </pre>
        </Page>);
    }

    protected onMessage(message:any):Promise<void> {
        return;
    }

    private onMessageReceive = async (message:any):Promise<void> => {
        await this.onMessage(message);
    }

    protected async beforeStart():Promise<boolean> {
        /*
        console.log('this.receiveHandlerId = nav.registerReceiveHandler(this.onMessageReceive);');
        this.receiveHandlerId = nav.registerReceiveHandler(this.onMessageReceive);
        console.log('return true');
        */
        return true;
    }
    protected registerReceiveHandler() {
        this.receiveHandlerId = nav.registerReceiveHandler(this.onMessageReceive);
    }

    protected abstract internalStart(param?:any, ...params:any[]):Promise<void>;
    async start(param?:any, ...params:any[]):Promise<void> {
        this.disposer = this.dispose.bind(this);
        this.registerReceiveHandler();
        let ret = await this.beforeStart();
        if (ret === false) return;
        await this.internalStart(param, ...params);
    }

    get isCalling():boolean {return this._resolve_$ !== undefined}

    private _resolve_$:((value:any) => void)[];
    async call<T>(param?:any, ...params:any[]):Promise<T> {
        if (this._resolve_$ === undefined) this._resolve_$ = [];
        return new Promise<T> (async (resolve, reject) => {
            this._resolve_$.push(resolve);
            await this.start(param, ...params);
        });
    }

    async vCall<C extends Controller>(vp: new (controller: C)=>VPage<C>, param?:any):Promise<any> {
        if (this._resolve_$ === undefined) this._resolve_$ = [];
        return new Promise<any> (async (resolve, reject) => {
            this._resolve_$.push(resolve);
            await (new vp(this as any)).open(param);
        });
    }

    returnCall(value:any) {
        if (this._resolve_$ === undefined) return;
        let resolve = this._resolve_$.pop();
        if (resolve === undefined) {
            alert('the Controller call already returned, or not called');
            return;
        }
        resolve(value);
    }

    openPage(page:JSX.Element) {
        nav.push(page, this.disposer);
        this.disposer = undefined;
    }

    replacePage(page:JSX.Element) {
        nav.replace(page, this.disposer);
        this.disposer = undefined;
    }

    backPage() {
        nav.back();
    }

    closePage(level?:number) {
        nav.pop(level);
    }

    ceasePage(level?:number) {
        nav.ceaseTop(level);
    }

    removeCeased() {
        nav.removeCeased();
    }

    regConfirmClose(confirmClose: ()=>Promise<boolean>) {
        nav.regConfirmClose(confirmClose);
    }

    async confirm(options: ConfirmOptions): Promise<'ok'|'yes'|'no'|undefined> {
        return new Promise<'ok'|'yes'|'no'|undefined> (async (resolve, reject) => {
            let {caption, message, ok, yes, no, classNames} = options;
            let close = (res:'ok'|'yes'|'no'|undefined) => {
                this.closePage();
                resolve(res);
            }
            let buttons:any[] = [];
            if (ok !== undefined) {
                buttons.push(<button key="ok" className="btn btn-primary mr-3" onClick={()=>close('ok')}>{ok}</button>);
            }
            if (yes !== undefined) {
                buttons.push(<button key="yes" className="btn btn-success mr-3" onClick={()=>close('yes')}>{yes}</button>);
            }
            if (no !== undefined) {
                buttons.push(<button key="no" className="btn btn-outline-danger mr-3" onClick={()=>close('no')}>{no}</button>);
            }
            this.openPage(<Page header={caption || '请确认'} back="close">
                <div className={classNames || "rounded bg-white m-5 p-3 border"}>
                    <div className="d-flex align-items-center justify-content-center">
                        {message}
                    </div>
                    <div className="mt-3 d-flex align-items-center justify-content-center">
                        {buttons}
                    </div>
                </div>
            </Page>);
            nav.regConfirmClose(async ():Promise<boolean> => {
                resolve(undefined);
                return true;
            });
        });
    }
}
