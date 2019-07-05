/// <reference types="react" />
import { VEntity } from '../CVEntity';
import { Sheet } from '../../uqs';
import { SheetUI, CSheet } from './cSheet';
export declare class VSheetSchema extends VEntity<Sheet, SheetUI, CSheet> {
    open(param?: any): Promise<void>;
    protected view: () => JSX.Element;
}
