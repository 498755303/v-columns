import Vue from 'vue'
import App from './App.vue'
import SearchInput from "../packages/index";
Vue.use(SearchInput);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
