<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

import BtnCloudDialog from '@/components/buttons/BtnCloudDialog.vue';
import BtnToggleTheme from '@/components/buttons/BtnToggleTheme.vue';
import BtnToggleLang from '@/components/buttons/BtnToggleLang.vue';
import BtnOnlineUsers from '@/components/buttons/BtnOnlineUsers.vue';
import BtnNotifications from '@/components/buttons/BtnNotifications.vue';
import BtnMainMenu from '@/components/buttons/BtnMainMenu.vue';
import BtnFullScreen from '@/components/buttons/BtnFullScreen.vue';

import { useConfig } from '@/stores/config';

const Config = useConfig();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);

onMounted(() => {
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const topbarMenuClasses = computed(() => {
  return {
    'layout-topbar-menu-mobile-active': topbarMenuActive.value
  };
});

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};

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
    <router-link to="/" class="flex justify-content-center layout-topbar-logo">
      <div class="flex justify-content-center">
        <div class="justify-content-start">
          <p class="uppercase font-bold text-4xl m-0 text-color" translate="no" lang="en">help</p>
        </div>
        <div class="flex align-items-center justify-content-center">
          <img src="/img/logo-app.webp" alt="HD logo" width="32" height="32" class="mx-2" />
        </div>
        <div class="justify-content-start">
          <p class="uppercase font-bold text-4xl m-0 text-color" translate="no" lang="en">desk</p>
        </div>
      </div>
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="Config.onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <BtnCloudDialog iconClass="text-3xl" class="w-3rem h-3rem hover:text-color mx-2" />
      <BtnToggleTheme iconClass="text-3xl" class="w-3rem h-3rem hover:text-color mx-2" />
      <BtnToggleLang iconClass="text-3xl" class="w-3rem h-3rem hover:text-color mx-2" />
      <BtnOnlineUsers />
      <BtnNotifications />
      <BtnFullScreen iconClass="text-3xl" class="w-3rem h-3rem text-4xl hover:text-color mx-2" />
      <BtnMainMenu />
    </div>
  </div>
</template>
