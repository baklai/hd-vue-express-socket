<script setup>
import AppMenu from './AppMenu.vue';
import AppCloud from '@/components/AppCloud.vue';

import { useConfigStore } from '@/stores/config';

const config = useConfigStore();
</script>

<template>
  <div class="absolute top-0 left-0 right-0 w-full">
    <div class="m-4 p-3 flex align-items-start border-round-xl">
      <i class="pi pi-arrow-right-arrow-left text-4xl mr-3"></i>
      <div class="flex flex-column">
        <span>Network channels</span>
        <p class="mt-2 mb-0 line-height-3 text-indigo-200">Network channels of the technical support department</p>
      </div>
    </div>
  </div>

  <div class="relative">
    <div class="menu-sidebar absolute overflow-scroll w-full px-2">
      <AppMenu />
    </div>
  </div>

  <div class="absolute bottom-0 left-0 right-0 w-full">
    <div class="flex justify-content-around flex-wrap p-4">
      <Button
        type="button"
        icon="pi pi-clock"
        iconClass="text-2xl"
        class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-2rem w-2rem"
        v-tooltip.top="'Time out'"
      />

      <Button
        type="button"
        icon="pi pi-language"
        iconClass="text-2xl"
        class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-2rem w-2rem"
        v-tooltip.top="'Translations'"
      />

      <Button
        v-if="config.isDarkTheme"
        type="button"
        icon="pi pi-sun"
        iconClass="text-2xl"
        class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-2rem w-2rem"
        v-tooltip.top="'Theme Light'"
        @click="config.theme = 'light'"
      />
      <Button
        v-else
        type="button"
        icon="pi pi-moon"
        iconClass="text-2xl"
        class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-2rem w-2rem"
        v-tooltip.top="'Theme Dark'"
        @click="config.theme = 'dark'"
      />

      <Button
        type="button"
        icon="pi pi-cloud-upload"
        iconClass="text-2xl"
        class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-2rem w-2rem"
        v-tooltip.top="'HD File Hosting'"
        @click="config.cloud = !config.cloud"
      />

      <Button
        v-if="$auth.check()"
        type="button"
        icon="pi pi-sign-out"
        iconClass="text-2xl"
        class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-2rem w-2rem"
        v-tooltip.top="'Log Out'"
        @click="$auth.logout()"
      />
      <Button
        v-else
        type="button"
        icon="pi pi-sign-in"
        iconClass="text-2xl"
        class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-2rem w-2rem"
        v-tooltip.top="'Log In'"
        @click="$router.push('/auth/signin')"
      />
    </div>
  </div>
</template>

<style scoped>
.menu-sidebar {
  margin-top: calc(10rem);
  height: calc(100vh - 24rem);
  scrollbar-width: none;
}
</style>
