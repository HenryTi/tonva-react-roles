import { Controller, UqMan } from "tonva-react";
export interface UserRole {
    user: number;
    admin: number;
    roles: boolean[];
    isMe?: boolean;
}
export declare class CRoleAdmin extends Controller {
    private readonly uq;
    private readonly uqApi;
    readonly allRoles: string[];
    readonly roleCaptions: string[];
    admins: UserRole[];
    userRoles: UserRole[];
    constructor(res: any, uq: UqMan, roleCaptionMap?: {
        [role: string]: string;
    });
    protected internalStart(): Promise<void>;
    setUserRole(checked: boolean, iRole: number, user: number): Promise<void>;
}
