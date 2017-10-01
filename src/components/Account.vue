<template>
  <wrapper>
    <l-header></l-header>
    <wrapper-inner>
      <main class="content">
        <h1 :style="{ marginBottom: '40px' }">Настройки аккаунта</h1>
        <el-row class="settings-section">
          <el-col :md="8" class="settings-section-info">
            <h3>Профиль</h3>
            <p class="help">Основная информация о пользователе</p>
          </el-col>
          <el-col :md="10" class="settings-section-form">
            <el-alert
              :style="{ marginBottom: '16px' }"
              title="Произошла ошибка при сохранении данных"
              type="error"
              v-show="profileDataProcessingErrors"
            >
              <ul :style="{ fontSize: '12px', paddingLeft: '16px' }">
                <li v-for="(error, field, index) in profileDataProcessingErrors" :key="field">
                  {{ error }}
                </li>
              </ul>
            </el-alert>
            <el-form
              :model="profileData"
              :rules="validators.profile"
              label-width="100px"
              ref="profileDataForm"
            >
              <el-form-item label="Логин:" prop="username">
                <el-input
                  v-if="profileEditingEnable"
                  v-model="profileData.username"
                />
                <strong v-else>{{ user.username }}</strong>
              </el-form-item>
              <el-form-item label="Email:" prop="email">
                <el-input
                  type="email"
                  v-if="profileEditingEnable"
                  v-model="profileData.email"
                />
                <strong v-else>{{ user.email }}</strong>
              </el-form-item>
              <el-form-item label="Пароль:" prop="password">
                <el-input
                  placeholder="Введите новый пароль"
                  type="password"
                  v-if="profileEditingEnable"
                  v-model="profileData.password"
                />
                <em v-else :style="{ color: '#8492A6' }">Скрыто</em>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :md="6" class="edit-mode-toggle">
            <div :style="{ marginBottom: '16px' }">
              <el-button
                :plain="true"
                @click="toggleEditingMode('profile')"
              >{{ profileEditingEnable ? 'Отменить' : 'Редактировать профиль' }}</el-button>
            </div>
            <div>
              <el-button
                :loading="profileDataProcessing"
                @click="saveProfileData"
                type="success"
                v-if="profileEditingEnable"
              >Сохранить</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row class="settings-section">
          <el-col :md="8" class="settings-section-info">
            <h3>Персональные данные</h3>
            <p class="help">Дополнительная информация о пользователе</p>
          </el-col>
          <el-col :md="10" class="settings-section-form">
            <el-alert
              :style="{ marginBottom: '16px' }"
              title="Произошла ошибка при сохранении данных"
              type="error"
              v-show="personalDataProcessingErrors"
            >
              <ul :style="{ fontSize: '12px', paddingLeft: '16px' }">
                <li v-for="(error, field, index) in personalDataProcessingErrors" :key="field">
                  {{ error }}
                </li>
              </ul>
            </el-alert>
            <el-form
              :model="personalData"
              :rules="validators.personal"
              label-width="100px"
              ref="personalDataForm"
            >
              <el-form-item label="Имя:" prop="firstName">
                <el-input
                  v-if="personalEditingEnable"
                  v-model="personalData.firstName"
                />
                <strong v-else-if="user.firstName">{{ user.firstName }}</strong>
                <em v-else :style="{ color: '#8492A6' }">Не настроено</em>
              </el-form-item>
              <el-form-item label="Фамилия:" prop="lastName">
                <el-input
                  v-if="personalEditingEnable"
                  v-model="personalData.lastName"
                />
                <strong v-else-if="user.firstName">{{ user.lastName }}</strong>
                <em v-else :style="{ color: '#8492A6' }">Не настроено</em>
              </el-form-item>
              <el-form-item label="Пол:" prop="gender">
                <template v-if="personalEditingEnable">
                  <el-radio
                    label="male"
                    v-model="personalData.gender"
                  >Мужской</el-radio>
                  <el-radio
                    label="female"
                    v-model="personalData.gender"
                  >Женский</el-radio>
                </template>
                <strong v-else-if="user.gender === 'male'">Мужской</strong>
                <strong v-else-if="user.gender === 'female'">Женский</strong>
                <em v-else :style="{ color: '#8492A6' }">Не настроено</em>
              </el-form-item>
              <el-form-item label="Родились:" prop="birthDate">
                <el-date-picker
                  v-if="personalEditingEnable"
                  v-model="personalData.birthDate"
                  placeholder="Укажите дату рождения"
                />
                <strong v-else-if="user.birthDate">{{ user.birthDate | date('LL') }}</strong>
                <em v-else :style="{ color: '#8492A6' }">Не настроено</em>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :md="6" class="edit-mode-toggle">
            <div :style="{ marginBottom: '16px' }">
              <el-button
                :plain="true"
                @click="toggleEditingMode('personal')"
              >{{ personalEditingEnable ? 'Отменить' : 'Изменить персональные данные' }}</el-button>
            </div>
            <div>
              <el-button
                :loading="personalDataProcessing"
                @click="savePersonalData"
                type="success"
                v-if="personalEditingEnable"
              >Сохранить</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row class="settings-section">
          <el-col :md="8" class="settings-section-info">
            <h3>Удаление аккаунта</h3>
          </el-col>
          <el-col :md="16">
            <el-dialog
              :show-close="false"
              :visible.sync="deleteAccountDialogVisible"
              size="tiny"
              title="Вы действительно хотите удалить аккаунт?"
            >
              <span>Это действие необратимо.</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="deleteAccountDialogVisible = false">Отменить</el-button>
                <el-button
                  @click="deleteAccount"
                  type="danger"
                  v-loading.fullscreen.lock="accountDeletingProcessing"
                >Удалить</el-button>
              </span>
            </el-dialog>
            <el-button type="danger" @click="deleteAccountDialogVisible = true">
              Удалить аккаунт
            </el-button>
          </el-col>
        </el-row>
      </main>
    </wrapper-inner>
    <l-footer></l-footer>
  </wrapper>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getComponentsObject } from '@/utils';
