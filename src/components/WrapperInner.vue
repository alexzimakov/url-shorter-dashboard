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

<style lang="scss">
.wrapper-inner {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
}

.fullpage-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  background-color: #20A0FF;
  background-image: linear-gradient(#58B7FF, #1D8CE0);

  &-inner {
    max-width: 1140px;
    width: 100%;
  }
}

.form-container {
  padding: 16px 24px;
  border-radius: 5px;
  background: #FFFFFF;
  margin: 16px 0;

  h1 {
    margin-bottom: 40px;
    color: #324057;
    text-align: center;
  }

  &-footer {
    color: #475669;
    text-align: center;
  }
}
</style>
