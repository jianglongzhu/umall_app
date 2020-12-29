// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 1，引入reset.css重置文件
import "./assets/css/reset.css"
//  2.注册filters 过滤器
import "./filters"
// 3.注册全局组件
import "./components"
// 4.引入store
import store from  "./store"
// 5.配置路由   以及代理 

// 6.路由组件

// 7.UI库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
