import Vue from 'vue';

export default {
  authenticate(state, payload) {
    Vue.set(state, 'session', payload);
    localStorage.setItem('session', JSON.stringify(payload));
  },
};
