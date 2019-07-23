import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/pages/login'
Vue.use(Router)
const index = () => import('@/pages/index')


export default new Router({
  routes: [
    {
      path: '/',
      component: index
    }
  ]
})
