import { Controller, UqMan } from "tonva-react";
export interface UserRole {
    user: number;
    roles: boolean[];
    isDeleted?: boolean;
}
export declare class CRoleAdmin extends Controller {
    private readonly uqApi;
    readonly allRoles: string[];
    readonly roleCaptions: string[];
    meRoles: UserRole;
    userRoles: UserRole[];
    private myRolesChanged;
    constructor(res: any, uq: UqMan, myRolesChanged?: (roles: string[]) => void, roleCaptionMap?: {
        [role: string]: string;
    });
    protected internalStart(): Promise<void>;
    setUserRole(checked: boolean, iRole: number, userRole: UserRole): Promise<void>;
    private buildRolesText;
    newUser(userName: string): Promise<string>;
    deleteUser(userRole: UserRole): Promise<void>;
    restoreUser(userRole: UserRole): Promise<void>;
}
