import { couponService } from '@/services/coupon.service';

const state = {
  coupons: [],
};
const getters = {
  coupons: state => state.coupons,
};
const actions = {
  loadAllCoupons: async ({ commit }) => {
    let coupons = await couponService.getAll();

    commit("SET_COUPONS", coupons);
  },
};
const mutations = {
  SET_COUPONS: (state, data) => {
    state.coupons = data;
  },
};
export default {
  state,
  getters,
  actions,
  mutations
};
