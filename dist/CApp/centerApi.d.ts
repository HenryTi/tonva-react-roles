import { CenterApiBase } from '../net';
export declare class CenterApi extends CenterApiBase {
    userAppUnits(app: number): Promise<any[]>;
    userFromId(userId: number): Promise<any>;
}
export declare const centerApi: CenterApi;
