import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import Customers from "./Customers.vue"; // Vue 컴포넌트 불러오기

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify(),
  render: (h) => h(Customers),
}).$mount("#app"); // Vue.js 2를 #app에 마운트
