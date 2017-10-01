<template>
  <el-tooltip
    :content="tooltip"
    class="item"
    effect="dark"
    placement="right"
  >
    <router-link class="back-link" :to="to">
      <i class="back-link-icon el-icon-fa-arrow-circle-left" aria-hidden="true"></i>
    </router-link>
  </el-tooltip>
</template>

<script>
export default {
  name: 'back-link',
  props: {
    to: {
      type: String,
      default: '/',
    },
    tooltip: {
      type: String,
      default: 'Вернуться домой',
    },
  },
};
</script>

<style lang="scss">
.back-link {
  color: #99a9BF;

  &:hover {
    color: #475669;
  }

  &-icon:before {
    font-size: 24px;
  }
}
</style>

