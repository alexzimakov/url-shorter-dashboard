<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    showOfflineNotification() {
      this.$message({
        message: 'Нет подключения к Интернету.',
        type: 'warning',
        showClose: true,
      });
    },
  },
  mounted() {
    if (!navigator.onLine) {
      this.showOfflineNotification();
    }

    window.addEventListener('offline', this.showOfflineNotification);
  },
};
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  background: white;
  font-weight: normal;
  font-style: normal;
  font-family: 'system-ui';

  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
}

.help {
  color: #8492A6;
  font-size: 14px;

  &.is-danger {
    color: #FF4949;
  }
}

.is-danger input {
  border-color: #FF4949;
}

.errors-box {
  margin-bottom: 16px;
  padding: 8px 16px;
  border-radius: 5px;
  background: #FF4949;
  color: #FFFFFF;
}
</style>
