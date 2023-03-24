<script setup>
import { useConfigStore } from '@/stores/appconf';

const config = useConfigStore();
</script>

<template>
  <Button
    text
    plain
    rounded
    icon="pi pi-cloud-upload"
    v-tooltip.bottom="$t('HD File Hosting')"
    @click="config.cloud = !config.cloud"
  />
</template>
