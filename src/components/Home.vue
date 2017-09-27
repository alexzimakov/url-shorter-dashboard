<template>
  <wrapper>
    <l-header></l-header>
    <wrapper-inner>
      <home-auth-content v-if="isLoggedIn"></home-auth-content>
    </wrapper-inner>
    <l-footer></l-footer>
  </wrapper>
</template>

<script>
import { mapGetters } from 'vuex';
import { getComponentsObject } from '@/utils';
import Wrapper from './Wrapper';
import WrapperInner from './WrapperInner';
import Header from './Header';
import Footer from './Footer';
import HomeAuthContent from './HomeAuthContent';

export default {
  name: 'home',
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  components: getComponentsObject([
    Wrapper,
    WrapperInner,
    Header,
    Footer,
    HomeAuthContent,
  ]),
};
</script>
