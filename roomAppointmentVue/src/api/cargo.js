import {post} from '@/utils/http'


export const  CargoListApi=(body)=>{return post("/Base/Cargo/List",body)};

export const  CargoDeleteApi=(body)=>{return post("/Base/Cargo/Delete",body)};

export const  CreateCargoApi=(body)=>{return post("/Base/Cargo/Create",body)};

export const  EditCargoApi=(body)=>{return post("/Base/Cargo/Edit",body)};

export const  GetCargoApi=(body)=>{return post("/Base/Cargo/Get",body)};
