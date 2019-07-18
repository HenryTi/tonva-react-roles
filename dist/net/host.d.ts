export declare const isDevelopment: boolean;
declare class Host {
    testing: boolean;
    url: string;
    ws: string;
    resHost: string;
    start(testing: boolean): Promise<void>;
    private debugHostUrl;
    private tryLocal;
    private getCenterHost;
    private getResHost;
    getUrlOrDebug(url: string, urlDebug: string): string;
    getUrlOrDebugOrTest(db: string, url: string, urlTest: string, urlDebug: string): string;
    localCheck(urlDebug: string): Promise<boolean>;
}
export declare const host: Host;
export {};
