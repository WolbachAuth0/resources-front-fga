import { createRouter as createVueRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ProfileView from '../views/Profile.vue'
import DocumentsView from '../views/Documents.vue'
import Login from '../views/Login.vue'
// import DocumentDetail from '../views/DocumentDetail.vue'
import { createAuthGuard } from '@auth0/auth0-vue'
import { components } from 'vuetify/dist/vuetify-labs.js'
const environ = import.meta.env

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
    },
    {
      path: '/documents',
      name: 'Documents',
      component: DocumentsView,
      beforeEnter: createAuthGuard(app)
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]

  return createVueRouter({
    routes,
    history: createWebHistory()
  })
}
