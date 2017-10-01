<template>
  <wrapper>
    <l-header></l-header>
    <wrapper-inner>
      <main class="content" v-loading.fullscreen.lock="fetching">
        <back-link></back-link>
        <template v-if="link">
          <h1 v-show="link.hash" class="title">
            Информация о <a :href="url">{{ url | link }}</a>
          </h1>
          <div v-show="link.tags" class="tags">
            <router-link
              v-for="(tag, index) in link.tags"
              :key="index" :to="`/tags/${tag}`"
            >
              <el-tag type="gray">#{{ tag }}</el-tag>
            </router-link>
          </div>
          <p v-show="link.description" class="description">{{ link.description }}</p>
          <template v-if="link.clicks">
            <h2 class="chart-title">Статистика по кликам за последний месяц</h2>
            <link-statistics v-if="link.clicks" :chartData="chartData"></link-statistics>
          </template>
        </template>
      </main>
    </wrapper-inner>
    <l-footer></l-footer>
  </wrapper>
</template>

<script>
import { mapGetters } from 'vuex';
import { getComponentsObject } from '@/utils';
import env from '@/env';
import Wrapper from './Wrapper';
import WrapperInner from './WrapperInner';
import Header from './Header';
import BackLink from './BackLink';
import Footer from './Footer';
import LinkStatistics from './LinkSatistics';

export default {
  name: 'info',
  data() {
    return {
      fetching: false,
      link: null,
      serverHost: env.serverHost,
    };
  },
  computed: {
    url() {
      return `${env.serverHost}/${this.link.hash}`;
    },
    chartData() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const daysInCurrentMonth = (new Date(year, month + 1, 0)).getDate();
      const chartData = Object.entries(this.link.clicks)
        .filter(([key]) => {
          const d = new Date(key);
          return (d.getFullYear() === year && d.getMonth() === month);
        })
        .reduce((dataObject, [key, clicks]) => {
          const d = new Date(key);
          return { ...dataObject, [d.getDate()]: clicks };
        }, {});

      return {
        labels: [...Array(daysInCurrentMonth)].map((n, i) => i + 1),
        datasets: [{
          label: 'Количество кликов',
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)',
          data: [...Array(daysInCurrentMonth)].map((n, i) => {
            const monthdDay = i + 1;
            if (monthdDay in chartData) {
              return chartData[monthdDay];
            }

            return 0;
          }),
          fill: false,
        }],
      };
    },
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    fetchLink() {
      const linkId = this.$route.params.id;

      this.fetching = true;
      this.$http.get(`api/v1/links/${linkId}`)
        .then((response) => {
          const link = response.body.data.link;

          this.$store.commit('updateLinks', [link]);
          this.link = link;
        })
        .then(() => {
          if (this.$store.getters.isLoggedIn) {
            const userId = this.$store.state.session.user._id;
            const headers = { Authorization: this.$store.getters.authorizationHeader };

            return this.$http.get(`api/v1/users/${userId}/links/${linkId}`, { headers });
          }

          return null;
        })
        .then((response) => {
          if (response) {
            const link = response.body.data.link;

            this.$store.commit('updateLinks', [link]);
            this.link = link;
          }
        })
        .catch((response) => {
          if (response.status !== 403) {
            this.$message({
              message: response.body.data.error.message,
              type: 'error',
            });
          }
        })
        .then(() => {
          this.fetching = false;
        });
    },
  },
  mounted() {
    this.fetchLink();
  },
  components: getComponentsObject([
    Wrapper,
    WrapperInner,
    Header,
    BackLink,
    Footer,
    LinkStatistics,
  ]),
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: 300;
  color: #324057;
  margin-bottom: 40px;

  a {
    color: #1D8CE0;
    text-decoration: none;
  }
}

.tags {
  > * {
    margin-right: 8px;
  }
}

.description {
  font-size: 18px;
  color: #475669;
  margin-bottom: 64px;
}

.chart-title {
  color: #324057;
}
</style>
