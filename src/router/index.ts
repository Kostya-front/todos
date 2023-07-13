import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import {IAuthState} from "@/features/auth/authStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/tasks',
    name: 'tasks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Tasks.vue')
  },
  {
    path: '/task/:title',
    name: 'task',
    component: () => import('../views/task/TaskView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const stateString = localStorage.getItem('authState')
  if(!stateString) {
    return next('/')
  }

  const localState: IAuthState = JSON.parse(stateString)

  if(to.path === '/' && localState.isAuth) {
    return next('/home')
  }
  if(to.path !== '/' && !localState.isAuth) {
    return next('/')
  }
  return next()
})
export default router
