import Vue, { VueElement } from 'vue'
import baseUrl from '../environment.js'
import {FormatDateTime,FormatDate} from "./comm.js"
Vue.filter('pictureFilter',function(value){
	if(!value) return '';
	if(!value.includes("http://")||!value.includes("https://")){
		value=value+"?v="+new Date().getTime();
		return value;
	}
})

Vue.filter('formatDateTime',function(value){
	if(!value) return '';
	
	return FormatDateTime(value);
	}
)
Vue.filter('formatDate',function(value){
	if(!value) return '';
	
	return FormatDate(value);
	}
)


