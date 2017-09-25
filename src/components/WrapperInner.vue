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
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
}
</style>
