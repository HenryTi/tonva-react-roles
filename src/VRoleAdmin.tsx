import { VPage } from "tonva-react";
import { CRoleAdmin, UserRole } from "./CRoleAdmin";

export class VRoleAdmin extends VPage<CRoleAdmin> {
	header() {return '设置用户角色'}
	content() {
		let {admins, userRoles} = this.controller;
		return <div>
			<div className="mx-3 mt-3 mb-1">管理员</div>
			<div className="d-flex bg-white border-top flex-wrap">
				{admins.map(v => this.renderAdmin(v))}
			</div>

			<div className="mx-3 mt-3 mb-1">用户</div>
			{userRoles.map(v => this.renderItem(v))}
		</div>
	}

	private renderItem = ({user, roles}:UserRole) => {
		let {roleCaptions} = this.controller;
		return <div key={user} className="d-flex bg-white border-top">
			<div className="p-3 w-12c">{this.renderUser(user)}</div>
			<div className="d-flex flex-wrap">
				{roles.map((v, i) => {
					return <label className="m-3">
						<input className="mr-2" type='checkbox' defaultChecked={v} onChange={e => this.onRoleChange(e, i, user)} />
						{roleCaptions[i]}
					</label>;
				})}
			</div>
		</div>
	}

	private renderAdmin = ({user, roles, isMe}:UserRole) => {
		let color = '', meText:any;
		if (isMe === true) {
			color = 'text-primary';
			meText = <small className="text-muted ml-1">[自己]</small>;
		}
		return <div className={'m-3 p-2 d-flex border rounded align-items-center ' + color}>
			{this.renderUser(user)} {meText}
		</div>
	}

	private async onRoleChange(event: React.ChangeEvent<HTMLInputElement>, iRole: number, user: number) {
		let {target} = event;
		target.disabled = true;
		await this.controller.setUserRole(target.checked, iRole, user);
		target.disabled = false;
	}

	/*
	private renderUser = (user:User) => {
		let {name} = user;
		return <><UserIcon id={user.id} /> {name}</>;
	}
	*/
}
