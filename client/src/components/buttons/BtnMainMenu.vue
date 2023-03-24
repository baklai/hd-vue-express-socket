<script setup>
import { ref } from 'vue';

import AppMenu from '@/components/AppMenu.vue';
import BtnAuthentication from '@/components/buttons/BtnAuthentication.vue';
import BtnCloudDialog from '@/components/buttons/BtnCloudDialog.vue';
import BtnTimeOut from '@/components/buttons/BtnTimeOut.vue';
import BtnToggleTheme from '@/components/buttons/BtnToggleTheme.vue';
import BtnToggleLang from '@/components/buttons/BtnToggleLang.vue';

const menu = ref(false);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <Button
    text
    plain
    rounded
    icon="pi pi-th-large"
    iconClass="text-3xl"
    class="w-3rem h-3rem text-4xl hover:text-color mx-2"
    v-tooltip.bottom="$t('Main menu')"
    @click="toggle"
  />

  <Menu ref="menu" popup :model="[]" class="w-20rem py-2 px-4">
    <template #start>
      <div class="flex align-items-start mt-4">
        <i class="pi pi-user text-4xl mr-3"></i>
        <div class="flex flex-column">
          <span>{{ $t('User login') }}</span>
          <p class="line-height-3 text-color-secondary mt-2 mb-0">{{ $t('User email') }}</p>
        </div>
      </div>
      <div class="overflow-scroll w-full max-h-30rem">
        <AppMenu />
      </div>
    </template>

    <template #end>
      <div class="flex justify-content-between p-2">
        <BtnTimeOut iconClass="text-xl" class="w-2rem h-2rem hover:text-color" />
        <BtnToggleLang iconClass="text-xl" class="w-2rem h-2rem hover:text-color" />
        <BtnToggleTheme iconClass="text-xl" class="w-2rem h-2rem hover:text-color" />
        <BtnCloudDialog iconClass="text-xl" class="w-2rem h-2rem hover:text-color" />
        <BtnAuthentication iconClass="text-xl" class="w-2rem h-2rem hover:text-color" />
      </div>
    </template>
  </Menu>
</template>
