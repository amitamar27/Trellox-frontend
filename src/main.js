import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "./styles/styles.scss"
import 'element-ui/lib/theme-chalk/index.css'
import ElementUi from 'element-ui'
import moment from 'moment'
Vue.prototype.moment = moment


Vue.use(ElementUi)
Vue.use(require('vue-moment'))
import 'animate.css'
import VueDragscroll from 'vue-dragscroll'
Vue.use(VueDragscroll)
Vue.config.productionTip = false

// import '@fortawesome/fontawesome-free/css/all.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
