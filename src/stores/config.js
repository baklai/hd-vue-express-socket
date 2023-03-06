import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', () => {
  const contextPath = ref(import.meta.env.BASE_URL);

  const scales = ref([12, 13, 14, 15, 16]);

  const scale = ref(14);
  const ripple = ref(true);
  const darkTheme = ref(false);
  const inputStyle = ref('outlined');
  const menuMode = ref('static');

  const theme = ref('mdc-light-indigo');

  const activeMenuItem = ref(null);

  const staticMenuDesktopInactive = ref(false);
  const overlayMenuActive = ref(false);
  const profileSidebarVisible = ref(false);
  const configSidebarVisible = ref(false);
  const staticMenuMobileActive = ref(false);
  const menuHoverActive = ref(false);

  const isSidebarActive = computed(() => overlayMenuActive.value || staticMenuMobileActive.value);

  const isDarkTheme = computed(() => darkTheme.value);

  function incrementScale() {
    scale.value++;
    document.documentElement.style.fontSize = scale.value + 'px';
  }

  function decrementScale() {
    scale.value--;
    document.documentElement.style.fontSize = scale.value + 'px';
  }

  function setActiveMenuItem(item) {
    activeMenuItem.value = item.value || item;
  }

  function onMenuToggle() {
    if (menuMode.value === 'overlay') {
      overlayMenuActive.value = !overlayMenuActive.value;
    }

    if (window.innerWidth > 991) {
      staticMenuDesktopInactive.value = !value.staticMenuDesktopInactive;
    } else {
      staticMenuMobileActive.value = !value.staticMenuMobileActive;
    }
  }

  function changeThemeSettings(theme, darkTheme) {
    darkTheme.value = darkTheme;
    theme.value = theme;
  }

  const onChangeTheme = (theme, mode) => {
    const elementId = 'theme-css';
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl = linkElement.getAttribute('href').replace(theme, theme);
    cloneLinkElement.setAttribute('id', elementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', () => {
      linkElement.remove();
      cloneLinkElement.setAttribute('id', elementId);
      changeThemeSettings(theme, mode === 'dark');
    });
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
  };

  return {
    contextPath,
    scales,
    ripple,
    darkTheme,
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
    changeThemeSettings,
    incrementScale,
    decrementScale,
    setActiveMenuItem,
    onMenuToggle,
    isSidebarActive,
    isDarkTheme
  };
});
