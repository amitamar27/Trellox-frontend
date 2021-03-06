import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import board from '../views/board.vue'
import taskEdit from '../views/task-edit.vue'
import boards from '../views/boards.vue'
import login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path:'/board/:boardId',
    name:'Board',
    component:board,
    children: [
      {
          path: 'taskEdit/:groupId/:taskId',
          name: 'taskEdit',
          component: taskEdit
      }
  ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/boards',
    name:'Boards',
    component:boards
    
    
  }
]

const router = new VueRouter({
  routes
})

export default router
