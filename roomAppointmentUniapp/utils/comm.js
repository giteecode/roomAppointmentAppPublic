import store from "../store"

function CheckToken() {
	if (!store.getters.token) {
		uni.navigateTo({
			url: "/pages/login/login"
		})
		return false;
	}
	return true;
}
export function FormatDateTime(val) {
  if (!val) return "";
  let date = new Date(val);
  if (!date) return "";

  var y = date.getFullYear();
  var m = (date.getMonth() + 1).toString();
  m = parseInt(m) < 10 ? "0" + m : m;
  var d = date.getDate().toString();
  d = parseInt(d) < 10 ? "0" + d : d;
  var h = date.getHours().toString();
  h = parseInt(h) < 10 ? "0" + h : h;
  var minute = date.getMinutes().toString();
  minute = parseInt(minute) < 10 ? "0" + minute : minute;
  var second = date.getSeconds().toString();
  second = parseInt(second) < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
}
export function FormatDate(val) {
  if (!val) return "";
  let date = new Date(val);
  if (!date) return "";

  var y = date.getFullYear();
  var m = (date.getMonth() + 1).toString();
  m = parseInt(m) < 10 ? "0" + m : m;
  var d = date.getDate().toString();
  d = parseInt(d) < 10 ? "0" + d : d;
  var h = date.getHours().toString();
  h = parseInt(h) < 10 ? "0" + h : h;
  var minute = date.getMinutes().toString();
  minute = parseInt(minute) < 10 ? "0" + minute : minute;
  var second = date.getSeconds().toString();
  second = parseInt(second) < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d + " " ;
}

function GetFormatFullDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    month = (month<10)? '0'+ month : month;
    day = (day<10)? '0'+ day : day;
    hour = (hour<10)? '0'+ hour : hour;
    minutes = (minutes<10)? '0'+ minutes : minutes;
    seconds = (seconds<10)? '0'+ seconds : seconds;
    let currentDate = year + "-" + month + "-" + day
            + " " + hour + ":" + minutes + ":" + seconds;
    return currentDate;
}


function GetFormatShortDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    month = (month<10)? '0'+ month : month;
    day = (day<10)? '0'+ day : day;
    hour = (hour<10)? '0'+ hour : hour;
    minutes = (minutes<10)? '0'+ minutes : minutes;
    seconds = (seconds<10)? '0'+ seconds : seconds;
    let currentDate = year + "-" + month + "-" + day;
            
    return currentDate;
}

function ShowLoading(title = "加载中...") {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: title,
			success: resolve(),
			fail: reject()

		})

	})
}

function ShowToast(title = "成功") {
	console.log(title);
	return new Promise((resolve, reject) => {
		uni.showToast({
			icon: "none",
			duration: 3000,
			title: title,

			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				reject(err);
			}
		})

	})

}

function ChooseImageAsync(count = 1) {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: 4, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', "camera"], //从相册选择
			success: (res) => {
				resolve(res);
			}
		});
	})
}



module.exports = {
	CheckToken,
	ShowLoading,
	ShowToast,
	ChooseImageAsync,
	GetFormatFullDate,
	GetFormatShortDate,
	FormatDateTime,
	FormatDate
};
