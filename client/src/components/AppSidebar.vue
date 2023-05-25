<script setup>
import AppMenu from './AppMenu.vue';
import BtnAppAuth from '@/components/buttons/BtnAppAuth.vue';
import BtnCloudDialog from '@/components/buttons/BtnCloudDialog.vue';
import BtnTimeOut from '@/components/buttons/BtnTimeOut.vue';
import BtnToggleTheme from '@/components/buttons/BtnToggleTheme.vue';
import BtnToggleLang from '@/components/buttons/BtnToggleLang.vue';
</script>

<template>
  <div class="absolute top-0 left-0 right-0 w-full">
    <div class="flex align-items-start m-4 p-3">
      <AppIcons :name="$route?.name" :size="42" class="mr-2" />
      <div class="flex flex-column" translate="no">
        <span class="text-xl">{{ $route?.meta?.title }}</span>
        <p class="text-sm text-color-secondary mt-2 mb-0">
          {{ $route?.meta?.description }}
        </p>
      </div>
    </div>
  </div>

  <div class="relative">
    <div class="menu-sidebar absolute overflow-y-scroll w-full text-base px-2">
      <AppMenu />
    </div>
  </div>

  <div class="absolute bottom-0 left-0 right-0 w-full">
    <div class="flex align-items-center align-content-center justify-content-around flex-wrap p-4">
      <BtnTimeOut class="hover:text-color" />
      <BtnToggleLang iconClass="text-2xl" class="w-3rem h-3rem hover:text-color" />
      <BtnToggleTheme iconClass="text-2xl" class="w-3rem h-3rem hover:text-color" />
      <BtnCloudDialog iconClass="text-2xl" class="w-3rem h-3rem hover:text-color" />
      <BtnAppAuth iconClass="text-2xl" class="w-3rem h-3rem hover:text-color" />
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
