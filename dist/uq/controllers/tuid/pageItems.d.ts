import { PageItems } from '../../../tool/pageItems';
import { Tuid } from '../../uqs';
export declare class TuidPageItems<T> extends PageItems<T> {
    private tuid;
    constructor(tuid: Tuid);
    protected load(param: any, pageStart: any, pageSize: number): Promise<any[]>;
    protected setPageStart(item: any): void;
}
