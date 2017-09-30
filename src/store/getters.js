import { normalizeLink } from '@/utils';


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
  linksOfLoggedInUser(state) {
    const author = state.session.user._id;

    return Object.values(state.links.items)
      .filter(link => link.author === author)
      .map(link => normalizeLink(link));
  },
  filteredLinksByTag(state) {
    if (!('tags' in state.links.filters)) {
      return [];
    }

    const tag = state.links.filters.tags;

    return Object.values(state.links.items)
      .filter(link => link.tags.indexOf(tag) !== -1)
      .map(link => normalizeLink(link));
  },
};
