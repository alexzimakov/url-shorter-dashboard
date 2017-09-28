<template>
  <wrapper>
    <l-header></l-header>
    <wrapper-inner>
      <main class="content content-centered">
        <div class="promo">
          <h1 class="promo-title">404</h1>
          <el-row class="promo-text">
            <el-col :md="{ span: 10, offset: 7 }">
              <p>Не найдено. <router-link to="/">Вернуться на главную</router-link>.</p>
            </el-col>
          </el-row>
        </div>
      </main>
    </wrapper-inner>
    <l-footer></l-footer>
  </wrapper>
</template>

<script>
import { getComponentsObject } from '@/utils';
import Wrapper from './Wrapper';
import WrapperInner from './WrapperInner';
import Header from './Header';
import Footer from './Footer';

export default {
  name: 'not-found',
  components: getComponentsObject([
    Wrapper,
    WrapperInner,
    Header,
    Footer,
  ]),
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
