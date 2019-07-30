import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const index = () => import('@/pages/index')
const news=()=>import('@/pages/new')
const login=()=>import('@/pages/login')


export default new Router({
  routes: [
    {
      path: '/',
      name:'index',
      component: index
    },
    {
      path: '/news',
      name:'news',
      component: news
    },
    {
      path: '/login',
      name:'login',
      component: login
    }
  ]
})
