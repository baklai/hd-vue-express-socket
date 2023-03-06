<script setup>
import { computed, watch, ref } from 'vue';
import { useConfigStore } from '@/stores/config';
import AppTopbar from '@/components/AppTopbar.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import AppConfig from '@/components/AppConfig.vue';

const {
  isSidebarActive,
  darkTheme,
  menuMode,
  inputStyle,
  ripple,
  staticMenuDesktopInactive,
  overlayMenuActive,
  staticMenuMobileActive,
  menuHoverActive
} = useConfigStore();

const outsideClickListener = ref(null);

// watch(isSidebarActive, (newVal) => {
//   if (newVal) {
//     bindOutsideClickListener();
//   } else {
//     unbindOutsideClickListener();
//   }
// });

const containerClass = computed(() => {
  return {
    'layout-theme-light': darkTheme.value === 'light',
    'layout-theme-dark': darkTheme.value === 'dark',
    'layout-overlay': menuMode.value === 'overlay',
    'layout-static': menuMode.value === 'static',
    'layout-static-inactive': staticMenuDesktopInactive.value && menuMode.value === 'static',
    'layout-overlay-active': overlayMenuActive.value,
    'layout-mobile-active': staticMenuMobileActive.value,
    'p-input-filled': inputStyle.value === 'filled',
    'p-ripple-disabled': !ripple.value
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        overlayMenuActive.value = false;
        staticMenuMobileActive.value = false;
        menuHoverActive.value = false;
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
  </div>
</template>
