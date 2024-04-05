import {post} from '@/utils/http'

export const  SelectOwnerCargoApi=(body)=>{return post("/Base/OwnerCargo/Select",body)};

export const  SelectCargoApi=(body)=>{return post("/Base/Cargo/Select",body)};

export const  SelectCustomerApi=(body)=>{return post("/Base/Customer/Select",body)};

