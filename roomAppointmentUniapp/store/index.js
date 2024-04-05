import Vue from "vue"
import Vuex from "vuex"
import {
	UserSignInApi,
	PhoneSignInApi,
	UserInfoByToken
} from '../api/identityApi.js'
import {
	SetLoginToken,
	GetLoginToken,
	RemoveLoginToken,
	SetUserInfo,
	GetUserInfo
} from '../utils/auth.js'

import {
	ShowToast
} from '../utils/comm.js'

Vue.use(Vuex)
const token = GetLoginToken();
const userInfo = GetUserInfo();
export default new Vuex.Store({
	state: {
		token: token,
		userInfo: userInfo,
		footerBarList: [{
				url: "/pages/index/index",
				label: "首页",
			},
		
			{
				url: "/pages/room/list",
				label: "自习室",
				src: "cuIcon-order"
			},
		

			{
				url: "/pages/user-center/user-center",
				label: "我的",
				src: "cuIcon-people"
			}
		]
	},
	getters: { //get方法
		token: state => state.token,
		footerBarList: state => state.token,
		userInfo: state => state.userInfo,
	},
	mutations: { //set方法
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo;
		}

	},
	actions: {
		async Userlogin({
			commit
		}, userInfo) {
				console.log("aaaa");
			const {
				username,
				password,
				phone,
				code
			} = userInfo;
			let {
				data,
				message,
				success
			} = await UserSignInApi({
				userName: username,
				passWord: password,
			});
		
			if(success){
			commit("SET_TOKEN", data.token);
			SetLoginToken(data.token);
			}
			
			return {
				message,
				success
			};
		},
		async Phonelogin({
			commit
		}, userInfo) {
			const {
				username,
				password,
				phone,
				code
			} = userInfo;
			let {
				data,
				success,
				message
			} = await PhoneSignInApi({
				phoneNumber: phone,
				code: code
			});
			commit("SET_TOKEN", data);
			SetLoginToken(data);
			return {
				message,
				success
			};
		},
		async LoginOut({
			commit
		}) {
			commit("SET_TOKEN", "");
			commit("SET_USERINFO", null);
			RemoveLoginToken();
		},
		async TokenLose({
			commit
		}) {
			commit("SET_TOKEN", "");
			commit("SET_USERINFO", null);
			RemoveLoginToken();
			uni.navigateTo({
				url: "/pages/login/login"
			})

		},
		async UserInfoByToken({
			commit,
			state
		}, userInfo) {
			if (state.token) {

				let {
					data,
					message,
					success
				} = await UserInfoByToken({});
				commit("SET_USERINFO", data);
				SetUserInfo(data);
			}
		},
	},
})
