import { version } from '@/../package.json';

const state = {
  alert: false,
  snack: false,
  packageVersion: version,
};
const getters = {
  alert: state => state.alert,
  snack: state => state.snack,
  appVersion: state => state.packageVersion
};
const actions = {
  showSnack: ({ commit }, data) => {
    commit("SET_SNACK", data);
  },
  setAlert: ({ commit }, data) => {
    commit("SET_ALERT", data);
  }
};
const mutations = {
  SET_SNACK: (state, data) => {
    state.snack = {...data};
    setTimeout(() => {state.snack = undefined }, 5000);
  },
  SET_ALERT: (state, data) => {
    state.alert = { type: data.type, msg: data.msg };
    setTimeout(() => {state.alert = undefined },5000);
  },
};
export default {
  state,
  getters,
  actions,
  mutations
};
