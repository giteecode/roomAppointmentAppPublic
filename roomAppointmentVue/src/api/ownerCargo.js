import {post} from '@/utils/http'


export const  OwnerCargoListApi=(body)=>{return post("/Base/OwnerCargo/List",body)};

export const  OwnerCargoDeleteApi=(body)=>{return post("/Base/OwnerCargo/Delete",body)};

export const  CreateOwnerCargoApi=(body)=>{return post("/Base/OwnerCargo/Create",body)};

export const  EditOwnerCargoApi=(body)=>{return post("/Base/OwnerCargo/Edit",body)};

export const  GetOwnerCargoApi=(body)=>{return post("/Base/OwnerCargo/Get",body)};
