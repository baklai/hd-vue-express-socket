<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { Qalendar } from 'qalendar';
import { useEvent } from '@/stores/restfullapi';

import ModalRecord from '@/components/modals/Event.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/Event.vue';

const { t } = useI18n();
const toast = useToast();
const store = useEvent();

const refModal = ref();
const refConfirm = ref();
const refSidebar = ref();

const records = ref([]);

const loading = ref(false);
const selectedDate = ref(new Date());

const config = ref({
  style: {
    colorSchemes: store.eventType
  },
  week: {
    startsOn: 'monday',
    nDays: 7,
    scrollToHour: 5
  },
  month: {
    showTrailingAndLeadingDates: true
  },
  locale: 'en-EN',
  style: {
    fontFamily: 'Nunito, sans-serif'
  },
  defaultMode: 'month',
  disableModes: ['week', 'month'],
  isSilent: true,
  showCurrentTime: true,
  eventDialog: { isCustom: false }
});

const getDataRecords = async () => {
  try {
    loading.value = true;
    const { docs } = await store.findAll({
      offset: 0,
      limit: -1,
      sort: { datetime: -1 },
      filters: {
        datetime: {
          $gte: new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth(), 1),
          $lt: new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth() + 1, 0)
        }
      }
    });
    records.value = docs.map(({ id, title, datetime, description, eventType }) => {
      return {
        id,
        title,
        description,
        time: {
          start: new Date(datetime).toISOString().split('T')[0],
          end: new Date(datetime).toISOString().split('T')[0]
        },
        colorScheme: eventType,
        isEditable: true
      };
    });
    toast.add({
      severity: 'success',
      summary: t('HD Information'),
      detail: t('Records is updated'),
      life: 3000
    });
  } catch (err) {
    records.value = [];
    toast.add({
      severity: 'warn',
      summary: t('HD Warning'),
      detail: t('Records not updated'),
      life: 3000
    });
  } finally {
    loading.value = false;

    console.log(records.value);
  }
};

const onCurrentMonth = async () => {
  try {
    selectedDate.value = new Date();
    await getDataRecords();
  } catch (err) {
    console.error(err);
  }
};

function toggleModal(data) {
  refModal.value.toggle(data);
}

function toggleSidebar(data) {
  refSidebar.value.toggle(data);
}

onMounted(async () => {
  try {
    await getDataRecords();
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <div class="w-full h-full">
    <ModalRecord ref="refModal" />

    <!-- <ModalConfirmDelete ref="refConfirm" :onDelete="removeOne" /> -->

    <!-- <SidebarRecord ref="refSidebar" @toggle-menu="toggleMenu" /> -->

    <div class="flex justify-content-between flex-wrap mb-2">
      <div class="flex flex-wrap gap-2 align-items-center">
        <i class="mr-2 hidden sm:block">
          <AppIcons :name="$route?.name" :size="42" />
        </i>
        <div>
          <h3 class="text-color m-0">
            {{ $t($route?.meta?.title) }}
          </h3>
          <p class="text-color-secondary">
            {{ $t($route?.meta?.description) }}
          </p>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 align-items-center justify-content-between sm:w-max w-full">
        <div class="flex gap-2 sm:w-max w-full justify-content-between">
          <Button
            text
            plain
            rounded
            icon="pi pi-calendar-times"
            iconClass="text-2xl"
            class="p-button-lg hover:text-color h-3rem w-3rem"
            v-tooltip.bottom="$t('Current month')"
            @click="onCurrentMonth"
          />

          <Button
            text
            plain
            rounded
            icon="pi pi-plus-circle"
            iconClass="text-2xl"
            class="p-button-lg hover:text-color h-3rem w-3rem"
            v-tooltip.bottom="$t('Create record')"
            @click="toggleModal({})"
          />

          <Button
            text
            plain
            rounded
            icon="pi pi-sync"
            iconClass="text-2xl"
            class="p-button-lg hover:text-color h-3rem w-3rem"
            v-tooltip.bottom="$t('Update records')"
            @click="getDataRecords"
          />

          <Button
            text
            plain
            rounded
            icon="pi pi-cog"
            iconClass="text-2xl"
            class="p-button-lg hover:text-color h-3rem w-3rem"
            v-tooltip.bottom="$t('Options')"
          />
        </div>
      </div>
    </div>

    <div class="flex w-full" style="height: calc(100vh - 13rem)">
      <Qalendar
        v-model:events="records"
        :config="config"
        :is-loading="loading"
        v-model:selected-date="selectedDate"
      />
    </div>
  </div>
</template>

<style>
@import 'qalendar/dist/style.css';
</style>

<style scoped>
::v-deep(.date-picker.is-in-qalendar) {
  display: none !important;
}

::v-deep(.event-flyout) {
  color: var(--text-color) !important;
  background: var(--surface-card) !important;
  border-color: var(--surface-border) !important;
}

::v-deep(.calendar-root) {
  background: var(--surface-card) !important;
  border-color: var(--surface-border) !important;
}

::v-deep(.calendar-month__weekday) {
  border-color: var(--surface-border) !important;
}

::v-deep(.calendar-month__weekday.trailing-or-leading) {
  border-color: var(--surface-border) !important;
  background: linear-gradient(45deg, transparent 49.9%, #80808010 0, #80808010 60%, transparent 0) fixed,
    linear-gradient(45deg, #80808010 10%, transparent 0) fixed,
    linear-gradient(-45deg, transparent 49.9%, #80808010 0, #80808010 60%, transparent 0) fixed,
    linear-gradient(-45deg, #80808010 10%, transparent 0) fixed !important;
  background-size: 0.5em 0.5em !important;
}

::v-deep(.calendar-month__weekday.trailing-or-leading > span.calendar-month__day-date) {
  color: var(--text-color-secondary) !important;
}

::v-deep(.calendar-header) {
  padding-left: 2rem !important;
  padding-right: 2rem !important;
}

::v-deep(.calendar-header__period-name) {
  color: var(--text-color) !important;
  font-weight: 700 !important;
}

::v-deep(.calendar-month__day-name) {
  font-size: 1.125rem !important;
  font-weight: 700 !important;
  width: 100%;
  margin: 0 auto !important;
  padding: 0.5rem 0 !important;
  text-align: center !important;

  background-color: var(--surface-50) !important;
  color: var(--text-color) !important;
}

::v-deep(.calendar-month__event-wrapper) {
  padding: 0.2rem 1rem !important;
}

::v-deep(.calendar-month__day-date) {
  font-size: 1rem !important;
  font-weight: 700 !important;
  color: var(--text-color) !important;
  margin-bottom: 1rem !important;
}

::v-deep(.calendar-month__event-title) {
  font-size: 1rem !important;
  color: var(--text-color) !important;
}

::v-deep(.calendar-month__event-color) {
  width: 1rem !important;
  height: 1rem !important;
}

::v-deep(.calendar-month__event-time) {
  font-size: 1rem !important;
  color: var(--text-color) !important;
}
</style>
