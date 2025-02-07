// import Vue from "vue";
// import VueCustomElement from "vue-custom-element";
// import LandingPage from "./components/LandingPage.vue";
// import NewPage from "./components/NewPage.vue"; 

// Vue.use(VueCustomElement);

// // ✅ 웹 컴포넌트 등록
// Vue.customElement("landing-page", LandingPage);
// Vue.customElement("new-page", NewPage);


// import Vue from 'vue'
// import App from './App'
// import router from './routers'


// new Vue({
//   router,
//   render: h => h(App)  // ✅ template 대신 render 사용
// }).$mount('#app')

import Vue from "vue";
import VueCustomElement from "vue-custom-element";
import App from "./App.vue";
import router from "./routers";

Vue.config.productionTip = false;

Vue.use(VueCustomElement);

// ✅ 웹 컴포넌트 등록
Vue.customElement("vue-web-app", {
  router,
  render: (h) => h(App),
});

// ✅ 기본 Vue 인스턴스 생성
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

