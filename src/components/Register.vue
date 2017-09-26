<template>
  <wrapper>
    <wrapper-inner>
      <div class="content">
        <div class="content-inner">
          <el-row>
            <el-col :xs="{ span: 22, offset: 1 }"
                    :sm="{ span: 14, offset: 5 }"
                    :md="{ span: 10, offset: 7 }">
              <div class="form-container">
                <h1>URL Shorter регистрация</h1>
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
                  @submit.native.prevent="onSubmit('registerForm')"
                  ref="registerForm"
                >
                  <el-form-item label="Имя пользователя" prop="username">
                    <el-input
                      v-model="formData.username"
                      size="large"
                    />
                  </el-form-item>
                  <el-form-item label="Email адрес" prop="email">
                    <el-input
                      size="large"
                      type="email"
                      v-model="formData.email"
                    />
                  </el-form-item>
                  <el-form-item label="Пароль" prop="password">
                    <el-input
                      size="large"
                      type="password"
                      v-model="formData.password"
                    />
                  </el-form-item>
                  <el-form-item label="Повторите пароль" prop="passwordAgain">
                    <el-input
                      size="large"
                      type="password"
                      v-model="formData.passwordAgain"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button 
                      :loading="processing"
                      native-type="submit"
                      size="large"
                      style="width: 100%;"
                      type="success"
                    >Создать аккаунт</el-button>
                  </el-form-item>
                </el-form>
                <p class="actions">
                  Уже зарегистрированы? <router-link to="/login">Войти</router-link>
                </p>
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

  export default {
    name: 'register',
    data() {
      return {
        processing: false,
        processingErrors: null,
        labelPosition: 'top',
        formData: {
          username: '',
          email: '',
          password: '',
          passwordAgain: '',
        },
        validators: {
          username: [
            {
              required: true,
              message: 'Придумайте имя пользователя.',
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
              required: true,
              min: 8,
              message: 'Введите пароль длиной не менее 8 символов.',
              trigger: 'blur',
            },
          ],
          passwordAgain: [
            {
              required: true,
              message: 'Введите пароль ещё раз.',
              trigger: 'blur',
            },
          ],
        },
      };
    },
    methods: {
      onSubmit(formName) {
        this.processing = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('api/v1/users', this.formData)
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
    ]),
  };
</script>

<style lang="scss" scopped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 100%;
  background-color: #20A0FF;
  background-image: linear-gradient(#58B7FF, #1D8CE0);

  &-inner {
    max-width: 1140px;
    width: 100%;
  }
}

.form-container {
  padding: 16px 24px;
  border-radius: 5px;
  background: #FFFFFF;

  h1 {
    margin-bottom: 40px;
    color: #324057;
    text-align: center;
  }
}

.actions {
  color: #475669;
  text-align: center;

  a {
    color: #20A0FF;
    white-space: nowrap;
  }
}
</style>
