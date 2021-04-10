
import Vue from 'vue'
import App from './App.vue'

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import elementAr from "element-ui/lib/locale/lang/ar";
import locale from 'element-ui/lib/locale'
Vue.use(ElementUI, {elementAr});
locale.use(elementAr)

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax
Vue.use(Vuesax)


// axios
import axios from './axios.js'
Vue.prototype.$http = axios
// Filters
import './filters/filters.js'


// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('./assets/css/iconfont.css')

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

import i18n from './language/lang'

import VeeValidate from 'vee-validate';

import arabic from './language/vee-validate/locale/ar.js'
import english from './language/vee-validate/locale/en.js'
Vue.use(VeeValidate, {
  fieldsBagName: 'veeFields',
  i18nRootKey: 'validations', // customize the root path for validation messages.
  i18n,
  dictionary: {
   ar:arabic,
   en:english
  }
});


window.server_url = window.location.protocol + "//" + window.location.hostname + ":8000";
window.axios = axios;

let token = localStorage.getItem("token") || null;
window.axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
/* **************************************************************** */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
