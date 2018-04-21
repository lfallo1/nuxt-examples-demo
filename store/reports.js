import Vue from 'vue'
import axios from 'axios';

export const state = () => ({
  refreshing: false
})

export const mutations = {
  setRefreshing(state, refreshing) {
    state.refreshing = refreshing;
  }
}

export const actions = {
  refreshPrograms({commit}) {
    commit('setRefreshing', true)
    axios.get('api/report/status')
      .then(() => {
        commit('setRefreshing', false)
        Vue.toasted.success('Program Information Refreshed', {
          position: 'bottom-right',
          icon: 'check_circle'
        }).goAway(3500);
      })
      .catch((error) => {
        commit('setRefreshing', false)
        Vue.toasted.error('Unable to refresh data', {
          position: 'bottom-right',
          icon: 'warning'
        }).goAway(3500);
      });
  }
}
