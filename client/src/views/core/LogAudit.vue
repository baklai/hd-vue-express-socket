<script setup>
import { ref, computed } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import { useLogger } from '@/stores/api/logger';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/IPAddress.vue';
import ConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/IPAddress.vue';

const loggerAPI = useLogger();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refConfirm = ref();
const refDataTable = ref();

const columns = computed(() => [
  {
    header: 'Address',
    field: 'address',
    sortField: 'address',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'address',
    columnWidth: '120px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },
  {
    header: 'User',
    field: 'user',
    sortField: 'user',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'user',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },
  {
    header: 'Event',
    field: 'event',
    sortField: 'event',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'event',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },
  {
    header: 'Date',
    field: 'datetime',
    sortField: 'datetime',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'datetime',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },
  {
    header: 'User agent',
    field: 'agent',
    sortField: 'agent',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'agent',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
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
        @edit="(data) => refModal.toggle(data)"
        @delete="(data) => refConfirm.toggle(data)"
      />

      <ModalRecord ref="refModal" @close="() => refDataTable.update()" />

      <ConfirmDelete ref="refConfirm" @close="(data) => refConfirm.toggle(data)" />

      <SSDataTable
        ref="refDataTable"
        :columns="columns"
        :records="loggerAPI.records"
        :onUpdate="loggerAPI.findAll"
        :storageKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
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
