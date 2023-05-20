<script setup>
import { onMounted, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

import { useError } from '@/stores/apperror';
import { useConfig } from '@/stores/appconf';

const { t } = useI18n();
const toast = useToast();

const Config = useConfig();
const Error = useError();

onMounted(() => {
  Config.applyScale();
  Config.onMenuToggle();
  Config.toggleTheme();
});

watchEffect(() => {
  if (Error.error) {
    toast.add({ severity: 'error', summary: t('HD Error'), detail: t(Error.error), life: 3000 });
    Error.clearError();
  }
});
</script>

<template>
  <Toast class="z-100" />
  <ScrollTop />
  <RouterView />
</template>

<style scoped>
.p-scrolltop.p-link {
  background: var(--primary-color);
}
</style>
