/// <reference types="react" />
import { PropGridProps } from './PropGrid';
import { LabeledProp, StringProp, NumberProp, ListProp, ComponentProp } from './propView';
export declare abstract class PropRow {
    setValues(values: any): void;
    abstract render(key: string): any;
}
export declare class PropBorder extends PropRow {
    render(key: string): JSX.Element;
}
export declare class PropGap extends PropRow {
    private param;
    constructor(param?: string);
    render(key: string): JSX.Element;
}
export declare abstract class LabeledPropRow extends PropRow {
    protected gridProps: PropGridProps;
    protected prop: LabeledProp;
    protected content: any;
    protected col: string;
    constructor(gridProps: PropGridProps, prop: LabeledProp);
    render(key: string): any;
    protected renderLabel(): any;
    protected renderProp(): any;
    protected renderPropBody(): any;
    protected renderPropContent(): any;
}
export declare class StringPropRow extends LabeledPropRow {
    protected prop: StringProp;
    setValues(values: any): void;
}
export declare class NumberPropRow extends LabeledPropRow {
    protected prop: NumberProp;
    setValues(values: any): void;
}
export declare class ListPropRow extends LabeledPropRow {
    protected prop: ListProp;
    setValues(values: any): void;
    protected renderPropBody(): JSX.Element;
}
export declare class ComponentPropRow extends LabeledPropRow {
    protected prop: ComponentProp;
    protected renderPropBody(): any;
    protected renderProp(): any;
}
