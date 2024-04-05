import { post } from '@/utils/http'



export const CreateOrEditUserApi = (body) => { return post("/Comm/Identitys/CreateOrEdit", body) };

export const UserList = (body) => { return post("/Comm/Identitys/List", body) };

export const UserDeleteApi = (body) => { return post("/Comm/Identitys/Delete", body) };

export const UserEditApi = (body) => { return post("/Comm/Identitys/Edit", body) };

export const UserGetApi = (body) => { return post("/Comm/Identitys/Get", body) };

export const UserGetEditInfoApi = (body) => { return post("/Comm/Identitys/GetEditInfo", body) };

export const UserSignIn = (body) => { return post("/Comm/Identitys/SignIn", body) };

export const UserSignOut = (body) => { return post("/Comm/Identitys/SignOut", body) };

export const UserRegisterApi = (body) => { return post("/Comm/Identitys/Register", body) };

export const UserEditPasswordApi = (body) => { return post("/Comm/Identitys/EditPassword", body) };






export const UserHome = (body) => { return post("/Comm/Identitys/Home", body) };

export const ChangeTenantApi = (body) => { return post("/Comm/Identitys/ChangeTenant", body) };




export const RoleListApi = (body) => { return post("/Comm/Roles/List", body) };

export const RoleDeleteApi = (body) => { return post("/Comm/Roles/Delete", body) };

export const CreateOrEditRoleApi = (body) => { return post("/Comm/Roles/CreateOrEdit", body) };

export const RoleGetApi = (body) => { return post("/Comm/Roles/Get", body) };




export const GetAllMenuTreeApi = (body) => { return post("/Comm/Menu/GetAllMenuTree", body) };

export const MenuAddApi = (body) => { return post("/Comm/Menu/Add", body) };

export const GetMenuApi = (body) => { return post("/Comm/Menu/Get", body) };


export const MenuDeleteApi = (body) => { return post("/Comm/Menu/Delete", body) };

export const MenuEditApi = (body) => { return post("/Comm/Menu/Edit", body) };




export const OrganizationTreeApi = (body) => { return post("/Comm/Organization/List", body) };

export const GetOrganizationApi = (body) => { return post("/Comm/Organization/Get", body) };

export const OrganizationAddApi = (body) => { return post("/Comm/Organization/Add", body) };

export const OrganizationEditApi = (body) => { return post("/Comm/Organization/Edit", body) };

export const OrganizationDeleteApi = (body) => { return post("/Comm/Organization/Delete", body) };










