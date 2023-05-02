<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useNotification } from '@/stores/restfullapi';

const { t } = useI18n();
const toast = useToast();
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

const onRemoveRecord = async (id) => {
  try {
    const dd = await store.removeOne({ id });
    await getDataRecords();
    toast.add({
      severity: 'success',
      summary: t('HD Information'),
      detail: t('Record is removed'),
      life: 3000
    });
  } catch (err) {}
};

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <OverlayPanel ref="menu" appendTo="body" class="max-w-30rem">
    <DataView :value="records">
      <template #header> {{ $t('Notifications') }} </template>
      <template #list="{ data }">
        <div class="col-12 py-2">
          <div class="flex flex-row justify-content-between gap-3">
            <i class="pi pi-bell text-3xl text-yellow-500" />
            <div class="flex flex-column align-items-start overflow-auto">
              <span class="font-medium text-2xl">{{ data.title }}</span>
              <span class="font-normal">{{ data.text }}</span>
            </div>
            <div class="flex flex-column align-items-end">
              <Button
                text
                plain
                rounded
                icon="pi pi-trash"
                v-tooltip.bottom="$t('Remove record')"
                @click="onRemoveRecord(data.id)"
              />
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </OverlayPanel>

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
