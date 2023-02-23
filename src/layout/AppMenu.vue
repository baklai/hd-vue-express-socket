<script setup>
import { ref } from 'vue';
import { useNavigationStore } from '@/stores/navigation';

import AppMenuItem from './AppMenuItem.vue';

const { navigation } = useNavigationStore();
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in navigation" :key="item">
            <AppMenuItem v-if="!item.separator" :item="item" :index="i" />
        </template>
    </ul>
</template>
