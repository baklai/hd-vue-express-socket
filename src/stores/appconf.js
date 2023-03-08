import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';

import useLocalStorage from '@/service/LocalStorage';

export const useConfigStore = defineStore('config', () => {
  const cloud = ref(false);

  const activeMenuItem = ref(null);

  const scale = ref(useLocalStorage('app-scale', 14));
  const ripple = ref(useLocalStorage('app-ripple', false));
  const inputStyle = ref(useLocalStorage('app-input-style', 'outlined'));
  const menuMode = ref(useLocalStorage('app-munu-mode', 'static'));
  const theme = ref(useLocalStorage('app-theme', 'light'));

  const staticMenuDesktopInactive = ref(true);
  const overlayMenuActive = ref(false);
  const profileSidebarVisible = ref(false);
  const configSidebarVisible = ref(false);
  const staticMenuMobileActive = ref(false);
  const menuHoverActive = ref(false);

  watch(scale, applyScale);
  watch(menuMode, onMenuToggle);
  watch(theme, toggleTheme);

  const isSidebarActive = computed(() => overlayMenuActive.value || staticMenuMobileActive.value);

  const isDarkTheme = computed(() => theme.value === 'dark');

  function setActiveMenuItem(item) {
    activeMenuItem.value = item.value || item;
  }

  function onMenuToggle() {
    if (menuMode.value === 'overlay') {
      overlayMenuActive.value = !overlayMenuActive.value;
    }
    if (window.innerWidth > 991) {
      staticMenuDesktopInactive.value = !staticMenuDesktopInactive.value;
    } else {
      staticMenuMobileActive.value = !staticMenuMobileActive.value;
    }
  }

  function applyScale() {
    document.documentElement.style.fontSize = scale.value + 'px';
  }

  function toggleTheme() {
    const elementId = 'app-theme';
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl =
      theme.value === 'dark'
        ? linkElement.getAttribute('href').replace('light', theme.value)
        : linkElement.getAttribute('href').replace('dark', theme.value);
    cloneLinkElement.setAttribute('id', elementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', () => {
      linkElement.remove();
      cloneLinkElement.setAttribute('id', elementId);
    });
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
  }

  return {
    cloud,
    ripple,
    inputStyle,
    menuMode,
    theme,
    scale,
    activeMenuItem,
    staticMenuDesktopInactive,
    overlayMenuActive,
    profileSidebarVisible,
    configSidebarVisible,
    staticMenuMobileActive,
    menuHoverActive,
    applyScale,
    toggleTheme,
    setActiveMenuItem,
    onMenuToggle,
    isSidebarActive,
    isDarkTheme
  };
});
