import { productService } from '@/services/products.service';

const state = {
  products: [],
};
const getters = {
  products: state => state.products,
};
const actions = {
  loadAllProducts: async ({ commit }) => {
    let products = await productService.getAll();

    commit("SET_PRODUCTS", products);
  },
};
const mutations = {
  SET_PRODUCTS: (state, data) => {
    state.products = data;
  },
};
export default {
  state,
  getters,
  actions,
  mutations
};
