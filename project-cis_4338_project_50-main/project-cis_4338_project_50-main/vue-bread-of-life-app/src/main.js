import { createApp } from 'vue'
// import app from ./app.vue 
import App from './App.vue'
// import router from ./router
import router from './router'
// import bootstrapVue3 from bootstrap-vue-3
import BootstrapVue3 from 'bootstrap-vue-3'
// import VueChartKick from vue-chartkick
import VueChartKick from 'vue-chartkick'
// import chartkick/chart.js
import 'chartkick/chart.js'
// import 'bootstrap'

// import boostrap files 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// create app and use the imported modules
const app = createApp(App)
app.use(VueChartKick)
app.use(BootstrapVue3)
app.use(router)
app.mount('#app')




