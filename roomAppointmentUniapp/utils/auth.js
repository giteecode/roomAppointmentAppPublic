
const loginToken="loginToken";
const userInfo="userInfo";
function SetLoginToken(value)
{
	uni.setStorageSync(loginToken,value);
}
function SetUserInfo(value)
{
	uni.setStorageSync(userInfo,value);
}
function GetUserInfo()
{
	return uni.getStorageSync(userInfo);
}
function GetLoginToken()
{
	return uni.getStorageSync(loginToken);
}

function RemoveLoginToken()
{
	uni.removeStorageSync(loginToken);
	uni.removeStorageSync(userInfo);
}


module.exports={
	SetLoginToken,
	GetLoginToken,
	RemoveLoginToken,
	SetUserInfo,
	GetUserInfo
	};