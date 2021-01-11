import { makeObservable, observable } from "mobx";
import { centerApi, Controller, UqApi, UqMan } from "tonva-react";
import { VRoleAdmin } from "./VRoleAdmin";

export interface UserRole {
	user:number; 
	roles:boolean[];
	isDeleted?: boolean;
}

export class CRoleAdmin extends Controller {
	private readonly uqApi: UqApi;
	readonly allRoles: string[];
	readonly roleCaptions: string[];
	//admins: UserRole[] = null;
	meRoles: UserRole = null;
	userRoles: UserRole[] = null;
	private myRolesChanged:(roles:string[])=>void;

	constructor(res:any, uq:UqMan, myRolesChanged?:(roles:string[])=>void, roleCaptionMap?:{[role:string]:string}) {
		super(res);
		makeObservable(this, {
			meRoles: observable,
			userRoles: observable,
		});
		this.uqApi = uq.uqApi;
		this.allRoles = uq.allRoles;
		this.myRolesChanged = myRolesChanged;
		if (roleCaptionMap) {
			this.roleCaptions = this.allRoles.map(v => roleCaptionMap[v] || v);
		}
		else {
			this.roleCaptions = this.allRoles;
		}
	}

	protected async internalStart() {
		let allUserRoles = await this.uqApi.getAllRoleUsers();
		let arr:string[] = this.allRoles.map(v => `|${v}|`);
		function rolesBool(t:string): boolean[] {
			if (!t) return arr.map(v => false);
			return arr.map(v => t.indexOf(v) >= 0);
		}
		this.userRoles = [];
		let meId = this.user.id;
		for (let ur of allUserRoles) {
			let {user, roles} = ur;
			let item:UserRole = ur as any;
			item.roles = rolesBool(roles);
			if (user === meId)
				this.meRoles = item;
			else
				this.userRoles.push(item);
		}
		this.openVPage(VRoleAdmin);
	}
	async setUserRole(checked:boolean, iRole:number, userRole:UserRole) {
		let {roles} = userRole;
		let len = roles.length;
		let text:string = '';
		for (let i=0; i<len; i++) {
			let yes = i===iRole? checked : roles[i];
			if (yes === true) text += '|' + this.allRoles[i];
		}
		text += '|';
		await this.uqApi.setUserRoles(userRole.user, text);
		roles[iRole] = checked;
		if (this.myRolesChanged) {
			if (userRole === this.meRoles) {
				let roleNames:string[] = ['$'];
				for (let i=0; i<roles.length; i++) {
					if (roles[i] === true) roleNames.push(this.allRoles[i]);
				}
				this.myRolesChanged(roleNames);
			}
		}
	}

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
		let roles: string;
		if (this.isMe(user) === true) {
			if (this.meRoles) {
				this.meRoles.isDeleted = false;
			}
			else {
				this.meRoles = {
					user,
					roles:  this.allRoles.map(v => false)
				};	
			}
		}
		else {
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
					roles: this.allRoles.map(v => false),
				};
				this.userRoles.push(userRole);
				roles = '';
			}
		}
		await this.uqApi.setUserRoles(user, roles);
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
		await this.uqApi.setUserRoles(user, roles);
	}
}
