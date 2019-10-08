export declare abstract class Caller<T> {
    protected readonly _params: T;
    constructor(params: T);
    protected readonly params: any;
    buildParams(): any;
    method: string;
    abstract readonly path: string;
    readonly headers: {
        [header: string]: string;
    };
}
