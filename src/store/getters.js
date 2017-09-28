export default {
  isLoggedIn(state) {
    return !!(state.session);
  },
  authorizationHeader(state) {
    return `Bearer ${state.session.token}`;
  },
};
