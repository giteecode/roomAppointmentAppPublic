import store from "../store/index.js"
import baseUrl from "../environment.js"


async function PostAsync(url, data) {
	let response = {
		success: false,
		data: undefined,
		message: "",
		code: ""
	};
	await Post(url, data).then(res => {
	
			response.success = res.data.code==200?true:false;
			response.data = res.data.data;
			response.message = res.data.message;
			response.code = res.data.code;
		})
		.catch(err => {
			response.message = err;
			response.code = 999;
		})
	console.log("返回结果",response);
	return response;

}
async function PostReturnPage(url, body)
{
	let response=await PostAsync(url,body);
	let  {success,data,message}=response;
	if(success)
	{
		uni.showToast({
			icon:"none",
			title:"操作成功",
			duration:1500
		})
		setTimeout(()=>{
			uni.navigateBack({
				delta:1
			})
		},1500)
	}
	else{
		uni.showToast({
			icon:"error",
			title:message,
			duration:1500
		})
	}
	return response;
	 
}


var Post = function(url, data) {
	let option = {
		url: baseUrl + url,
		data: data,
		method: "POST",
		header: null,
		dataType: 'json'
	};
	let token = store.getters.token;
	if (token) {
		option.header = {
			"accessToken": `${token}`
		};
	}
	console.log(option);
	return Request(option);
}

var Request = function(option) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: option.url,
			data: option.data,
			method: option.method,
			header: option.header,
			dataType: option.dataType,
			success: async (res) => {
				let {
					data: {
						code,
						message
					}
				} = res;

				if (code == 400) {

					
				}
				else if(code=="401")
				{
					await store.dispatch("TokenLose", {});
				}

				resolve(res);
			},
			fail: (err) => {
				reject(err);
			}
		});
	})
}

var Upload = function(filePath) {
	return new Promise((resolve, reject) => {
		const uploadTask = uni.uploadFile({
			url: baseUrl + "/file/uploadSingle",
			filePath: filePath,
			name: 'file',
			success: (uploadFileRes) => {
				resolve(JSON.parse(uploadFileRes.data));
			}
		});
	});
}


module.exports = {
	Post,
	PostAsync,
	Upload,
	PostReturnPage
}
