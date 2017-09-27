<template>
  <main class="content">
    <el-row>
      <el-col :md="{ span: 8 }">
        <h4>Сократить новую ссылку</h4>
        <div v-show="processingErrors" class="errors-box">
          <ul>
            <li v-for="(error, field, index) in processingErrors" :key="field">
              {{ error }}
            </li>
          </ul>
        </div>
        <el-form
          :label-position="labelPosition"
          :model="formData"
          :rules="validators"
          ref="shortenUrlForm"
          @submit.native.prevent="submitForm('shortenUrlForm')"
        >
          <el-form-item label="URL адрес" prop="url">
            <el-input
              auto-complete="on"
              type="url"
              v-model="formData.url"
            />
          </el-form-item>
          <el-form-item label="Теги" prop="tags">
            <el-input
              auto-complete="on"
              v-model="formData.tags"
            />
            <span class="help">Разделяйте теги знаком #</span>
          </el-form-item>
          <el-form-item prop="description" label="Краткое описание">
            <el-input
              type="textarea"
              v-model="formData.description"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              native-type="submit"
              :loading="processing"
            >Сократить url</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      
      <el-col :md="{ span: 15, offset: 1 }">
        <h4>Сокращённые ссылки</h4>
        <el-table
          v-loading.body="fetching"
          :data="links" style="width: 100%"
          :default-sort="{ prop: 'createdAt', order: 'descending' }"
          :show-header="links.length > 0"
          empty-text="Нет сокращённых ссылок."
        >          
          <el-table-column prop="url" label="URL">
            <template scope="props">
              <a class="cell link" :href="props.row.url">{{ props.row.url | link }}</a>
            </template>
          </el-table-column>
          
          <el-table-column prop="shortenUrl" label="Короткая ссылка">
            <template scope="props">
              <a class="cell link" :href="props.row.shortenUrl" target="_blank">{{ props.row.shortenUrl | link }}</a>
            </template>
          </el-table-column>
          
          <el-table-column prop="createdAt" label="Создана" width="160">
            <template scope="props">
              <span class="cell">{{ props.row.createdAt | date(null, true) }}</span>
            </template>
          </el-table-column>
          
          <el-table-column prop="clicks" label="Клики" width="88">
            <template scope="props">
              <span class="cell">{{ props.row.clicks }}</span>
            </template>
          </el-table-column>
          
          <el-table-column width="56">
            <template scope="props">
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  <i slot="reference" class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="dropdown-item" :command="`info:${props.row.id}`">
                    Подробнее
                  </el-dropdown-item>
                  <el-dropdown-item class="dropdown-item" :command="`delete:${props.row.id}`">
                    Удалить
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import { parseTagsString } from '@/utils';
import env from '@/env';

export default {
  name: 'home-auth-content',
  data() {
    return {
      labelPosition: 'top',
      fetching: false,
      processing: false,
      processingErrors: false,
      formData: {
        url: '',
        tags: '',
        description: '',
      },
      validators: {
        url: [
          {
            required: true,
            message: 'Это поле не должно быть пустым.',
            trigger: 'blur',
          },
          {
            type: 'url',
            message: 'Введите корректный URL адрес.',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: mapState({
    links: state => Object.entries(state.links).map(([id, link]) => ({
      id,
      url: link.url,
      shortenUrl: `${env.serverHost}/${link.hash}`,
      createdAt: new Date(link.createdAt),
      clicks: Object.values(link.clicks).reduce((total, num) => total + num, 0),
    })),
  }),
  methods: {
    handleResponseErrors(response) {
      if (response.status === 0) {
        this.processingErrors = { network: 'Сервер временно недоступен. Попробуйте позже.' };
      } else if (response.body.status === 'fail') {
        this.processingErrors = response.body.data.error.meta.body;
      } else if (response.body.status === 'error') {
        this.processingErrors = { serverError: response.body.data.error.message };
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.processing = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const body = { ...this.formData, tags: parseTagsString(this.formData.tags) };
          const headers = { Authorization: this.$store.getters.authorizationHeader };

          this.$http.post('api/v1/links', body, { headers })
            .then((response) => {
              this.$store.commit('updateLinks', [response.body.data.link]);
              this.resetForm(formName);
            })
            .catch((response) => {
              this.handleResponseErrors(response);
            })
            .then(() => {
              this.processing = false;
            });
        } else {
          this.processing = false;
        }
      });
    },
    deleteLink(id) {
      const headers = { Authorization: this.$store.getters.authorizationHeader };

      this.fetching = true;
      this.$http.delete(`api/v1/links/${id}`, { headers })
        .then((response) => {
          if (response.body.data.deletedCount === 1) {
            this.$store.commit('deleteLink', id);
          }
        })
        .catch((response) => {
          this.handleResponseErrors(response);
        })
        .then(() => {
          this.fetching = false;
        });
    },
    handleCommand(command) {
      const [action, id] = command.split(':');

      switch (action) {
        case 'info':
          this.$router.push({ path: `/info/${id}` });
          break;
        case 'delete':
          this.deleteLink(id);
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    const userId = this.$store.state.session.user._id;
    const headers = { Authorization: this.$store.getters.authorizationHeader };

    this.fetching = true;
    this.$http.get(`api/v1/users/${userId}/links`, { headers })
      .then((response) => {
        this.$store.commit('updateLinks', response.body.data.links);
      })
      .catch((response) => {
        this.handleResponseErrors(response);
      })
      .then(() => {
        this.fetching = false;
      });
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  padding: 16px;
  box-sizing: border-box;
}

.cell {
  white-space: nowrap;
  padding: 0;
}

.link {
  color: #1D8CE0;
  text-decoration: none;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
}

.dropdown-item {
  font-size: 14px;

  * {
    color: inherit;
    text-decoration: inherit;
  }
}
</style>