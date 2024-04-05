import {post} from '@/utils/http'


export const  DicTypeListApi=(body)=>{return post("/Comm/Dic/Type/List",body)};

export const  DicTypeDeleteApi=(body)=>{return post("/Comm/Dic/Type/Delete",body)};

export const  DicTypeCreateApi=(body)=>{return post("/Comm/Dic/Type/Create",body)};

export const  DicTypeEditApi=(body)=>{return post("/Comm/Dic/Type/Edit",body)};

export const  GetTypeEditApi=(body)=>{return post("/Comm/Dic/Type/Get",body)};



export const  DicListApi=(body)=>{return post("/Comm/Dic/List",body)};

export const  DicDeleteApi=(body)=>{return post("/Comm/Dic/Delete",body)};

export const  DicCreateApi=(body)=>{return post("/Comm/Dic/Create",body)};

export const  DicEditApi=(body)=>{return post("/Comm/Dic/Edit",body)};

export const  GetDicApi=(body)=>{return post("/Comm/Dic/Get",body)};

