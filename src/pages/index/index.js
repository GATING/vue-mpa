import Vue from 'vue'
import ElementUI from '@/plugins/element-ui'
import App from './index.vue'
import BaseLayout from '@/layout/index.vue'
import '@style/global.scss'

Vue.component('base-layout', BaseLayout)
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(ElementUI, {
  size: 'small',
})
new Vue({
  render: h => h(App),
}).$mount('#app')
