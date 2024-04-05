import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import checkSelect from "./components/CheckSelect/index"
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import { post, postLoading, postDelete } from '@/utils/http'

import comm from "@/utils/index"
import dataTable from "@/components/tables/data-table"
import AMapLoader from '@amap/amap-jsapi-loader';
import pagedSelect from "./components/PagedSelect/index"
import tableSelect from "./components/TableSelect/index"
import UploadImages from "./components/upload/upload-images"
import UploadSigleImages from "./components/upload/upload-sigle-images"
import UploadVideo from "./components/upload/upload-video"
import Tinymce from "@/components/Tinymce";
import Content from "@/components/content/content";




import drag from "@/directive/el-drag-dialog/drag"


Vue.component("data-table", dataTable);
Vue.component("el-check-select", checkSelect);
Vue.component("el-paged-select", pagedSelect);//下拉框
Vue.component("el-table-select", tableSelect);//选择表格
Vue.component("el-upload-sigle-images", UploadSigleImages);//选择图片
Vue.component("el-upload-video", UploadVideo);//选择图片
Vue.component("el-tinymce", Tinymce);//富文本
Vue.component("el-content", Content);//富文本显示


Vue.prototype.$post = post;
Vue.prototype.$postLoading = postLoading;
Vue.prototype.$postDelete = postDelete;



Vue.prototype.$comm = comm;
// set ElementUI lang to EN
//Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false


Vue.filter('formatDateTime', function (value) {
  console.log(comm);
  return comm.formatDateTime(value);
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
