export declare abstract class Caller<T> {
    protected readonly _params: T;
    constructor(params: T, waiting: boolean);
    protected readonly params: any;
    buildParams(): any;
    method: string;
    abstract readonly path: string;
    readonly headers: {
        [header: string]: string;
    };
    waiting: boolean;
}
