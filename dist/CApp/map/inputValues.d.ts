import { VEntity } from '../CVEntity';
import { MapUI, CMap } from './cMap';
import { Map } from '../../uq';
export declare class VInputValues extends VEntity<Map, MapUI, CMap> {
    private vForm;
    open(param?: any): Promise<void>;
    private onValuesSubmit;
    private view;
}
