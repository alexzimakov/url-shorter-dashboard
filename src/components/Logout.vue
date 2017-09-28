<script>
export default {
  name: 'logout',
  beforeMount() {
    this.$store.commit('logout');
    this.$router.push({ path: '/' });
  },
};
</script>
