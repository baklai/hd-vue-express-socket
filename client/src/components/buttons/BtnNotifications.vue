<script setup>
import { ref, inject, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useNotification } from '@/stores/restfullapi';
import { dateTimeToStr } from '@/service/DataFilters';

const { t } = useI18n();
const toast = useToast();
const store = useNotification();

const helpdesk = inject('helpdesk');

const menu = ref();

const records = ref([]);

const params = ref({
  offset: 0,
  limit: -1,
  sort: { createdAt: -1 },
  filters: { userID: { $in: helpdesk?.user?.id ? [helpdesk?.user?.id] : [] } }
});

const toggle = (event) => {
  menu.value.toggle(event);
};

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
    await store.removeOne({ id });
    await getDataRecords();
    toast.add({
      severity: 'success',
      summary: t('HD Information'),
      detail: t('Record is removed'),
      life: 3000
    });
  } catch (err) {
    toast.add({
      severity: 'warn',
      summary: t('HD Warning'),
      detail: t('Record not removed'),
      life: 3000
    });
  }
};

onMounted(async () => {
  await getDataRecords();
});
</script>

<template>
  <OverlayPanel ref="menu" appendTo="body" class="max-w-30rem">
    <DataView :value="records">
      <template #list="{ data }">
        <div class="col-12 border-none py-2">
          <div class="flex flex-row justify-content-start gap-3">
            <div class="flex flex-column align-items-start overflow-auto w-full">
              <div class="w-full flex align-items-center text-color">
                <Avatar icon="pi pi-bell text-2xl" class="bg-green-500 text-white mr-2" />
                <div class="flex flex-column align my-2">
                  <span class="font-medium text-primary text-xl">{{ data?.title }}</span>
                  <span class="font-normal text-color-secondary">{{ dateTimeToStr(data?.created) }}</span>
                </div>
              </div>
              <span class="text-xl">{{ data?.text }}</span>
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
