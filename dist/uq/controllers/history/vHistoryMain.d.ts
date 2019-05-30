/// <reference types="react" />
import { History } from '../../uqs';
import { VEntity } from '../CVEntity';
import { CHistory, HistoryUI } from './cHistory';
export declare class VHistoryMain extends VEntity<History, HistoryUI, CHistory> {
    open(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
