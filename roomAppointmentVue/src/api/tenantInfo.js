import {post} from '@/utils/http'

export const  TenantListApi=(body)=>{return post("/Comm/Tenant/List",body)};

export const  TenantDeleteApi=(body)=>{return post("/Comm/Tenant/Delete",body)};

export const  CreateTenantApi=(body)=>{return post("/Comm/Tenant/Create",body)};

export const  EditTenantApi=(body)=>{return post("/Comm/Tenant/Edit",body)};

export const  GetTenantApi=(body)=>{return post("/Comm/Tenant/Get",body)};
