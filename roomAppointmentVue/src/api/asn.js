import {post} from '@/utils/http'

export const  AsnListApi=(body)=>{return post("/StockIn/Asn/List",body)};

export const  AsnDetListApi=(body)=>{return post("/StockIn/Asn/GetDet",body)};


export const  AsnDeleteApi=(body)=>{return post("/StockIn/Asn/Delete",body)};

export const  CreateAsnApi=(body)=>{return post("/StockIn/Asn/Create",body)};

export const  EditAsnApi=(body)=>{return post("/StockIn/Asn/Edit",body)};

export const  GetAsnApi=(body)=>{return post("/StockIn/Asn/Get",body)};

export const  CompleteAsnApi=(body)=>{return post("/StockIn/Asn/Complete",body)};

export const  UpdateStatusAsnApi=(body)=>{return post("/StockIn/Asn/UpdateStatus",body)};


export const  UpdateMoneyStatusAsnApi=(body)=>{return post("/StockIn/Asn/UpdateMoneyStatus",body)};

export const  BatchUpdateMoneyStatusApi=(body)=>{return post("/StockIn/Asn/BatchUpdateMoneyStatus",body)};



