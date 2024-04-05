import { Message, MessageBox, Loading } from "element-ui"; //消息提示框
import store from "@/store";
import { Snowflake } from "./Snowflake";
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach((v) => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}
export function formatDateTime(val) {
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

/**
 * 公共删除提示框
 * @param config
 * @returns
 */
export function openDelMessageBox(config) {
  let _config = {
    title: config.title || "提示",
    content: config.content || "你确定要删除选中的数据吗?",
  };
  return new Promise(function (resolve, reject) {
    MessageBox.confirm(_config.content, _config.title, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}
export function ConfirmMessageBox(config) {
  let _config = {
    title: config.title || "提示",
    content: config.content || "",
  };
  return new Promise(function (resolve, reject) {
    MessageBox.confirm(_config.content, _config.title, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}
/**
 * 公共审核提示框
 * @param config
 * @returns
 */
export function openExamineMessageBox(config) {
  let _config = {
    title: config.title || "提示",
    content: config.content || "你确定要审核选中的数据吗?",
  };
  return new Promise(function (resolve, reject) {
    MessageBox.confirm(_config.content, _config.title, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}
/**
 * 获取视频的长度
 * @param {*} files
 * @param {*} isVideo
 * @returns
 */
export async function checkSize(files, isVideo) {
  if (!files || !files[0]) return false;
  const checktimevideo = document.getElementById("checktimevideo");
  if (checktimevideo) {
    document.body.removeChild(checktimevideo);
  }
  let doms;
  if (!isVideo) {
    doms = document.createElement("video");
  } else {
    doms = document.createElement("audio");
  }
  const url = URL.createObjectURL(files[0]);
  doms.src = url;
  doms.id = "checktimevideo";
  doms.style.display = "none";
  document.body.appendChild(doms);
  return await gettime(doms);
}
function gettime(doms) {
  // 由于loadedmetadata 是异步代码所以需要promise进行封装转换为同步代码执行
  const promise = new Promise((resolve) => {
    doms.addEventListener("loadedmetadata", (e) => {
      let obj = {
        videoWidth: doms.videoWidth, // 尺寸宽 --- 分辨率
        videoHeight: doms.videoHeight, // 尺寸高
        duration: e.target.duration, // 视频时长 1表示一秒
      };
      resolve(obj);
    });
  });
  return promise;
}
/**
 * 图片数组替换测试路径为''
 * @param {*} images
 * @returns
 */
export function ImagesArrayConvertString(images) {
  console.log(images);
  if (Array.isArray(images)) {
    return images
      // .filter((x) => x.indeOf("http") == -1)
      .join(";")
      .replaceAll(store.getters.baseApi, "");
  } else {
    return "";
  }
}

/**
 * 去掉本地环境的
 * @param {*} images
 * @returns
 */
export function ReplaceImagesHttp(images) {

  if (Array.isArray(images)) {
    return images.map((e) => store.getters.baseApi + e);
  }
  return [];
}
/**
 * 给没有http或则https前缀添加测试服务器地址
 * @param {*} images
 * @returns
 */
export function ReplaceSourceHttp(image) {
  return image.indexOf("http") != -1 ? image : (store.getters.baseApi + image);

}
export function ReplaceDevlopmentSource(image) {
  return image.replace(store.getters.baseApi, "");
}

export function CreateEmptyGuid() {
  return "00000000-0000-0000-0000-000000000000";
}
export function Clone(source) {
  return JSON.parse(JSON.stringify(source));
}
/*函数节流*/
export function Throttle(fn, interval) {
  var enterTime = 0; //触发的时间
  var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认300ms
  return function () {
    var context = this;
    var backTime = new Date(); //第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments[0]);
      enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
export function Debounce(fn, interval) {
  var timer;
  var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
  return function () {
    clearTimeout(timer);
    var context = this;
    var args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function () {
      fn.call(context, args[0]);
    }, gapTime);
  };
}

export function NextSnowflakeId() {
  const snowflake = new Snowflake(1n, 1n, 0n);
  var snowId = (snowflake.nextId()).toString();
  console.log(snowId);
  return snowId;

}
const NextSnowflakeIds = num => {
  const snowflake = new Snowflake(1n, 1n, 0n);
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(snowflake.nextId().toString());
  }
  return num ? arr : snowflake.nextId().toString();
};

export default {
  CreateEmptyGuid,
  openDelMessageBox,
  openExamineMessageBox,
  ImagesArrayConvertString,
  ReplaceImagesHttp,
  ReplaceSourceHttp,
  ReplaceDevlopmentSource,
  Clone,
  ConfirmMessageBox,
  Throttle,
  Debounce,
  NextSnowflakeId,
  NextSnowflakeIds,
  formatDateTime,
  parseTime,
};
