import { Uq } from './uq';
export declare class UqApp {
    name: string;
    id: number;
    appOwner: string;
    appName: string;
    private collection;
    constructor(tonvaAppName: string);
    addUq(uq: Uq): void;
    setTuidImportsLocal(): void;
    private setLocal;
}
