<script>
  export default {
    name: 'wrapper',
    render(createElement) {
      return createElement(
        'div',
        {
          class: ['wrapper'],
        },
        this.$slots.default,
      );
    },
  };
</script>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
