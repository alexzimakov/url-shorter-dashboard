import Vue from 'vue';

export default {
  authenticate(state, payload) {
    Vue.set(state, 'session', payload);
    localStorage.setItem('session', JSON.stringify(payload));
  },
  logout(state) {
    Vue.set(state, 'session', null);
    localStorage.removeItem('session');
  },
  updateUser(state, user) {
    Vue.set(state.session, 'user', user);
    localStorage.setItem('session', JSON.stringify(state.session));
  },
  updateLinks(state, payload = []) {
    let links = payload;

    if (!Array.isArray(payload)) {
      links = [payload];
    }

    links.forEach((rawLink) => {
      const link = rawLink;
      const id = link._id;

      delete link._id;
      link.key = id;
      Vue.set(state.links.items, id, rawLink);
    });
  },
  deleteLink(state, id) {
    Vue.delete(state.links.entities, id);
  },
  setFiltersForLinks(state, filters) {
    Object.entries(filters).forEach(([filter, value]) => {
      Vue.set(state.links.filters, filter, value);
    });
  },
};
