import { createApp } from 'vue'
import Toaster from "@meforma/vue-toaster";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import App from './App.vue'
import './registerServiceWorker'

library.add(fas)
createApp(App).component('fa', FontAwesomeIcon).use(Toaster).mount('#app')
