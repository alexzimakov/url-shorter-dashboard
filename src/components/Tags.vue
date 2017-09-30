<template>
  <wrapper>
    <l-header></l-header>
    <wrapper-inner>
      <div style="width: 100%;">
        <main class="content">
          <div class="headline">#{{ $route.params.tag }}</div>
          <el-row>
            <el-col :md="{ span: 20, offset: 2 }">
              <el-table
                :data="links"
                :show-header="links.length > 0"
                empty-text="Ссылок с таким тегом не найдено."
                v-loading.body="fetching"
                width="100%"
                :fit="true"
              >
                <el-table-column type="expand">
                  <template scope="props">
                    <p>Короткое описание: {{ props.row.description || 'отсутствует' }}</p>
                  </template>
                </el-table-column>

                <el-table-column prop="url" label="URL">
                  <template scope="props">
                    <a
                      :href="props.row.url"
                      :style="{ padding: 0, whiteSpace: 'nowrap' }"
                      class="link"
                      target="_blank"
                    >{{ props.row.url | link }}</a>
                  </template>
                </el-table-column>

                <el-table-column prop="shortenUrl" label="Короткая ссылка">
                  <template scope="props">
                    <a
                      :href="props.row.shortenUrl"
                      :style="{ padding: 0, whiteSpace: 'nowrap' }"
                      class="link"
                      target="_blank"
                    >{{ props.row.shortenUrl | link }}</a>
                  </template>
                </el-table-column>

                <el-table-column prop="tags" label="Теги">
                  <template scope="props">
                    <div class="tags">
                      <router-link
                        v-for="tag in props.row.tags"
                        :to="`/tags/${tag}`"
                        :key="tag"
                      >
                        <el-tag>
                          #{{ tag }}
                        </el-tag>
                      </router-link>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column prop="createdAt" label="Создана">
                  <template scope="props">
                    <span :style="{ padding: 0 }">
                      {{ props.row.createdAt | date(null, true) }}
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </main>
      </div>
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

export default {
  name: 'home',
  data() {
    return {
      fetching: false,
    };
  },
  computed: mapGetters({ links: 'filteredLinksByTag' }),
  methods: {
    fetchLinks() {
      const tag = this.$route.params.tag;

      this.fetching = true;
      this.$store.commit('setFiltersForLinks', { tags: tag });
      this.$http.get(`api/v1/links?filter[tags]=${tag}`)
        .then((response) => {
          const { links } = response.body.data;
          this.$store.commit('updateLinks', links);
        })
        .catch(() => false)
        .then(() => {
          this.fetching = false;
        });
    },
  },
  created() {
    this.fetchLinks();
  },
  watch: {
    $route: 'fetchLinks',
  },
  components: getComponentsObject([
    Wrapper,
    WrapperInner,
    Header,
    Footer,
  ]),
};
</script>

<style lang="scss">
.headline {
  padding: 32px 0;
  text-align: center;
  font-weight: 800;
  color: #8492A6;
  font-size: 56px;
  margin-bottom: 24px;
}

.tags {
  padding: 4px 0;
  > * {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.link {
  color: #1D8CE0;
  text-decoration: none;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
}
</style>

