import {post} from '@/utils/http'

export function fetchEnumList(typeName) {
  return post("/Comm/Enum/GetEnumList",{typeName:typeName});
}
export function fetchTypeList(typeDirect) {
  return post("/Comm/ClassifyType/GetListAsync",{typeDirect:typeDirect});
}