<script setup>
import { onMounted, watchEffect } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useErrorStore } from '@/stores/apperror';
import { useConfigStore } from '@/stores/appconf';

const toast = useToast();
const config = useConfigStore();
const errorStore = useErrorStore();

const { applyScale, onMenuToggle, toggleTheme } = config;

onMounted(() => {
  applyScale();
  onMenuToggle();
  toggleTheme();
});

watchEffect(() => {
  if (errorStore.error) {
    toast.add({ severity: 'error', summary: 'HD Error Message', detail: errorStore.error, life: 3000 });
    errorStore.clearError();
  }
});
</script>

<template>
  <Toast />
  <RouterView />
</template>

<style scoped></style>
