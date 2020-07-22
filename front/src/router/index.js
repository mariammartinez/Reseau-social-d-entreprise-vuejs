import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      requiresAuth: true
    }
  },

  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true
    }
  },


 
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === "/" ){
    // protected
    if (sessionStorage.getItem('jwt') === null) {
      next({
          path: '/login',
          params: { nextUrl: to.fullPath }
      })
    }else{
      next();
    }

  }else{
    // public
    next();
  }
  
})

export default router
