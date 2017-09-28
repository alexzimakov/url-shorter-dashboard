<template>
  <main class="content content-centered">
    <div class="promo">
      <h1 class="promo-title">Добро пожаловать</h1>
      <el-row class="promo-text">
        <el-col :md="{ span: 10, offset: 7 }">
          <p>Для того, что иметь возможность сокращать ссылки 
            <router-link to="/register">создайте аккаунт</router-link> или <router-link to="/login">войдите</router-link>.</p>
        </el-col>
      </el-row>
    </div>
  </main>
</template>

<script>
export default {
  name: 'home-guest-content',
};
</script>

<style lang="scss" scoped>
.content-centered {
  display: flex;
  min-height: calc(100vh - 120px);
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.promo {
  text-align: center;
  min-width: 100%;

  &-title {
    color: #324057;
    font-weight: 400;
    font-size: 48px;
    margin-top: 0;
  }

  &-text {
    color: #475669;
    font-size: 20px;
    line-height: 1.5;
    font-weight: 300;

    a {
      color: #1D8CE0;
      text-decoration: none;
    }
  }
}
</style>