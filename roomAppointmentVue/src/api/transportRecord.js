import {post} from '@/utils/http'

export const  TransportRecordListApi=(body)=>{return post("/Vehicle/TransportRecord/List",body)};

export const  TransportRecordDetListApi=(body)=>{return post("/Vehicle/TransportRecord/GetDet",body)};


export const  TransportRecordDeleteApi=(body)=>{return post("/Vehicle/TransportRecord/Delete",body)};

export const  CreateTransportRecordApi=(body)=>{return post("/Vehicle/TransportRecord/Create",body)};

export const  EditTransportRecordApi=(body)=>{return post("/Vehicle/TransportRecord/Edit",body)};

export const  GetTransportRecordApi=(body)=>{return post("/Vehicle/TransportRecord/Get",body)};

export const  CompleteTransportRecordApi=(body)=>{return post("/Vehicle/TransportRecord/Complete",body)};

