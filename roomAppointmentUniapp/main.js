import Vue from 'vue'
import App from './App'

import footerBar from "./components/footer-bar.vue";//引入底部
import cuCustom from './colorui/components/cu-custom.vue' //引入自定义头部js
import noData from './components/no-data.vue' //引入自定义头部js

import store from "./store"
import http from 'utils/http.js'
import pictureFilter from 'utils/filter.js'
import comm from 'utils/comm.js'
import uParse from '@/components/u-parse/u-parse.vue'
Vue.component('uParse', uParse)
Vue.component('footer-bar', footerBar)
Vue.component('cu-custom', cuCustom)
Vue.component('cu-no-data', noData)

Vue.prototype.$store=store;
Vue.prototype.$http=http;
Vue.prototype.$comm=comm;
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()
