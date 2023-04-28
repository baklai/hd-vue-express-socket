<script setup>
import { onMounted, watchEffect, inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useErrorStore } from '@/stores/apperror';
import { useConfigStore } from '@/stores/appconf';

const { t } = useI18n();
const toast = useToast();
const config = useConfigStore();
const errorStore = useErrorStore();
const helpdesk = inject('helpdesk');

const { applyScale, onMenuToggle, toggleTheme } = config;

onMounted(async () => {
  applyScale();
  onMenuToggle();
  toggleTheme();
  // try {
  //   await helpdesk.init();
  // } catch (err) {}
});

watchEffect(() => {
  if (errorStore.error) {
    toast.add({
      severity: 'error',
      summary: t('HD Error'),
      detail: t(errorStore.error),
      life: 3000
    });
    errorStore.clearError();
  }
});
</script>

<template>
  <Toast />
  <ScrollTop />
  <RouterView />
</template>

<style scoped>
.p-scrolltop.p-link {
  background: var(--primary-color);
}
</style>
