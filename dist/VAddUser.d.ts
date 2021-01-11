/// <reference types="react" />
import { VPage } from "tonva-react";
import { CRoleAdmin } from "./CRoleAdmin";
export declare class VAddUser extends VPage<CRoleAdmin> {
    header(): string;
    content(): JSX.Element;
    private onClick;
    private onEnter;
}
