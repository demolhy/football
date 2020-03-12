import Vue from 'vue'
import App from './App'

import WXrequest from './utils/httpRequest'
Vue.prototype.$httpWX = WXrequest

Vue.config._mpTrace = true
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount();


