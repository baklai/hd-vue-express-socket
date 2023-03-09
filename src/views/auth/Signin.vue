<script setup>
import { ref, inject } from 'vue';

const login = ref(null);
const password = ref(null);
const remember = ref(false);

const auth = inject('auth');

const Login = () => {
  auth.login({
    data: {
      login: login.value,
      password: password.value
    }
  });
};
</script>

<template>
  <div class="field">
    <label for="login" class="block text-900 text-xl font-medium mb-2"> Login </label>
    <InputText
      v-model="login"
      id="login"
      type="text"
      placeholder="Login"
      class="w-full mb-3"
      style="padding: 1rem"
    />
  </div>

  <div class="field">
    <label for="password1" class="block text-900 font-medium text-xl mb-2"> Password </label>
    <Password
      v-model="password"
      id="password1"
      placeholder="Password"
      :toggleMask="true"
      class="w-full mb-3"
      inputClass="w-full"
      inputStyle="padding:1rem"
    />
  </div>

  <div class="field">
    <div class="flex align-items-center justify-content-between mb-6 gap-5">
      <div class="flex align-items-center">
        <Checkbox v-model="remember" id="rememberme1" binary class="mr-2"></Checkbox>
        <label for="rememberme1">Remember me</label>
      </div>
      <Button label="Forgot password?" link></Button>
    </div>
  </div>

  <div class="field">
    <Button
      text
      plain
      outlined
      label="Sign In"
      class="w-full p-3 text-xl text-center hover:text-color"
      @click="Login"
    />
  </div>
</template>
