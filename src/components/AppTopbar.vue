<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

import { useNavigationStore } from '@/stores/navigation';
import { useConfigStore } from '@/stores/config';

import AppMenuItem from './AppMenuItem.vue';

const config = useConfigStore();

const navigation = useNavigationStore();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const logoUrl = computed(() => {
  return `/img/${config.isDarkTheme ? 'logo-app-light' : 'logo-app-dark'}.webp`;
});

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};
const onSettingsClick = () => {
  topbarMenuActive.value = false;
  router.push('/documentation');
};
const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return;

  const sidebarEl = document.querySelector('.layout-topbar-menu');
  const topbarEl = document.querySelector('.layout-topbar-menu-button');

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
};
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img :src="logoUrl" alt="logo" class="h-2rem mr-4" />
      <span class="font-bold">HELPDESK SERVICE</span>
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button class="p-link layout-topbar-button" v-tooltip.bottom="'Maximize/Minimize'">
        <i class="pi pi-window-maximize"></i>
        <span>Maximize/Minimize</span>
      </button>

      <button class="p-link layout-topbar-button" @click="config.cloud = !config.cloud" v-tooltip.bottom="'HD File Hosting'">
        <i class="pi pi-cloud-upload"></i>
        <span>HD File Hosting</span>
      </button>

      <button class="p-link layout-topbar-button" v-if="config.isDarkTheme" @click="config.theme = 'light'" v-tooltip.bottom="'Theme Light'">
        <i class="pi pi-sun"></i>
        <span>Theme Light</span>
      </button>
      <button class="p-link layout-topbar-button" v-else @click="config.theme = 'dark'" v-tooltip.bottom="'Theme Dark'">
        <i class="pi pi-moon"></i>
        <span>Theme Dark</span>
      </button>

      <button class="p-link layout-topbar-button" v-tooltip.bottom="'Translations'">
        <i class="pi pi-language"></i>
        <span>Translations</span>
      </button>

      <button class="p-link layout-topbar-button" v-tooltip.bottom="'Online users'">
        <i class="pi pi-users"></i>
        <span>Online users</span>
      </button>

      <button class="p-link layout-topbar-button" v-tooltip.bottom="'Notifications'">
        <i class="pi pi-bell"></i>
        <span>Notifications</span>
      </button>

      <button class="p-link layout-topbar-button" v-tooltip.bottom="'Main menu'">
        <i class="pi pi-th-large"></i>
        <span>Main menu</span>
      </button>
    </div>
  </div>
</template>
