<template>
  <header class="header">
    <nav class="header-inner">
      <router-link to="/" class="logo">
        <h3>URL Shorter</h3>
      </router-link></router-link>
      <div v-if="isLoggedIn">
        <el-popover
          placement="left"
          width="160"
          trigger="click"
          v-model="userContextMenuIsVisible"
        >
          <label slot="reference" class="avatar">
            {{ initials | uppercase }}
          </label>
          <ul class="context-menu-links">
            <li>
              <h4 class="fullname">{{ fullName | capitalize }}</h4>
            </li>
            <li>
              <router-link to="/account">Aккаунт</router-link>
            </li>
            <li>
              <router-link to="/logout">Выйти</router-link>
            </li>
          </ul>
        </el-popover>
      </div>
      <ul v-else class="actions">
        <li>
          <router-link to="/login">
            <el-button>Войти</el-button>
          </router-link>
        </li>
        <li>
          <router-link to="/register">
            <el-button type="primary">Регистрация</el-button>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'l-header',
  data() {
    return {
      userContextMenuIsVisible: false,
    };
  },
  computed: {
    ...mapState({
      user: state => state.session.user,
      fullName: (state) => {
        const { user } = state.session;

        if (user.firstName && user.lastName) {
          return `${user.firstName} ${user.lastName}`;
        }

        if (user.firstName) {
          return user.firstName;
        }

        return user.username;
      },
      initials: (state) => {
        const { user } = state.session;

        if (user.firstName && user.lastName) {
          return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
        }

        if (user.firstName) {
          return user.firstName.charAt(0);
        }

        return user.username.charAt(0);
      },
    }),
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    toggleUserContextMenu() {
      this.userContextMenuIsVisible = !this.userContextMenuIsVisible;
    },
  },
};
</script>

<style lang="scss">
.header {
  position: relative;
  background: #FFFFFF;

  &:after {
    display: block;
    width: 100%;
    height: 3px;
    background-color: #D3DCE6;
    background-image: linear-gradient(to right, #58B7FF, #1D8CE0);
    content: "";
  }

  &-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    margin-right: auto;
    margin-left: auto;
    padding: 0 16px;
    max-width: 1140px;
    width: 100%;
    height: 64px;
  }
}

.logo {
  color: #324057;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  transition: 150ms;

  &:hover {
    opacity: 0.70;
  }
}

.actions {
  display: flex;
  list-style: none;

  > * {
    margin-left: 8px;
  }
}

.avatar {
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  font-weight: 900;
  font-size: 18px;
  color: white;
  background-color: #8492A6;
  border: none;
  background-image: linear-gradient(#C0CCDA, #8492A6);
}

.context-menu-links {
  list-style: none;
  padding: 8px 16px;
  margin: 0;
  font-size: 14px;
  color: #475669;

  > * {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: 150ms;

    &:hover {
      opacity: 0.70;
    }
  }
}

.fullname {
  color: #324057;
  margin: 0;
  font-size: 16px;
  margin-bottom: 16px;
}
</style>
