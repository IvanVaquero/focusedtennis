import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ListManagement from '../views/ListManagement.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/listmanagement',
    name: 'ListManagement',
    component: ListManagement
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
