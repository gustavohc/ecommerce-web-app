import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '@/views/Auth.vue'
import Resource from '@/views/Resource.vue'
import Login from '@/components/auth/Login.vue'
import List from '@/components/List.vue'
import Product from '@/components/Product.vue'
import Coupon from '@/components/Coupon.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'List',
        component: List
      },
    ]
  },
  {
    path: '/resource',
    name: 'Resource',
    component: Resource,
    children: [
      {
        path: 'product',
        name: 'Product',
        component: Product
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: Coupon
      },
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
    path: '/login',
    component: Auth,
    children: [{
      path: '',
      name: 'Login',
      component: Login
    }]
  },
]

const router = new VueRouter({
  routes
})

export default router
