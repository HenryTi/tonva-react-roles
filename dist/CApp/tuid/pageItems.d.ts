import { PageItems } from '../../tool';
import { Tuid } from '../../uq';
export declare class TuidPageItems<T> extends PageItems<T> {
    private tuid;
    constructor(tuid: Tuid);
    protected load(param: any, pageStart: any, pageSize: number): Promise<any[]>;
    protected setPageStart(item: any): void;
}
