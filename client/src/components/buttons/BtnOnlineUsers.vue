<script setup>
import { ref, computed, inject } from 'vue';

const helpdesk = inject('helpdesk');

const menu = ref();

const onlineUsers = computed(() => {
  return helpdesk?.users?.map(({ login }) => {
    return {
      login
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
  <Menu ref="menu" id="online-clients-menu" :model="[]" :popup="true">
    <template #start>
      <div class="w-full flex align-items-center p-2 pl-3 text-color border-noround">
        <Avatar icon="pi pi-user" class="mr-2" />
        <div class="flex flex-column align">
          <span class="font-bold">{{ $helpdesk.user.name }}</span>
          <span class="text-sm">{{ $helpdesk.user.email }}</span>
        </div>
      </div>
    </template>

    <template #end>
      <ul class="w-full flex align-items-center py-4 px-4 text-color border-noround">
        <li v-for="user in onlineUsers">
          <i class="pi pi-user mr-2" />
          <div class="flex flex-column align">
            <span class="font-bold">{{ user?.name }}</span>
            <span class="text-sm">{{ user?.phone }}</span>
          </div>
        </li>
      </ul>
    </template>
  </Menu>

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
