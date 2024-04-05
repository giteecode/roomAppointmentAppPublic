import {post} from '@/utils/http'

export const  AccountBookRecordListApi=(body)=>{return post("/Charges/AccountBookRecord/List",body)};

export const  AccountBookRecordDeleteApi=(body)=>{return post("/Charges/AccountBookRecord/Delete",body)};

export const  CreateAccountBookRecordApi=(body)=>{return post("/Charges/AccountBookRecord/Create",body)};

export const  EditAccountBookRecordApi=(body)=>{return post("/Charges/AccountBookRecord/Edit",body)};

export const  GetAccountBookRecordApi=(body)=>{return post("/Charges/AccountBookRecord/Get",body)};


export const  UpdateStatusAccountBookRecordApi=(body)=>{return post("/Charges/AccountBookRecord/UpdateStatus",body)};

