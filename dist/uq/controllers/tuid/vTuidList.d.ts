/// <reference types="react" />
import { Tuid } from '../../uqs';
import { VEntity } from '../CVEntity';
import { TuidUI, CTuidMain } from './cTuid';
export declare abstract class VTuidListBase extends VEntity<Tuid, TuidUI, CTuidMain> {
    protected rowContent: (row: any) => JSX.Element;
    protected ownerId: number;
    open(param?: any): Promise<void>;
    onSearch: (key: string) => Promise<void>;
    renderRow: (item: any, index: number) => JSX.Element;
    protected abstract onSelected(item: any): Promise<void>;
    private callOnSelected;
    clickRow: (item: any) => void;
    private rowKey;
    protected view: () => JSX.Element;
}
export declare class VTuidList extends VTuidListBase {
    protected onSelected(item: any): Promise<void>;
}
