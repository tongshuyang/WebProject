import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Join from '../views/Join.vue'
import Meeting from '../views/Meeting.vue'
import NetError from '../views/NetError.vue'
import Unsupport from '../views/Unsupport.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  {
    path: '/join',
    name: 'Join',
    component: Join
  },
  {
    path: '/meeting',
    name: 'Meeting',
    component: Meeting
  },
  {
    path: '/neterr',
    name: 'NetError',
    component: NetError
  },
  {
    path: '/unsupport',
    name: 'Unsupport',
    component: Unsupport
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  if (to.path === '/unsupport') {
    next()
    return
  }

  BRTC.checkSystemSupport().then(support => {
    if (!support) {
      next('/unsupport')
    }
    else {
      next()
    }
  })
})

export default router
