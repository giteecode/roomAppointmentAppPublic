import {post} from '@/utils/http'


export const  BnnerGetApi=(body)=>{return post("/Components/Banner/Get",body)};

export const  BnnerCreateOrEditApi=(body)=>{return post("/Components/Banner/CreateOrEdit",body)};

export const  BnnerDeleteApi=(body)=>{return post("/Components/Banner/Delete",body)};

