<template>
  <wrapper>
    <wrapper-inner>
      <div class="fullpage-content">
        <div class="fullpage-content-inner">
          <el-row>
            <el-col :xs="{ span: 22, offset: 1 }"
                    :sm="{ span: 14, offset: 5 }"
                    :md="{ span: 10, offset: 7 }">
              <div class="form-container">
                <back-link></back-link>
                <h1>URL Shorter вход</h1>
                <el-alert
                  :style="{ marginBottom: '16px' }"
                  title="Произошла ошибка во время аутентификации"
                  type="error"
                  v-show="processingErrors"
                >
                  <ul :style="{ fontSize: '12px', paddingLeft: '16px' }">
                    <li v-for="(error, field, index) in processingErrors" :key="field">
                      {{ error }}
                    </li>
                  </ul>
                </el-alert>
                <el-form
                  :label-position="labelPosition"
                  :model="formData"
                  :rules="validators"
                  @submit.native.prevent="onSubmit('loginForm')"
                  ref="loginForm"
                >
                  <el-form-item prop="username">
                    <el-input 
                      name="username"
                      placeholder="Имя пользователя"
                      size="large"
                      v-model="formData.username"
                    />
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      :icon="passwordIsVisible ? 'fa-eye' : 'fa-eye-slash'"
                      :on-icon-click="togglePasswordVisibility"
                      :type="passwordIsVisible ? 'text' : 'password'"
                      name="password"
                      placeholder="Пароль"
                      size="large"
                      v-model="formData.password"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      :loading="processing"
                      native-type="submit"
                      size="large"
                      style="width: 100%;"
                      type="success"
                    >Войти</el-button>
                  </el-form-item>
                </el-form>
                <div class="form-container-footer">
                  Ещё не зарегистрированы? <router-link to="/register">Создать аккаунт</router-link>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </wrapper-inner>
  </wrapper>
</template>

<script>
import { getComponentsObject } from '@/utils';
import Wrapper from './Wrapper';
import WrapperInner from './WrapperInner';
import BackLink from './BackLink';

export default {
  name: 'login',
  data() {
    return {
      processing: false,
      processingErrors: null,
      labelPosition: 'top',
      passwordIsVisible: false,
      formData: {
        username: '',
        password: '',
      },
      validators: {
        username: [
          {
            required: true,
            message: 'Введите имя пользователя.',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: 'Введите пароль.',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordIsVisible = !this.passwordIsVisible;
    },
    onSubmit(formName) {
      this.processing = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('services/login', this.formData)
            .then((response) => {
              const { authData: { token }, user } = response.body.data;

              this.$store.commit('authenticate', { token, user });
              this.$router.push({ path: '/' });
            })
            .catch((response) => {
              if (response.status === 0) {
                this.processingErrors = { network: 'Сервер временно недоступен. Попробуйте позже.' };
              } else if (response.body.status === 'fail') {
                this.processingErrors = response.body.data.error.meta.body;
              } else if (response.body.status === 'error') {
                this.processingErrors = { serverError: response.body.data.error.message };
              }
            })
            .then(() => {
              this.processing = false;
            });
        } else {
          this.processing = false;
        }
      });
    },
  },
  components: getComponentsObject([
    Wrapper,
    WrapperInner,
    BackLink,
  ]),
};
</script>
