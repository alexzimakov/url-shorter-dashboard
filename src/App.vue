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
      this.$message.warning('Нет подключения к Интернету.');
    },
  },
  created() {
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
}

a {
  color: #20A0FF;
  white-space: nowrap;
}

.content {
  width: 100%;
  height: 100%;
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  box-sizing: border-box;
}
</style>
