import http from '../utils/http.js'
export const  UserSignInApi=(body)=>{
	return http.PostAsync("/user/login",body)
	};
export const PhoneSignInApi=(body)=>{
	return http.PostAsync("/User/H5PhoneLogin",body)
}
export const UserInfoByToken=(body)=>{
	return http.PostAsync("/user/detailByToken",{})
}