import {post} from '@/utils/http'

export const  OutNoticeListApi=(body)=>{return post("/StockOut/OutNotice/List",body)};

export const  OutNoticeDetListApi=(body)=>{return post("/StockOut/OutNotice/GetDet",body)};


export const  OutNoticeDeleteApi=(body)=>{return post("/StockOut/OutNotice/Delete",body)};

export const  CreateOutNoticeApi=(body)=>{return post("/StockOut/OutNotice/Create",body)};

export const  EditOutNoticeApi=(body)=>{return post("/StockOut/OutNotice/Edit",body)};

export const  GetOutNoticeApi=(body)=>{return post("/StockOut/OutNotice/Get",body)};

export const  CompleteOutNoticeApi=(body)=>{return post("/StockOut/OutNotice/Complete",body)};

