import { CEntity, EntityUI } from '../CVEntity';
import { Pending } from '../../uq';
import { VPendingMain } from './vPendingMain';
export interface PendingUI extends EntityUI {
    CPending?: typeof CPending;
    main: typeof VPendingMain;
}
export declare class CPending extends CEntity<Pending, PendingUI> {
    protected internalStart(): Promise<void>;
    protected get VPendingMain(): typeof VPendingMain;
}
