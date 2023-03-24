<script setup>
import { useConfigStore } from '@/stores/appconf';

const config = useConfigStore();
</script>

<template>
  <Button
    text
    plain
    rounded
    :icon="config.isDarkTheme ? 'pi pi-sun' : 'pi pi-moon'"
    v-tooltip.bottom="config.isDarkTheme ? $t('Theme Light') : $t('Theme Dark')"
    @click="config.isDarkTheme ? (config.theme = 'light') : (config.theme = 'dark')"
  />
</template>
