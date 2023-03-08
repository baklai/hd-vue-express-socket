<script setup>
import AppMenuItem from './AppMenuItem.vue';
import { useNavigationStore } from '@/stores/navigation';

const store = useNavigationStore();
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in store.navigation" :key="item">
      <AppMenuItem v-if="!item.separator" :item="item" :index="i" />
    </template>
  </ul>
</template>
