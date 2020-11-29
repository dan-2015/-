import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import ElementUI from 'element-ui';
// import echarts from 'echarts'

import './views/icon/font_l1jka36a5ef/iconfont.css'
// 引入 css
import 'element-ui/lib/theme-chalk/index.css';
//注册组件库
Vue.use(ElementUI);
router.beforeEach((to, from, next) => {
  // 如果 to.path 不是登录页, 又没有 token 就跳转到 登录页
  if (to.path != '/login' && !localStorage.getItem('token')) {
    router.push('/login')
  } else {
    // 否则就放过
    next()
  }
})
// 绑定到原型
axios.interceptors.response.use(res => {
  // console.log(res)
  const { statusCode, message } = res.data
  if (statusCode && statusCode == 401) {
    Toast.fail('你的信息错误,请重新登录')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    router.replace('/login')
  }
  return res
})
axios.interceptors.request.use((config) => {
  if (!config.headers.Authorization && localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token');
  }
  return config;
})
// Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios;

//设置默认的 api 域名基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
