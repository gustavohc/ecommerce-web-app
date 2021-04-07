import router from '@/router';
import { authService } from '@/services/auth.service';
import jw from 'jwt-decode';

const state = {
  user: undefined,
  querying: undefined,
};
const getters = {
  authenticated: state => state.user,
  loading: state => { return state.querying }
};
const actions = {
  login: async ({ commit }, credentials) => {
    try {
      state.querying = true;
      let response = await authService.login(credentials);
      if(!response.token === 'success') {
        state.querying = false;
        return {status: 1, msg: `Erro no login!`, error: response};
      }
      commit("SET_USER", response.token);
      state.querying = false;
      router.push("/").catch(() => {})
      return { status: 0, msg: `Bem vindo ${state.user.username} !`}
    }
    catch (e) {
      state.querying = false;
      return { status: 1, msg: `Usuário ou senha inválidos!` }
    }
  },
  logoff: ({ commit }) => {
    localStorage.removeItem('user');
    commit('SET_USER');
    router.push('/login');
    return;
  },
  ask: async ({state}, credentials) => {
    state.querying = true;
    try {
      let response = await authService.ask(credentials);
      if(!response.isSuccess) {
        state.querying = false;
        return { status: 1, msg: response.message }
      }
      state.querying = false;
      return { status: 0, msg: response.message }
    }catch (e){
      if(e.response.data) return { status: 1, msg: JSON.parse(e.response.data.Message).Error }
      return { status: 1, msg: e.response }
    }
  }
};
const mutations = {
  SET_USER: (state, user) => {
    if(!user){
      state.user = undefined;
      localStorage.removeItem('user');
      router.push("/login");
    }else {
      state.user = jw(user);
      localStorage.setItem('user', user);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
