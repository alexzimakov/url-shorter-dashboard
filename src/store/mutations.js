import Vue from 'vue';

export default {
  authenticate(state, payload) {
    Vue.set(state, 'session', payload);
    localStorage.setItem('session', JSON.stringify(payload));
  },
  updateLinks(state, payload = []) {
    payload.forEach((rawLink) => {
      const link = rawLink;
      const id = link._id;

      delete link._id;

      Vue.set(state.links, id, rawLink);
    });
  },
  deleteLink(state, id) {
    Vue.delete(state.links, id);
  },
};
