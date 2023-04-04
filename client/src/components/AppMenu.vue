<script setup>
import AppMenuItem from '@/components/AppMenuItem.vue';
import { useNavigationStore } from '@/stores/navigation';

const store = useNavigationStore();
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, index) in store.navigation" :key="item">
      <AppMenuItem v-if="!item.separator" :item="item" :index="index" />
    </template>
  </ul>
</template>
