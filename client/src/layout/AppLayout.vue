<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useConfig } from '@/stores/appconf';
import AppTopbar from '@/components/AppTopbar.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppConfig from '@/components/AppConfig.vue';
import AppHosting from '@/components/AppHosting.vue';

const Config = useConfig();

const outsideClickListener = ref(null);

const containerClass = computed(() => {
  return {
    'layout-theme-light': Config.theme === 'light',
    'layout-theme-dark': Config.theme === 'dark',
    'layout-overlay': Config.menuMode === 'overlay',
    'layout-static': Config.menuMode === 'static',
    'layout-static-inactive': Config.staticMenuDesktopInactive && Config.menuMode === 'static',
    'layout-overlay-active': Config.overlayMenuActive,
    'layout-mobile-active': Config.staticMenuMobileActive,
    'p-input-filled': Config.inputStyle === 'filled',
    'p-ripple-disabled': !Config.ripple
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        Config.overlayMenuActive = false;
        Config.staticMenuMobileActive = false;
        Config.menuHoverActive = false;
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
  const sidebarEl = document.querySelector('.layout-sidebar');
  const topbarEl = document.querySelector('.layout-menu-button');
  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
};

watchEffect(() => {
  if (Config.isSidebarActive) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <div class="layout-sidebar">
      <AppSidebar />
    </div>
    <AppTopbar />
    <div class="layout-main-container">
      <div class="layout-main">
        <div class="grid grid-nogutter" style="height: calc(100vh - 9rem)">
          <RouterView />
        </div>
      </div>
    </div>
    <AppConfig />
    <AppHosting />
  </div>
</template>
