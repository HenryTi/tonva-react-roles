import { Controller, UqApi, UqMan } from "tonva-react";
import { VRoleAdmin } from "./VRoleAdmin";

export interface UserRole {
	user:number; 
	admin:number; 
	roles:boolean[];
	isMe?: boolean;
}

export class CRoleAdmin extends Controller {
	private readonly uq: UqMan;
	private readonly uqApi: UqApi;
	readonly allRoles: string[];
	readonly roleCaptions: string[];
	admins: UserRole[];
	userRoles: UserRole[];

	constructor(res:any, uq:UqMan, roleCaptionMap?:{[role:string]:string}) {
		super(res);
		this.uq = uq;
		this.uqApi = uq.uqApi;
		this.allRoles = uq.allRoles;
		if (roleCaptionMap) {
			this.roleCaptions = this.allRoles.map(v => roleCaptionMap[v] || v);
		}
		else {
			this.roleCaptions = this.allRoles;
		}
	}

	protected async internalStart() {
		let allUserRoles = await this.uqApi.getAllRoleUsers();
		this.admins = [];
		this.userRoles = [];
		let arr:string[] = this.allRoles.map(v => `|${v}|`);
		function rolesBool(t:string): boolean[] {
			return arr.map(v => t.indexOf(v) >= 0);
		}
		for (let ur of allUserRoles) {
			let {admin, roles} = ur;
			if (admin === 0) {
				let item:UserRole = ur as any;
				item.roles = rolesBool(roles);
				this.userRoles.push(item);
			}
			else {
				(ur as any).isMe = ur.user === this.user.id;
				let item:UserRole = ur as any;
				this.admins.push(item);
			}
		}
		this.openVPage(VRoleAdmin);
	}
	async setUserRole(checked:boolean, iRole:number, user:number) {
		let userRole = this.userRoles.find(v => v.user === user);
		let {roles} = userRole;
		let len = roles.length;
		let text:string = '';
		for (let i=0; i<len; i++) {
			let yes = i===iRole? checked : roles[i];
			if (yes === true) text += '|' + this.allRoles[i];
		}
		text += '|';
		await this.uqApi.setUserRoles(user, 0, text);
		roles[iRole] = checked;
	}
}
