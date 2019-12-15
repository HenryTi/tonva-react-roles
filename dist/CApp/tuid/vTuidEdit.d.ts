/// <reference types="react" />
import { VEntity } from '../CVEntity';
import { CTuidMain, TuidUI } from './cTuid';
import { Tuid } from '../../uq';
export declare type TypeVTuidEdit = typeof VTuidEdit;
export declare class VTuidEdit extends VEntity<Tuid, TuidUI, CTuidMain> {
    private vForm;
    private id;
    open(param?: any): Promise<void>;
    protected get editView(): () => JSX.Element;
    protected next: () => Promise<void>;
    protected finish: () => void;
    protected resetForm(): void;
    protected onSubmit: () => Promise<void>;
}
