/// <reference types="react" />
import { VPage } from "tonva-react";
import { CRoleAdmin } from "./CRoleAdmin";
export declare class VRoleAdmin extends VPage<CRoleAdmin> {
    header(): string;
    content(): JSX.Element;
    private renderItem;
    private renderAdmin;
    private onRoleChange;
}
