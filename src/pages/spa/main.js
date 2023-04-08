import Vue from 'vue'
import ElementUI from '@/plugins/element-ui'
import BaseLayout from '@/layout/index.vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@style/global.scss'

Vue.component('base-layout', BaseLayout)
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(ElementUI, {
  size: 'small',
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
