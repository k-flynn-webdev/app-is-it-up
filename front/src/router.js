import Vue from 'vue'
import Router from 'vue-router'
import Paths from './constants/paths.js'
import Home from './views/Home.vue'

// todo add user gaurds here to from etc

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: Paths['HOME'],
      component: Home
    },
    {
      path: '/public/stack',
      name: Paths['PUBLIC_STACK'],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "stack" */ './views/Stack.vue')
    },    
    {
      path: '/job/:job_id',
      name: Paths['JOB'],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "job" */ './views/Job.vue')
    },
    {
      path: '/user/create',
      name: Paths['USER_CREATE'],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "user_create" */ './views/User.Create.vue')
    },
    {
      path: '/user/login',
      name: Paths['USER_LOGIN'],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "user_login" */ './views/User.Login.vue')
    },
    {
      path: '/user/logout',
      name: Paths['USER_LOGOUT'],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "user_logout" */ './views/User.Logout.vue')
    },
  ]
})
