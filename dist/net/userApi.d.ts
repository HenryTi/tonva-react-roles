import { CenterApiBase } from '.';
export interface RegisterParameter {
    nick: string;
    user: string;
    pwd: string;
    country: number;
    mobile: number;
    mobileCountry: number;
    email: string;
    verify: string;
}
export declare class UserApi extends CenterApiBase {
    login(params: {
        user: string;
        pwd: string;
        guest: number;
    }): Promise<any>;
    register(params: RegisterParameter): Promise<any>;
    setVerify(account: string, type: 'mobile' | 'email'): Promise<any>;
    checkVerify(account: string, verify: string): Promise<any>;
    isExists(account: string): Promise<any>;
    resetPassword(account: string, password: string, verify: string, type: 'mobile' | 'email'): Promise<any>;
    userSetProp(prop: string, value: any): Promise<void>;
    me(): Promise<any>;
}
export declare const userApi: UserApi;
