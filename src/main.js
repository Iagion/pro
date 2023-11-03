import Vue from 'vue'
import App from './App.vue'
import router from '@/router/guard'
import 'normalize.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
import store from '@/store'
Vue.directive('focus',{
  inserted:function(el){
    el.focus()
  }
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
