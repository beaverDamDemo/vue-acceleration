import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;

Vue.prototype.$eventBus = new Vue();

Vue.filter("decimalsShortenFilter", function (number) {
  return Math.round(number * 1000) / 1000;
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
