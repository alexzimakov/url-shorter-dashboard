<script>
export default {
  name: 'logout',
  render() {
    return null;
  },
  beforeMount() {
    this.$store.commit('logout');
    this.$router.push({ path: '/' });
  },
};
</script>
