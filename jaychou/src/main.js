import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
// //引入播放器
import VueCoreVideoPlayer from "vue-core-video-player";
//关闭生产提示
Vue.config.productionTip = false
//第三方库引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import jquery from 'jquery'
//我的自定义模块
import convert from './tool/dataConvert'
import request from './request/api'
//字体库引入
import './assets/fonts/font.css'
//第三方库使用
//应用elementui
Vue.use(ElementUI)
//应用vu-router
Vue.use(VueRouter)
//运用播放器插件
Vue.use(VueCoreVideoPlayer, {
  lang: "zh-CN",
});

//原型链绑定
Vue.prototype.$jq = jquery
Vue.prototype.$convert = convert
Vue.prototype.$http = request

new Vue({
  render: h => h(App),
  router: router,
  store: store,
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  },
}).$mount('#app')
