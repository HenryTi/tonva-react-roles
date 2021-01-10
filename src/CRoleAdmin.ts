import { makeObservable, observable } from "mobx";
import { centerApi, Controller, UqApi, UqMan } from "tonva-react";
import { VRoleAdmin } from "./VRoleAdmin";

export interface UserRole {
	user:number; 
	admin:number; 
	roles:boolean[];
	isMe?: boolean;
	isDeleted?: boolean;
}

export class CRoleAdmin extends Controller {
	private readonly uqApi: UqApi;
	readonly allRoles: string[];
	readonly roleCaptions: string[];
	admins: UserRole[] = null;
	userRoles: UserRole[] = null;

	constructor(res:any, uq:UqMan, roleCaptionMap?:{[role:string]:string}) {
		super(res);
		makeObservable(this, {
			userRoles: observable
		});
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

	/*
	async getUserId(user: string): Promise<any> {
		let ret = await centerApi.userFromKey(user);
		return ret;
	}
	*/

	private buildRolesText(userRole:UserRole) {
		let ret = userRole.roles.map((v, index) => v===true? this.allRoles[index]:'').join('|');
		return `|${ret}|`;
	}

	async newUser(userName: string): Promise<string> {
		let ret = await centerApi.userFromKey(userName);
		if (!ret) {
			return '这个用户名没有注册';
		}
		let user = ret.id;
		if (this.admins.find(v => v.user === user) !== undefined) {
			return '这个用户已经是管理员';
		}
		let roles: string;
		let userRole = this.userRoles.find(v => v.user === user);
		if (userRole) {
			if (userRole.isDeleted === true) {
				userRole.isDeleted = false;
				roles = this.buildRolesText(userRole);
			}
			else {
				return '这个用户已经是角色用户了';
			}
		}
		else {
			userRole = {
				user,
				admin: 0,
				roles: this.allRoles.map(v => false),
			};
			this.userRoles.push(userRole);
			roles = '';
		}
		await this.uqApi.setUserRoles(user, 0, roles);
	}

	async deleteUser(userRole: UserRole) {
		let {user} = userRole;
		userRole.isDeleted = true; 
		await this.uqApi.deleteUserRoles(user);
	}

	async restoreUser(userRole: UserRole) {
		let {user} = userRole;
		userRole.isDeleted = false; 
		let roles = this.buildRolesText(userRole)
		await this.uqApi.setUserRoles(user, 0, roles);
	}
}
