import { VField } from './vField';
import { Field } from '../../../uq';
import { VForm } from '../vForm';
import { FieldRes } from '../vBand';
export declare class VComputeField extends VField {
    constructor(form: VForm, field: Field, fieldRes: FieldRes);
    protected view: () => any;
}
