<script setup>
import { ref, inject } from 'vue';

const email = ref('');
const password = ref('');
const checked = ref(false);

const auth = inject('auth');

// const auth = useAuth();

const Login = () => {
  auth.login({
    data: {
      login: 'root',
      password: 'rhtvfnjhbq'
    }
  });
};
</script>

<template>
  <div class="field">
    <label for="login" class="block text-900 text-xl font-medium mb-2"> Login </label>
    <InputText id="login" type="text" placeholder="Login" class="w-full mb-3" style="padding: 1rem" />
  </div>

  <div class="field">
    <label for="password1" class="block text-900 font-medium text-xl mb-2"> Password </label>
    <Password id="password1" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem" />
  </div>

  <div class="field">
    <div class="flex align-items-center justify-content-between mb-6 gap-5">
      <div class="flex align-items-center">
        <Checkbox id="rememberme1" binary class="mr-2"></Checkbox>
        <label for="rememberme1">Remember me</label>
      </div>
      <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)"> Forgot password? </a>
    </div>
  </div>

  <div class="field">
    <Button label="Sign In" class="w-full p-3 text-xl" @click="Login"></Button>
  </div>
</template>
