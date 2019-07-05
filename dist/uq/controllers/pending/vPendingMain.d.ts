/// <reference types="react" />
import { Pending } from '../../uqs';
import { VEntity } from '../CVEntity';
import { CPending, PendingUI } from './cPending';
export declare class VPendingMain extends VEntity<Pending, PendingUI, CPending> {
    open(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
