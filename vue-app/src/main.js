import Vue from "vue";
import VueCustomElement from "vue-custom-element";
import LandingPage from "./components/LandingPage.vue"; // 이 컴포넌트를 웹 컴포넌트로 변환

// Vue Custom Element 사용
Vue.use(VueCustomElement);

// 웹 컴포넌트 등록
Vue.customElement("landing-page", LandingPage);
