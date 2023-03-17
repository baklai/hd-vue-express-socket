<script setup>
import { ref, inject } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

const { t } = useI18n();
const toast = useToast();
const auth = inject('auth');

const login = ref(null);
const password = ref(null);
const remember = ref(false);

const rules = {
  login: { required },
  password: { required, minLength: minLength(6) }
};

const $v = useVuelidate(rules, { login, password });

const onLogin = async () => {
  const valid = await $v.value.$validate();
  if (valid) {
    try {
      await auth.login({ data: { login: login.value, password: password.value } });
      toast.add({ severity: 'success', detail: t('Welcome to service'), life: 3000 });
    } catch (err) {
      toast.add({ severity: 'error', detail: t(err.message), life: 3000 });
    }
  } else {
    toast.add({ severity: 'warn', detail: t('Input login and password'), life: 3000 });
  }
};
</script>

<template>
  <form @submit.prevent="onLogin" class="p-fluid">
    <div class="field my-2">
      <label for="login" class="block text-900 text-xl font-medium">
        {{ $t('Login') }}
      </label>

      <InputText
        id="login"
        type="text"
        v-model.trim="login"
        :placeholder="$t('Login')"
        :class="{ 'p-invalid': !!$v.login.$errors.length }"
      />

      <small class="p-error" v-for="error in $v.login.$errors" :key="error.$uid">
        {{ $t(error.$message) }}
      </small>
    </div>

    <div class="field my-2">
      <label for="password" class="block text-900 text-xl font-medium">
        {{ $t('Password') }}
      </label>

      <Password
        toggleMask
        id="password"
        v-model.trim="password"
        :placeholder="$t('Password')"
        :promptLabel="$t('Choose a password')"
        :weakLabel="$t('Too simple')"
        :mediumLabel="$t('Average complexity')"
        :strongLabel="$t('Complex password')"
        :class="{ 'p-invalid': !!$v.password.$errors.length }"
      >
        <template #header>
          <h6>{{ $t('Pick a password') }}</h6>
        </template>
        <template #footer>
          <Divider />
          <p class="mt-2">{{ $t('Suggestions') }}</p>
          <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
            <li>{{ $t('At least one lowercase') }}</li>
            <li>{{ $t('At least one uppercase') }}</li>
            <li>{{ $t('At least one numeric') }}</li>
            <li>{{ $t('Minimum 6 characters') }}</li>
          </ul>
        </template>
      </Password>

      <small class="p-error" v-for="error in $v.password.$errors" :key="error.$uid">
        {{ $t(error.$message) }}
      </small>
    </div>

    <div class="field">
      <div class="flex align-items-center justify-content-between">
        <div class="flex align-items-center">
          <Checkbox v-model="remember" binary id="remember" class="mr-2" />
          <label for="remember">{{ $t('Remember me') }}</label>
        </div>

        <Button link :label="$t('Forgot password?')" class="w-auto" />
      </div>
    </div>

    <div class="field">
      <Button
        text
        plain
        outlined
        type="submit"
        class="w-full p-3 text-xl text-center hover:text-color"
        :label="$t('Sign In')"
      />
    </div>
  </form>
</template>
