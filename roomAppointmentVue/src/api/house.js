import {post,PostLoading} from '@/utils/http'

export const  GetLandLordListApi =(body)=>{return post("/Api/Pc/Landlord/GetLandLordList",body)};

export const  GetLandLordApi =(body)=>{return post("/Api/Pc/Landlord/GetLandLord",body)};

export const  CreateApi =(body)=>{return post("/Api/Pc/Landlord/Create",body)};

export const  EditApi =(body)=>{return post("/Api/Pc/Landlord/Edit",body)};

export const  DeleteApi =(body)=>{return post("/Api/Pc/Landlord/Delete",body)};

export const  GetRoomListApi =(body)=>{return post("/Api/Pc/Room/List",body)};


export const CreateRoomApi=(body)=>{return post("/Api/Pc/Room/Create",body)};   

export const GetRoomApi=(body)=>{return PostLoading("/Api/Pc/Room/Get",body)};   

export const EditRoomApi=(body)=>{return post("/Api/Pc/Room/Edit",body)};   

export const DeleteRoomApi=(body)=>{return post("/Api/Pc/Room/Delete",body)};   

