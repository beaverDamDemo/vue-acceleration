import Vue from 'vue'
import App from './App.vue'
import physics from './physics.js'
import mainWindow from './mainWindow.js'
import compute from './compute.js'

Vue.config.productionTip = false

Vue.prototype.$eventBus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
