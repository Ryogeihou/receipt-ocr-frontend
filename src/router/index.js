import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Login from '../components/Login.vue'
import Query from '../components/service/Query.vue'
import Recognition from '../components/service/Recognition.vue'

Vue.use(VueRouter)

// urlのパスとコンポネートをペアリング
const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/query', component: Query },
      { path: '/recognition', component: Recognition},
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
