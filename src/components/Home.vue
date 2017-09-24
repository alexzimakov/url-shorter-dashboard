<template>
  <wrapper>
    <l-header></l-header>
    <wrapper-inner>
      <router-view></router-view>
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
    name: 'app',
    components: getComponentsObject([
      Wrapper,
      WrapperInner,
      Header,
      Footer,
    ]),
  };
</script>

<style>
</style>
