<script setup>
import { ref, onMounted } from 'vue';

import { Qalendar } from 'qalendar';

import { useEvent } from '@/stores/restfullapi';

const store = useEvent();

const selectedDate = ref(new Date());

const events = ref([
  {
    title: 'Advanced algebra',
    with: 'Chandler Bing',
    time: { start: '2023-05-16 12:05', end: '2023-05-16 13:35' },
    color: 'yellow',
    isEditable: true,
    id: '753944708f0f',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!'
  },
  {
    title: 'Ralph on holiday',
    with: 'Rachel Greene',
    time: { start: '2023-05-10', end: '2023-05-22' },
    color: 'green',
    isEditable: true,
    id: '5602b6f589fc'
  }
]);

const config = ref({
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
  showCurrentTime: true
});

onMounted(async () => {
  const data = await store.findAll({});
  console.log(data);
});
</script>

<template>
  <div class="">
    <!-- <div class="col-12 xl:col-3">
      <div class="flex align-items-start w-10rem">
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
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between sm:w-max w-full">
            <div class="flex gap-2 sm:w-max w-full justify-content-between">
              <Button
                text
                plain
                rounded
                icon="pi pi-filter-slash"
                iconClass="text-2xl"
                class="p-button-lg hover:text-color h-3rem w-3rem"
                v-tooltip.bottom="$t('Clear filters')"
                @click="clearFilters"
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
                v-tooltip.bottom="$t('Columns options')"
                @click="onSelectedColumnsMenu"
              />
            </div>
          </div>
          <Calendar v-model="selectedDate" inline showWeek />
        </div>
      </div>
    </div> -->

    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
      <i class="mr-2 hidden sm:block">
        <AppIcons :name="$route?.name" :size="42" />
      </i>
      <h3 class="text-color m-0">
        {{ $t($route?.meta?.title) }}
      </h3>
      <p class="text-color-secondary">
        {{ $t($route?.meta?.description) }}
      </p>

      <div class="flex flex-wrap gap-2 align-items-center justify-content-between sm:w-max w-full">
        <div class="flex gap-2 sm:w-max w-full justify-content-between">
          <Button
            text
            plain
            rounded
            icon="pi pi-filter-slash"
            iconClass="text-2xl"
            class="p-button-lg hover:text-color h-3rem w-3rem"
            v-tooltip.bottom="$t('Clear filters')"
            @click="clearFilters"
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
            v-tooltip.bottom="$t('Columns options')"
            @click="onSelectedColumnsMenu"
          />
        </div>
      </div>

      <!-- <Calendar v-model="selectedDate" inline showWeek /> -->

      <Qalendar :events="events" :config="config" :selected-date="selectedDate">
        <template #weekDayEvent="eventProps">
          <div
            :style="{
              backgroundColor: 'cornflowerblue',
              color: '#fff',
              width: '100%',
              height: '100%',
              overflow: 'hidden'
            }"
          >
            <span>{{ timeFormattingFunction(eventProps.eventData.time) }}</span>

            <span>{{ eventProps.eventData.title }}</span>
          </div>
        </template>

        <template #monthEvent="monthEventProps">
          <span>{{ monthEventProps.eventData.title }}sdfsg</span>
        </template>
      </Qalendar>
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
