import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store/store'
//auth
import signin from './auth/signin/signin';
import signup from './auth/signup/signup';

import landingpage from './components/landingpage';
import home from './components/home';
// import PageNotFound from './components/PageNotFound';
// import GoogleAuth from '@/config/google_oAuth.js'
// const gauthOption = {
//   clientId: '707231563844-e5cpkqrlt62gncmj6b84of5sml9lp8g9.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account'
// }
// Vue.use(GoogleAuth, gauthOption)


library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes: [{
    path: '/home',
    component: home
},
    {
    path: '/landingpage',
    component: landingpage
    },
    {
      path: '/signup',
      component: signup
  },
  {
      path: '/signin',
      component: signin
  },
  // {
  //   path: '*',
  //   name: 'PageNotFound',
  //   component: PageNotFound
  // }
  ],
mode : 'history'
})






new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')