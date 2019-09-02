export declare abstract class Caller<T> {
    protected readonly params: T;
    constructor(params: T);
    buildParams(): any;
    method: string;
    abstract readonly path: string;
    readonly headers: {
        [header: string]: string;
    };
}
