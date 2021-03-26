import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import VueLodash from 'vue-lodash'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
import 'vue-tour/dist/vue-tour.css'
import { store } from './store'
import { router } from './services/router'
import VueJwtDecode from 'vue-jwt-decode'
import moment from 'moment'
import VueNativeSock from 'vue-native-websocket'
import VueProgress from 'vue-progress-path'


Vue.use(require('vue-moment'));
Vue.use(VueProgress)
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});
Vue.use(VueNativeSock, 'wss://localhost:9090', {
  connectManually: true,
  store: store,
  format: 'json',
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
 }
)
Vue.use(VueJwtDecode)
Vue.use(VueToast, {
  // One of options
  position: 'top-right',
})
const options = { name: 'lodash' } // customize the way you want to call it


Vue.use(VueLodash, options) // options is optional
Vue.config.productionTip = false
Vue.prototype.$http = Axios;


new Vue({
  router,
  store,
  mounted() {

  },
  render: h => h(App),
}).$mount('#app')
