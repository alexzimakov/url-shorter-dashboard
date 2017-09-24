<script>
  export default {
    name: 'wrapper-inner',
    render(createElement) {
      return createElement(
        'div',
        {
          class: ['wrapper-inner'],
        },
        this.$slots.default,
      );
    },
  };
</script>

<style>
  .wrapper-inner {
    flex: 1;
  }
</style>
