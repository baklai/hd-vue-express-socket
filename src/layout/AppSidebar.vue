<script setup>
import AppMenu from './AppMenu.vue';
</script>

<template>
  <div class="absolute top-0 left-0 right-0 w-full">
    <div class="m-4 p-3 flex align-items-start border-round-xl bg-gray-700">
      <i class="pi pi-arrow-right-arrow-left text-6xl mr-3"></i>
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
        v-tooltip.top="'Sign In'"
      />

      <Button
        type="button"
        icon="pi pi-language"
        iconClass="text-2xl"
        class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-2rem w-2rem"
        v-tooltip.top="'Sign In'"
      />

      <Button
        type="button"
        icon="pi pi-moon"
        iconClass="text-2xl"
        class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-2rem w-2rem"
        v-tooltip.top="'Sign In'"
      />
      <Button
        type="button"
        icon="pi pi-sun"
        iconClass="text-2xl"
        class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-2rem w-2rem"
        v-tooltip.top="'Sign In'"
      />

      <Button
        v-if="!$auth().loggedIn"
        @click="$router.push('/auth/login')"
        type="button"
        icon="pi pi-sign-in"
        iconClass="text-2xl"
        class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-2rem w-2rem"
        v-tooltip.top="'Log In'"
      />

      <Button
        v-if="$auth().loggedIn"
        @click="$auth().logout()"
        type="button"
        icon="pi pi-sign-out"
        iconClass="text-2xl"
        class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-2rem w-2rem"
        v-tooltip.top="'Log Out'"
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
