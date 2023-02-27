<script setup>
import { ref, inject } from 'vue';

const useAuth = inject('auth');

const auth = useAuth();

const email = ref('');
const password = ref('');
const checked = ref(false);

const Login = () => {
  auth.login({
    login: 'root',
    password: 'rhtvfnjhbq'
  });
};
</script>

<template>
  <div class="bg-app surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <div class="content">
        <div class="w-full surface-card py-6 px-6 sm:px-6" style="border-radius: 32px">
          <div class="text-center mb-3">
            <img src="/img/logo-app.webp" alt="App Logo" width="96" height="96" class="mr-2" />
            <p class="text-600 font-medium">Web Application of technical support department</p>
            <p class="text-300">Enter your login and password to sign in</p>
          </div>
          <div>
            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-3" style="padding: 1rem" v-model="email" />
            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
            <Password
              id="password1"
              v-model="password"
              placeholder="Password"
              :toggleMask="true"
              class="w-full mb-3"
              inputClass="w-full"
              inputStyle="padding:1rem"
            />
            <div class="flex align-items-center justify-content-between mb-6 gap-5">
              <div class="flex align-items-center">
                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                <label for="rememberme1">Remember me</label>
              </div>
              <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
            </div>
            <Button label="Sign In" class="w-full p-3 text-xl" @click="Login"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-app {
  background-image: url('/img/bg-app.webp');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
.content {
  border-radius: 32px;

  padding: 0.3rem;
  background: linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%);
}
</style>