import Wrapper from './Wrapper';
import WrapperInner from './WrapperInner';
import Header from './Header';
import Footer from './Footer';

/* eslint no-useless-escape: off */
export default {
  name: 'account',
  components: getComponentsObject([
    Wrapper,
    WrapperInner,
    Header,
    Footer,
  ]),
  data() {
    return {
      profileEditingEnable: false,
      profileDataProcessing: false,
      profileDataProcessingErrors: null,
      profileData: {
        username: '',
        email: '',
        password: '',
      },
      personalEditingEnable: false,
      personalDataProcessing: false,
      personalDataProcessingErrors: null,
      personalData: {
        firsName: '',
        lastName: '',
        gender: '',
        birthDate: '',
      },
      validators: {
        profile: {
          username: [
            {
              required: true,
              message: 'Это поле не должно быть пустым.',
              trigger: 'blur',
            },
            {
              min: 3,
              message: 'Минимальное допустимое количество символов: 3.',
              trigger: 'blur',
            },
            {
              pattern: /^[A-Za-z0-9_-]+$/,
              message: 'Можно использовать только буквы латинского алфавита (A-Z a-z), цифры, знак подчёркивания и дефис.',
              trigger: 'blur',
            },
          ],
          email: [
            {
              required: true,
              type: 'email',
              message: 'Введите действительный email адрес.',
              trigger: 'blur',
            },
          ],
          password: [
            {
              min: 8,
              message: 'Введите пароль длиной не менее 8 символов.',
              trigger: 'blur',
            },
          ],
        },
        personal: {
          firstName: [
            {
              pattern: /^[^\s\d.,\/#!$%\^&\*;:{}=\_`~()]+$/,
              message: 'Можно использовать только буквы и дефис.',
              trigger: 'blur',
            },
          ],
          lastName: [
            {
              pattern: /^[^\s\d.,\/#!$%\^&\*;:{}=\_`~()]+$/,
              message: 'Можно использовать только буквы и дефис.',
              trigger: 'blur',
            },
          ],
          gender: [
            {
              type: 'enum',
              enum: ['male', 'female'],
              trigger: 'blur',
            },
          ],
        },
      },
      deleteAccountDialogVisible: false,
      accountDeletingProcessing: false,
    };
  },
  computed: {
    ...mapState({ user: state => state.session.user }),
    ...mapGetters({ Authorization: 'authorizationHeader' }),
  },
  methods: {
    initializeProfileData() {
      this.profileData = {
        username: this.user.username,
        email: this.user.email,
      };
    },
    initializePersonalData() {
      this.personalData = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        gender: this.user.gender,
        birthDate: this.user.birthDate,
      };
    },
    toggleEditingMode(sectionName) {
      switch (sectionName) {
        case 'profile':
          this.profileEditingEnable = !this.profileEditingEnable;
          this.profileDataProcessingErrors = null;
          this.initializeProfileData();
          break;
        case 'personal':
          this.personalEditingEnable = !this.personalEditingEnable;
          this.personalDataProcessingErrors = null;
          this.initializePersonalData();
          break;
        default:
          break;
      }
    },
    getBodyObject(data, updatedFields = [], nonEmptyFields = []) {
      const body = {};

      updatedFields.forEach((field) => {
        if (this.user[field] !== data[field]) {
          body[field] = data[field];
        }
      });

      nonEmptyFields.forEach((field) => {
        if (data[field]) {
          body[field] = data[field];
        }
      });

      return body;
    },
    saveProfileData() {
      this.profileDataProcessing = true;
      this.$refs.profileDataForm.validate((valid) => {
        if (valid) {
          const userId = this.user._id;
          const body = this.getBodyObject(this.profileData, ['username', 'email'], ['password']);
          const headers = { Authorization: this.Authorization };

          this.$http.put(`api/v1/users/${userId}`, body, { headers })
            .then((response) => {
              this.$store.commit('updateUser', response.body.data.user);
              this.profileDataProcessingErrors = null;
              this.profileData.password = '';
              this.profileDataProcessing = false;
            })
            .catch((response) => {
              if (response.status === 0) {
                this.profileDataProcessingErrors = {
                  network: 'Сервер временно недоступен. Попробуйте позже.',
                };
              } else if (response.body.status === 'fail') {
                this.profileDataProcessingErrors = response.body.data.error.meta.body;
              } else if (response.body.status === 'error') {
                this.profileDataProcessingErrors = {
                  serverError: response.body.data.error.message,
                };
              }
            })
            .then(() => {
              this.profileEditingEnable = false;
            });
        } else {
          this.profileData.password = '';
          this.profileDataProcessing = false;
        }
      });
    },
    savePersonalData() {
      this.personalDataProcessing = true;
      this.$refs.personalDataForm.validate((valid) => {
        if (valid) {
          const userId = this.user._id;
          const body = this.getBodyObject(this.personalData, ['firstName', 'lastName', 'gender', 'birthDate']);
          const headers = { Authorization: this.Authorization };

          this.$http.put(`api/v1/users/${userId}`, body, { headers })
            .then((response) => {
              this.$store.commit('updateUser', response.body.data.user);

              return true;
            })
            .catch((response) => {
              if (response.status === 0) {
                this.personalDataProcessingErrors = {
                  network: 'Сервер временно недоступен. Попробуйте позже.',
                };
              } else if (response.body.status === 'fail') {
                this.personalDataProcessingErrors = response.body.data.error.meta.body;
              } else if (response.body.status === 'error') {
                this.personalDataProcessingErrors = {
                  serverError: response.body.data.error.message,
                };
              }

              return false;
            })
            .then((success) => {
              if (success) {
                this.personalDataProcessingErrors = null;
                this.personalEditingEnable = false;
              }

              this.personalDataProcessing = false;
            });
        } else {
          this.personalDataProcessing = false;
        }
      });
    },
    deleteAccount() {
      const userId = this.user._id;
      const headers = { Authorization: this.Authorization };

      this.accountDeletingProcessing = true;
      this.$http.delete(`api/v1/users/${userId}`, { headers })
        .then((response) => {
          if (response.body.data.deletedCount > 0) {
            this.$store.commit('logout');
            this.$router.push({ path: '/' });
          } else {
            throw new Error('При удалении аккаунта произошла ошибка.');
          }
        })
        .catch(() => {
          this.$message.error('При удалении аккаунта произошла ошибка.');
        })
        .then(() => {
          this.accountDeletingProcessing = false;
        });
    },
  },
  created() {
    this.initializeProfileData();
    this.initializePersonalData();
  },
};
</script>

<style lang="scss" scoped>
.settings-section {
  border-bottom: 1px solid #D3DCE6;
  padding-bottom: 16px;
  margin-bottom: 40px;

  &:last-child {
    border-bottom: none;
  }

  &-info {
    > h3 {
      margin-top: 0;
    }
  }

  &-form {
    > p {
      margin-top: 0;
    }
  }
}

.edit-mode-toggle {
  @media (min-width: 992px) {
    text-align: right;
  }
}
</style>

<style lang="scss">
.el-form-item.is-required .el-form-item__label:before {
  content: none;
}
</style>


