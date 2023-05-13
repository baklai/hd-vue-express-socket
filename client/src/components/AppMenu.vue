<script setup>
import AppMenuItem from '@/components/AppMenuItem.vue';
import { useNavigation } from '@/stores/navigation';

const Navigation = useNavigation();
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, index) in Navigation.navigation" :key="item">
      <AppMenuItem v-if="!item.separator" :item="item" :index="index" />
    </template>
  </ul>
</template>
