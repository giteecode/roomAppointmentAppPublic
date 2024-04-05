import {post} from '@/utils/http'


export const  CustomerListApi=(body)=>{return post("/Base/Customer/List",body)};

export const  CustomerDeleteApi=(body)=>{return post("/Base/Customer/Delete",body)};

export const  CreateCustomerApi=(body)=>{return post("/Base/Customer/Create",body)};

export const  EditCustomerApi=(body)=>{return post("/Base/Customer/Edit",body)};

export const  GetCustomerApi=(body)=>{return post("/Base/Customer/Get",body)};
