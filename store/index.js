import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  auth: null,
  loading: false
})

export const getters = {
  basicAuthHeader(state) {
    return {headers: {Authorization: 'Basic dHJ1c3RlZGNsaWVudDpzZWNyZXQ='}}
  },
  accessToken(state) {
    return state.auth && state.auth.access_token ? `Bearer ${state.auth.access_token}` : null;
  },
  refreshToken(state) {
    return state.auth && state.auth.refresh_token ? state.auth.refresh_token : null;
  }
}

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth;
  },
  setLoading(state, loading) {
    state.loading = loading;
  }
}

export const actions = {

  login({commit, error, getters}, user) {
    commit('setLoading', true);
    if (user.username && user.password) {
      axios.post(`oauth/token?username=${user.username}&password=${user.password}&grant_type=password&client_secret=secret&client_id=trustedclient`, null, getters.basicAuthHeader)
        .then(response => {
          commit('setLoading', false);
          commit('setAuth', response.data);
          this.app.router.push('/member');
          Vue.toasted.success('You have been logged in', {icon: 'check_circle', position: 'bottom-right'}).goAway(3500);
        })
        .catch(err => {
          commit('setLoading', false);
          Vue.toasted.error('Invalid username / password', {icon: 'warning', position: 'bottom-right'}).goAway(3500);
        });
      return;
    }
    commit('setLoading', false);
    Vue.toasted.error('Invalid username / password', {icon: 'warning', position: 'bottom-right'}).goAway(3500);
  },

  logout({dispatch, getters}) {

    axios.post(`logout`)
      .then(() => {
        dispatch('clearAuth')
      })
      .catch(err => {
        dispatch('clearAuth')
      });
  },

  refreshToken({commit, getters}) {
    return new Promise((resolve, reject) => {
      axios.post(`oauth/token?grant_type=refresh_token&refresh_token=${getters.refreshToken}`, null, getters.basicAuthHeader)
        .then(response => {
          commit('setAuth', response.data);
          resolve();
        })
        .catch(err => reject())
    });
  },

  clearAuth({dispatch, state}) {
    if (state.auth) {
      dispatch('setAuth', null);
      Vue.toasted.info('Your token has expired. Please log back in.', {
        icon: 'highlight_off',
        position: 'bottom-right'
      }).goAway(3500);
      this.app.router.push('/');
    }
  },

  setAuth({commit}, auth) {
    commit('setAuth', auth)
  }
}
