export default {
  isLoggedIn(state) {
    return !!(state.session);
  },
  authorizationHeader(state) {
    if (!state.session) {
      return null;
    }
    return `Bearer ${state.session.token}`;
  },
};
