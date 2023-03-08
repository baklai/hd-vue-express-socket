<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useConfigStore } from '@/stores/appconf';
import AppTopbar from '@/components/AppTopbar.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppConfig from '@/components/AppConfig.vue';
import AppCloud from '@/components/AppCloud.vue';

const config = useConfigStore();

const outsideClickListener = ref(null);

const containerClass = computed(() => {
  return {
    'layout-theme-light': config.theme === 'light',
    'layout-theme-dark': config.theme === 'dark',
    'layout-overlay': config.menuMode === 'overlay',
    'layout-static': config.menuMode === 'static',
    'layout-static-inactive': config.staticMenuDesktopInactive && config.menuMode === 'static',
    'layout-overlay-active': config.overlayMenuActive,
    'layout-mobile-active': config.staticMenuMobileActive,
    'p-input-filled': config.inputStyle === 'filled',
    'p-ripple-disabled': !config.ripple
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        config.overlayMenuActive = false;
        config.staticMenuMobileActive = false;
        config.menuHoverActive = false;
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
  if (config.isSidebarActive) {
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
    <AppCloud />
  </div>
</template>
