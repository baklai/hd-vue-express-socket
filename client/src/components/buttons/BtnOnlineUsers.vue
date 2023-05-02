<script setup>
import { ref, computed, inject } from 'vue';

const helpdesk = inject('helpdesk');

const menu = ref();

const onlineUsers = computed(() => {
  return helpdesk?.users?.map(({ id, name, phone }) => {
    return {
      id,
      name,
      phone
    };
  });
});

const countUsers = computed(() => {
  return helpdesk?.users?.length;
});

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <OverlayPanel ref="menu" appendTo="body" class="w-20rem">
    <DataView :value="onlineUsers">
      <template #header>
        <div class="w-full flex align-items-center text-color">
          <Avatar icon="pi pi-user" class="mr-2" />
          <div class="flex flex-column align">
            <span class="font-bold">{{ $helpdesk?.user?.name }}</span>
            <span class="text-sm">{{ $helpdesk?.user?.email }}</span>
          </div>
        </div>
      </template>
      <template #list="{ data }">
        <div class="col-12 py-2">
          <div class="flex flex-row justify-content-between gap-3">
            <div class="w-full flex align-items-center text-color">
              <Avatar icon="pi pi-user" shape="circle" class="mr-2 surface-overlay" />
              <div class="flex flex-column align">
                <span class="font-medium">{{ data?.name }}</span>
                <span class="font-normal">{{ data?.phone }}</span>
              </div>
            </div>
            <div class="flex flex-column align-items-end">
              <Button text plain rounded icon="pi pi-whatsapp" v-tooltip.bottom="$t('Chat')" />
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </OverlayPanel>

  <i v-badge.success="countUsers" class="p-overlay-badge mx-2">
    <Button
      text
      plain
      rounded
      icon="pi pi-users"
      iconClass="text-3xl"
      aria-haspopup="true"
      aria-controls="online-clients-menu"
      class="w-3rem h-3rem hover:text-color"
      v-tooltip.bottom="$t('Online users')"
      @click="toggle"
    />
  </i>
</template>

<style scoped>
::v-deep(.p-badge.p-component) {
  top: 6px;
  right: 6px;
}
</style>
