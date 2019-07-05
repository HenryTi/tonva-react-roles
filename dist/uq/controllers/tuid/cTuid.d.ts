/// <reference types="react" />
import { CEntity, EntityUI } from '../CVEntity';
import { Tuid } from '../../uqs';
import { VTuidMain } from './vTuidMain';
import { VTuidEdit } from './vTuidEdit';
import { VTuidSelect } from './vTuidSelect';
import { CUq } from '../cUq/cUq';
import { VTuidInfo } from './vTuidInfo';
import { VTuidList } from './vTuidList';
import { PageItems } from '../../../pageItems';
export interface TuidUI extends EntityUI {
    CTuidMain?: typeof CTuidMain;
    CTuidEdit?: typeof CTuidEdit;
    CTuidList?: typeof CTuidList;
    CTuidSelect?: typeof CTuidSelect;
    CTuidInfo?: typeof CTuidInfo;
    content?: React.StatelessComponent<any>;
    rowContent?: React.StatelessComponent<any>;
    divs?: {
        [div: string]: {
            CTuidSelect?: typeof CTuidSelect;
            content?: React.StatelessComponent<any>;
            rowContent?: React.StatelessComponent<any>;
        };
    };
}
export declare abstract class CTuid<T extends Tuid> extends CEntity<T, TuidUI> {
    PageItems: PageItems<any>;
    protected buildPageItems(): PageItems<any>;
    searchMain(key: string): Promise<void>;
    getDivItems(ownerId: number): Promise<any[]>;
}
export declare abstract class CTuidBase extends CTuid<Tuid> {
    constructor(cUq: CUq, entity: Tuid, ui: TuidUI, res: any);
    from(): CTuidBase;
    cUqFrom(): CUq;
    cEditFrom(): CTuidEdit;
    cInfoFrom(): CTuidInfo;
    cSelectFrom(): CTuidSelect;
    getLable(tuid: Tuid): string;
    isImport: boolean;
    protected readonly VTuidMain: typeof VTuidMain;
    protected readonly VTuidEdit: typeof VTuidEdit;
    protected readonly VTuidList: typeof VTuidList;
    protected internalStart(param?: any): Promise<void>;
    protected onEvent(type: string, value: any): Promise<void>;
    protected edit(values: any): Promise<void>;
    private onNew;
    private onList;
    protected onEdit(id: number): Promise<void>;
    private itemChanged;
}
export declare class CTuidMain extends CTuidBase {
    protected internalStart(param?: any): Promise<void>;
}
export declare class CTuidEdit extends CTuidBase {
    protected internalStart(id: number): Promise<void>;
    protected edit(values: any): Promise<void>;
}
export declare class CTuidList extends CTuidBase {
    protected internalStart(id: number): Promise<void>;
}
export declare class CTuidDiv extends CTuid<Tuid> {
    protected internalStart(): Promise<void>;
}
export declare class CTuidSelect extends CTuid<Tuid> {
    protected internalStart(param?: any): Promise<void>;
    protected beforeStart(): Promise<boolean>;
    protected readonly VTuidSelect: typeof VTuidSelect;
    idFromItem(item: any): any;
}
export declare class CTuidInfo extends CTuid<Tuid> {
    protected internalStart(id: any): Promise<void>;
    protected readonly VTuidInfo: typeof VTuidInfo;
}
