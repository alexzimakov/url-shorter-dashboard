import store from '@/store';

/**
 * Checks if user is logged in before next navigation hook is triggered.
 *
 * @export
 * @param {Object} to
 * @param {Object} from
 * @param {Function} next
 */
export function requireAuth(to, from, next) {
  if (store.getters.isLoggedIn) {
    next();
  } else {
    next('/');
  }
}

/**
 * Checks if user is guest before next navigation hook is triggered.
 *
 * @export
 * @param {Object} to
 * @param {Object} from
 * @param {Function} next
 */
export function requireGuest(to, from, next) {
  if (store.getters.isLoggedIn && (to.name === 'register' || to.name === 'login')) {
    next('/');
  } else {
    next();
  }
}
