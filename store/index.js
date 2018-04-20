import Vue from 'vue'
import util from '~/assets/js/util.js'
import axios from 'axios'

export const state = () => ({
  auth: null,
  loading: false
})

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  },
  setLoading(state, loading) {
    state.loading = loading;
  }
}

export const actions = {

  login({commit, error}, user) {
    commit('setLoading', true);
    if (user.username && user.password) {
      axios.post(`http://localhost:8080/oauth/token?username=${user.username}&password=${user.password}&grant_type=password&client_secret=secret&client_id=trustedclient`, null, {headers: {Authorization: 'Basic dHJ1c3RlZGNsaWVudDpzZWNyZXQ='}})
        .then(response => {
          commit('setLoading', false);
          commit('setAuth', response.data);
          this.app.router.push('/member');
          Vue.toasted.success('You have been logged in', {icon: 'check_circle', position: 'bottom-right'}).goAway(3500);
        })
        .catch(err => {
          commit('setLoading', false);
          Vue.toasted.error('Invalid username / password', {icon: 'warning', position: 'bottom-right'}).goAway(3500);
          window.$nuxt.error({statusCode: 500, message: 'BAD MOVE HORACE'}) //this.$nuxt.error inside components
        });
      return;
    }
    commit('setLoading', false);
    Vue.toasted.error('Invalid username / password', {icon: 'warning', position: 'bottom-right'}).goAway(3500);
  },

  logout({commit, state}) {

    axios.post(`http://localhost:8080/logout`, null, {headers: {Authorization: `Bearer ${state.auth.access_token}`}})
      .then(() => {
        commit('setAuth', null);
        Vue.toasted.info('You have been logged out', {icon: 'highlight_off', position: 'bottom-right'}).goAway(3500);
        this.app.router.push('/');
      })
      .catch(err => {
        commit('setAuth', null);
        Vue.toasted.info('You have been logged out', {icon: 'highlight_off', position: 'bottom-right'}).goAway(3500);
        this.app.router.push('/');
      });
  },

  setAuth({commit}, auth) {
    commit('setAuth', auth)
  }
}
