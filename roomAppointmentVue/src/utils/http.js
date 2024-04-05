import request from "@/utils/request";
import { Loading, MessageBox, Message } from 'element-ui';
import { openDelMessageBox } from "@/utils/index"
export async function post(url, data) {
  let response = {
    code: "",
    data: "",
    msg: "",
    success: true,
  };
  await request({
    url: url,
    method: "post",
    data: data || {},
  })
    .then((res) => {
      response.success = res.status;
      response.msg = res.message;
      response.code = res.code;
      response.data = res.data;
    })
    .catch((ex) => {

      response.success = false;
      response.msg = ex;
    });
  return response;
}

export async function postLoading(url, data) {
  const loading = Loading.service({
    lock: true,
    fullscreen: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  let response = await post(url, data);
  loading.close();

  return response;
}
export async function postDelete(url, data) {

  let confirm = await openDelMessageBox({});
  console.log("执行删除", url, data, confirm);
  if (confirm) {
    await post(url, data);
  }
  return {};
}
