<script setup>
import { watchEffect } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useErrorStore } from '@/stores/error';

const toast = useToast();
const errorStore = useErrorStore();

watchEffect(() => {
  if (errorStore.error) {
    toast.add({ severity: 'error', summary: 'HD Error Message', detail: errorStore.error, life: 3000 });
    errorStore.clearError();
  }
});
</script>

<template>
  <Toast />
  <component :is="$route.meta.layout || 'div'">
    <RouterView />
  </component>
</template>

<style scoped></style>
