<script setup>
import { onMounted, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

import { useError } from '@/stores/error';
import { useConfig } from '@/stores/config';

const { t, locale } = useI18n();
const toast = useToast();

const Config = useConfig();
const Error = useError();

onMounted(() => {
  Config.applyScale();
  Config.onMenuToggle();
  Config.toggleTheme();
  Config.toggleLang();
});

watchEffect(() => {
  if (Error.error) {
    toast.add({ severity: 'error', summary: t('HD Error'), detail: t(Error.error), life: 3000 });
    Error.clearError();
  }
});
</script>

<template>
  <ScrollTop />

  <RouterView />

  <Toast class="z-100" />
  <ConfirmDialog :style="{ minWidth: '350px' }">
    <template #message="slotProps">
      <div class="flex align-items-center justify-content-start confirmation-content">
        <i class="text-4xl mr-3" :class="slotProps.message.icon" />
        <span class="font-medium">{{ slotProps.message.message }} </span>
      </div>
    </template>
  </ConfirmDialog>
</template>

<style scoped>
.p-scrolltop.p-link {
  background: var(--primary-color);
}
</style>
