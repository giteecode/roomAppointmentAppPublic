import {post,PostLoading} from '@/utils/http'

export const GetRoomListApi=(body)=>{return PostLoading("/Pc/HomeInfo/List",body)};   


export const GetRoomApi=(body)=>{return PostLoading("/Pc/HomeInfo/GetRoom",body)};   

