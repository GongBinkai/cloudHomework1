// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAMap from 'vue-amap'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(elementUI);
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
	key: '573ecada61a30103b61f5001b9db782d',
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
