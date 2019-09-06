import { Controller } from '../components';
import { CUq } from './cUq';
export declare abstract class ControllerUq extends Controller {
    constructor(cUq: CUq, res: any);
    cUq: CUq;
}
