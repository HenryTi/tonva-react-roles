import { PageItems } from '../../tool';
import { Tuid } from '../../uq';
export declare class TuidPageItems<T> extends PageItems<T> {
    private tuid;
    constructor(tuid: Tuid);
    protected loadResults(param: any, pageStart: any, pageSize: number): Promise<{
        [name: string]: any[];
    }>;
    protected setPageStart(item: any): void;
}
