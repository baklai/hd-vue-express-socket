<script setup lang="jsx">
import { ref } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';

import { dateTimeToStr, eventToStr } from '@/service/DataFilters';
import { useLogger } from '@/stores/api/logger';
import { useUser } from '@/stores/api/user';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/IPAddress.vue';
import ConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/IPAddress.vue';

const { t } = useI18n();

const Logger = useLogger();
const User = useUser();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refConfirm = ref();
const refDataTable = ref();

const columns = ref([
  {
    header: { text: t('Address'), icon: null, width: '12rem' },
    column: {
      field: 'address',
      render(value) {
        return <Tag class="text-base font-normal text-color surface-hover px-4" value={value} />;
      },
      action: null
    },
    sorter: { field: 'address' },
    filter: { field: 'address', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('User'), icon: null, width: '12rem' },
    column: {
      field: 'user',
      render(value) {
        return <Tag class="text-base font-normal text-color surface-hover px-4" value={value} />;
      },
      action: null
    },
    sorter: { field: 'user' },
    filter: {
      field: 'user',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'login',
        label: 'login',
        async onRecords(params) {
          const { docs } = await User.findAll({ offset: 0, limit: -1 });
          return [{ id: 'anonymous', login: 'anonymous' }, ...docs];
        }
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Event'), icon: null, width: '16rem' },
    column: {
      field: 'event',
      render(value) {
        return (
          <Tag
            class="text-base font-normal text-color border-1 border-solid surface-border border-round-xs px-2"
            style={{ background: 'transparent' }}
            value={eventToStr(value)}
          />
        );
      },
      action: null
    },
    sorter: { field: 'event' },
    filter: { field: 'event', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Date'), icon: null, width: '12rem' },
    column: {
      field: 'datetime',
      render(value) {
        return <span>{dateTimeToStr(value)}</span>;
      },
      action: null
    },
    sorter: { field: 'datetime' },
    filter: { field: 'datetime', value: null, matchMode: FilterMatchMode.DATE_IS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('User agent'), icon: null, width: '30rem' },
    column: {
      field: 'agent',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'agent' },
    filter: { field: 'agent', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  }
]);
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <OptionsMenu
        ref="refMenu"
        @view="(data) => refSidebar.toggle(data)"
        @create="(data) => refModal.toggle(data)"
        @update="(data) => refModal.toggle(data)"
        @delete="(data) => refConfirm.toggle(data)"
      />

      <ModalRecord ref="refModal" @close="() => refDataTable.update()" />

      <ConfirmDelete ref="refConfirm" @close="(data) => refConfirm.toggle(data)" />

      <SSDataTable
        ref="refDataTable"
        :columns="columns"
        :storageKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
        :onUpdate="Logger.findAll"
        @toggle-menu="(event, data) => refMenu.toggle(event, data)"
        @toggle-modal="(data) => refModal.toggle(data)"
        @toggle-sidebar="(data) => refSidebar.toggle(data)"
      >
        <template #icon>
          <i class="mr-2 hidden sm:block">
            <AppIcons :name="$route?.name" :size="42" />
          </i>
        </template>

        <template #title>
          {{ $t($route?.meta?.title) }}
        </template>

        <template #subtitle>
          {{ $t($route?.meta?.description) }}
        </template>
      </SSDataTable>

      <SidebarRecord ref="refSidebar" @toggle-menu="(event, data) => refMenu.toggle(event, data)" />
    </div>
  </div>
</template>
