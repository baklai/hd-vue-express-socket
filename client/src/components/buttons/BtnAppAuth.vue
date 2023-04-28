<script setup>
import { ref, inject } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

const { t } = useI18n();
const toast = useToast();
const helpdesk = inject('helpdesk');

const onLogout = async () => {
  try {
    await helpdesk.logout();
    toast.add({
      severity: 'info',
      summary: t('HD Information'),
      detail: t('Logout successfully completed'),
      life: 3000
    });
  } catch (err) {
    toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t(err.message), life: 3000 });
  }
};
</script>

<template>
  <Button
    text
    plain
    rounded
    :icon="$helpdesk.loggedIn ? 'pi pi-sign-out' : 'pi pi-sign-in'"
    v-tooltip.bottom="$helpdesk.loggedIn ? $t('Log Out') : $t('Log In')"
    @click="$helpdesk.loggedIn ? onLogout() : $router.push({ name: 'signin' })"
  />
</template>
