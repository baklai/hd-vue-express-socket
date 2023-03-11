<script setup>
import AppMenu from './AppMenu.vue';
import BtnAuthentication from '@/components/buttons/BtnAuthentication.vue';
import BtnCloudDialog from '@/components/buttons/BtnCloudDialog.vue';
import BtnTimeOut from '@/components/buttons/BtnTimeOut.vue';
import BtnToggleTheme from '@/components/buttons/BtnToggleTheme.vue';
import BtnToggleLang from '@/components/buttons/BtnToggleLang.vue';
</script>

<template>
  <div class="absolute top-0 left-0 right-0 w-full">
    <div class="m-4 p-3 flex align-items-start border-round-xl">
      <i class="pi pi-arrow-right-arrow-left text-4xl mr-3"></i>
      <div class="flex flex-column">
        <span>Network channels</span>
        <p class="mt-2 mb-0 line-height-3 text-indigo-200">
          Network channels of the technical support department
        </p>
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
      <BtnTimeOut iconClass="text-2xl" class="w-3rem h-3rem hover:text-color" />
      <BtnToggleLang iconClass="text-2xl" class="w-3rem h-3rem hover:text-color" />
      <BtnToggleTheme iconClass="text-2xl" class="w-3rem h-3rem hover:text-color" />
      <BtnCloudDialog iconClass="text-2xl" class="w-3rem h-3rem hover:text-color" />
      <BtnAuthentication iconClass="text-2xl" class="w-3rem h-3rem hover:text-color" />
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
