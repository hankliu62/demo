import Vue from 'vue'
import VueRouter from 'vue-router'
import DirectivesPlugin from './directives'
import routeConfig from './routes/routes'
import App from './modules/App/App'

Vue.use(VueRouter)
Vue.use(DirectivesPlugin)

const router = new VueRouter({
  hashbang: true,
  history: true,
  saveScrollPosition: true
})

router.map(routeConfig)

// Define your root component for app here
router.start(App, '#root')
