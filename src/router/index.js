import { createRouter as createVueRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ProfileView from '../views/Profile.vue'
import { createAuthGuard } from '@auth0/auth0-vue'

export function createRouter(app) {
  const routes = [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView,
      beforeEnter: createAuthGuard(app)
    }
  ]

  return createVueRouter({
    routes,
    history: createWebHistory()
  })
}
