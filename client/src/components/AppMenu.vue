<script setup>
import AppMenuItem from './AppMenuItem.vue';
import { useNavigationStore } from '@/stores/navigation';

const store = useNavigationStore();

console.log(store.navigation);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, index) in store.navigation" :key="item">
      <AppMenuItem v-if="!item.separator" :item="item" :index="index" />
    </template>
  </ul>
</template>
