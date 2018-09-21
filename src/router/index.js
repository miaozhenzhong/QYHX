import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: () => import(/* webpackChunkName: "search" */ '@/components/main.vue'),
      children:[
        {
          path: 'search',
          name: 'Search',
          component: () => import(/* webpackChunkName: "search" */ '@/components/search.vue')
        },
        {
          path: 'custInfo',
          name: 'custInfo',
          component: () => import(/* webpackChunkName: "search" */ '@/components/custInfo.vue')
        },
      ]
    },
    {
      path: '/dataMap',
      name: 'dataMap',
      component: () => import(/* webpackChunkName: "search" */ '@/components/dataMap.vue')
    }
  ]
})
