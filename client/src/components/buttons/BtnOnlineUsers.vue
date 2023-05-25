<script setup>
import { ref } from 'vue';
import { useHelpdesk } from '@/stores/helpdesk';

const Helpdesk = useHelpdesk();

const refMenu = ref();
</script>

<template>
  <OverlayPanel ref="refMenu" appendTo="body" class="w-20rem">
    <DataView :value="Helpdesk?.users">
      <template #header>
        <div class="w-full flex align-items-center text-color">
          <Avatar icon="pi pi-user" class="mr-2" />
          <div class="flex flex-column align">
            <span class="font-bold">{{ $helpdesk?.user?.fullname }}</span>
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
                <span class="font-medium">{{ data?.fullname }}</span>
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

  <i v-badge.success="Helpdesk.usersCount" class="p-overlay-badge mx-2">
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
      @click="(event) => refMenu.toggle(event)"
    />
  </i>
</template>

<style scoped>
::v-deep(.p-badge.p-component) {
  top: 6px;
  right: 6px;
}
</style>
