<template>
  <header class="header">
    <nav class="header-inner">
      <router-link to="/" class="logo">
        <h3>URL Shorter</h3>
      </router-link></router-link>
      <ul class="actions">
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
export default { name: 'l-header' };
</script>

<style>
.header {
  position: relative;
  background: #FFFFFF;
}
.header:after {
  display: block;
  width: 100%;
  height: 3px;
  background-color: #D3DCE6;
  background-image: linear-gradient(to right, #58B7FF, #1D8CE0);
  content: "";
}
.header-inner {
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
.logo {
  color: #324057;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  transition: 150ms;
}
.logo:hover {
  opacity: 0.70;
}
.actions {
  display: flex;
  list-style: none;
}

.actions > * {
  margin-left: 8px;
}
</style>
