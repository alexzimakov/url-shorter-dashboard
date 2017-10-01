<template>
  <footer class="footer">
    <div class="footer-inner">
      <p class="copyright">&copy; {{ (new Date).getFullYear() }} {{ hostname }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'l-footer',
  data() {
    return {
      hostname: location.hostname,
    };
  },
};
</script>

<style>
.footer {
  box-shadow: 0 0 0 1px #E5E9F2;
}
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: auto;
  margin-left: auto;
  min-height: 48px;
  max-width: 1140px;
  width: 100%;
}
.copyright {
  margin: 0;
  padding: 0;
  color: #99A9BF;
  font-size: 14px;
}
</style>
