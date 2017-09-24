<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
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
</style>
