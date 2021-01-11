import { observer } from "mobx-react";
import { FA, LMR, VPage } from "tonva-react";
import { CRoleAdmin, UserRole } from "./CRoleAdmin";
import { VAddUser } from "./VAddUser";

export class VRoleAdmin extends VPage<CRoleAdmin> {
	header() {return '设置用户角色'}
	content() {
		let {userRoles} = this.controller;
		let VItem = observer((v:{userRole:UserRole;isMe:boolean}) => this.renderItem(v.userRole, v.isMe));
		let VUserRoles = observer(() => <>{
			userRoles.map(v => {
				return <VItem userRole={v} isMe={false} />;
			})
		}</>);
		/*
		<div className="mx-3 mt-3 mb-1">管理员</div>
		<div className="d-flex bg-white border-top flex-wrap">
			{admins.map(v => this.renderAdmin(v))}
		</div>
		*/
		let MeItem = observer(() => <VItem userRole={this.controller.meRoles} isMe={true} />);
		return <div>
			<div className="mx-3 mt-3 mb-1 d-flex align-items-end">
				<div className="mr-auto">用户角色</div>
				<button className="btn btn-sm btn-outline-primary" onClick={()=>this.openVPage(VAddUser)}><FA name="plus" /> 增加</button>
			</div>
			<MeItem />
			<VUserRoles />
		</div>;
	}

	private renderItem = (userRole: UserRole, isMe: boolean) => {
		if (!userRole) return null;
		let {user, roles, isDeleted} = userRole;
		let {roleCaptions} = this.controller;
		let onUndo = () => this.controller.restoreUser(userRole);
		let onDelete = () => this.controller.deleteUser(userRole);
		let onRightClick: () => void;
		let rightIcon:string;
		let vUser = this.renderUser(user);
		let cn = 'bg-white border-top ';
		if (isMe === true) {
			cn += 'mb-1';
			vUser = <>{vUser}<small className="ml-1 text-success">[自己]</small></>;
		}
		if (isDeleted === true) {
			onRightClick = onUndo;
			rightIcon = 'undo';
			vUser = <del>{vUser}</del>
		}
		else {
			onRightClick = onDelete;
			rightIcon = 'times';
		}
		let right = <div className="p-3 cursor-pointer text-info" onClick={onRightClick}><FA name={rightIcon} /></div>;
		return <LMR key={user} 
			className={cn}
			left = {<div className="p-3 w-12c">{vUser}</div>}
			right = {right}
			>			
			<div className="d-flex flex-wrap">
				{roles.map((v, i) => {
					let vCap:any = roleCaptions[i];
					if (isDeleted === true) vCap = <del>{vCap}</del>
					return <label className="m-3" key={i}>
						<input className="mr-2" type='checkbox' 
							disabled={isDeleted} defaultChecked={v} 
							onChange={e => this.onRoleChange(e, i, userRole)} />
						{vCap}
					</label>;
				})}
			</div>
		</LMR>;
	}
	/*
	private renderAdmin = ({user, roles, isMe}:UserRole) => {
		let color = '', meText:any;
		if (isMe === true) {
			color = 'text-primary';
			meText = <small className="text-muted ml-1">[自己]</small>;
		}
		return <div key={user} className={'m-3 p-2 d-flex border rounded align-items-center ' + color}>
			{this.renderUser(user)} {meText}
		</div>
	}
	*/

	private async onRoleChange(event: React.ChangeEvent<HTMLInputElement>, iRole: number, userRole:UserRole) {
		let {target} = event;
		target.disabled = true;
		await this.controller.setUserRole(target.checked, iRole, userRole);
		target.disabled = false;
	}

	/*
	private renderUser = (user:User) => {
		let {name} = user;
		return <><UserIcon id={user.id} /> {name}</>;
	}
	*/
}
