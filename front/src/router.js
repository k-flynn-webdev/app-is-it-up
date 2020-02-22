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
      path: '/user/verify/:verify',
      name: Paths['USER_VERIFY'],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "verify" */ './views/Verify.vue')
    },
    {
      path: '/user/reset/:verify',
      name: Paths['USER_RESET'],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "reset" */ './views/Reset.vue')
    },
    {
      path: '/job/:job_hash',
      name: Paths['JOB'],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "user_job" */ './views/Job.vue')
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
      path: '/user/panel',
      name: Paths['USER_PANEL'],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "user_panel" */ './views/User.Panel.vue')
    },
    // {
    //   path: '/user/logout',
    //   name: Paths['USER_LOGOUT'],
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "user_logout" */ './views/User.Logout.vue')
    // },
  ]
})
