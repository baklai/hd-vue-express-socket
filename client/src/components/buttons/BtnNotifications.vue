<script setup>
import { ref, onMounted } from 'vue';
import { useNotification } from '@/stores/restfullapi';

const store = useNotification();

const menu = ref();
const records = ref([]);
const params = ref({ offset: 0, limit: -1, sortField: null, sortOrder: null, filters: [] });

onMounted(async () => {
  await getDataRecords();
});

const getDataRecords = async () => {
  try {
    const { docs } = await store.findAll(params.value);
    records.value = docs;
  } catch (err) {
    records.value = [];
  }
};

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <Menu
    ref="menu"
    id="notifications-menu"
    :model="[]"
    :popup="true"
    class="w-auto max-w-30rem h-20rem overflow-auto"
  >
    <!-- <template #start>
      <div class="w-full flex align-items-center p-2 pl-3 text-color border-noround absolute top-0 left-0">
        <Avatar icon="pi pi-bell" class="mr-2" />
        <div class="flex flex-column align">
          <span class="font-bold">{{ $t('Notifications') }}</span>
          <span class="text-sm">{{ $helpdesk.user.name }}</span>
        </div>
      </div>
    </template> -->

    <template #end>
      <ul class="flex flex-column align-items-center py-4 px-4">
        <li v-for="record in records" class="my-2">
          <div class="flex">
            <i class="pi pi-bell text-2xl mr-2" />
            <div class="flex flex-column align">
              <h5 class="font-bold">{{ record?.title }}</h5>
              <p class="text-sm">{{ record?.text }}</p>
            </div>
          </div>
        </li>
      </ul>

      <!-- <ul class="w-full flex align-items-center p-2 pl-4 text-color border-noround">
        <li v-for="record in records">
          <i class="pi pi-bell text-green-500 mr-2"  />
          <div class="flex flex-column align">
            <span class="font-bold">{{ record?.title }}</span>
            <span class="text-sm">{{ record?.text }}</span>
          </div>
          <br />
        </li>
      </ul> -->
    </template>
  </Menu>

  <i v-badge.success="records?.length" class="p-overlay-badge mx-2" v-if="records?.length">
    <Button
      text
      plain
      rounded
      icon="pi pi-bell"
      iconClass="text-3xl"
      aria-haspopup="true"
      aria-controls="notifications-menu"
      class="w-3rem h-3rem hover:text-color"
      v-tooltip.bottom="$t('Notifications')"
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
