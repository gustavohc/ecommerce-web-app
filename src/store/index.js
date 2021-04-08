import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import notifications from './modules/notifications'
import products from './modules/products'
import coupon from './modules/coupon'

import { version } from '@/../package.json';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    packageVersion: version,
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    appVersion: state => state.packageVersion
  },
  modules: {
    auth,
    notifications,
    products,
    coupon
  }
})
