import { createRouter, createWebHistory } from 'vue-router'
import UserInfo from '@/components/UserInfo.vue'
import store from '@/store/index.js'

const routes = [
  // {
  //   path: '/',
  //   redirect: { name: 'Home'}
  // },

  //En conjunto con las clases automaticas proporcinadas por el router
  { 
    path: '/user', 
    alias: "/",
    name: 'Home',
    component: () => import(/* webpackChunkName: "UserList" */ '../views/AppUserList.vue'), 
  },
  // {
  //   path: '/user',
  //   name: 'Home',
  //   component: () => {
  //     import(/* webpackChunkName: "group-user" */ '../views/AppUserList.vue')
  //   }, 
  // },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "UserList" */ '../views/AppContact.vue'), 
    
  },
  {
    path: '/legal',
    name: 'Legal',
    component: () => import(/* webpackChunkName: "UserList" */ '../views/AppLegal.vue'), 
    
  },
  {
    path: '/user/:username',
    name: 'User',
    component: () => import(/* webpackChunkName: "UserList" */ '../views/AppUser.vue'), 
    children: [
      {
        path:'information',
        name: 'Info',
        component: UserInfo,
        props: true
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "UserList" */ '../views/UserDashboard.vue'), 
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "UserList" */ '../views/AppLogin.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import(/* webpackChunkName: "UserList" */ '../views/NotFound.vue'), 
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior( to, from, savedPosition ){
    if ( savedPosition ) 
      return savedPosition
    else if ( to.hash ){
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    else 
      return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if( to.matched.some( record =>  record.meta.requiresAuth)){
    if( store.state.auth){
      next()
    } else {
      next( {name: 'Login'})
    } 
  } else {
    next()
  }

})


export default router
