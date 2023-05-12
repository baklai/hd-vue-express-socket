<script setup>
import { ref, computed, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import { useChannel } from '@/stores/api/channel';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/Channel.vue';
import ConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/Channel.vue';

const channelAPI = useChannel();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refConfirm = ref();
const refDataTable = ref();

const columns = computed(() => [
  {
    header: 'Location From',
    field: 'locationFrom',
    sortField: 'locationFrom',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'locationFrom',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: 'Unit From',
    field: 'unitFrom',
    sortField: 'unitFrom',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'unitFrom',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: 'Location To',
    field: 'locationTo',
    sortField: 'locationTo',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'locationTo',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },
  {
    header: 'Unit To',
    field: 'unitTo',
    sortField: 'unitTo',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'unitTo',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: 'Level',
    field: 'level',
    sortField: 'level',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'level',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Type',
    field: 'type',
    sortField: 'type',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'type',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Speed',
    field: 'speed',
    sortField: 'speed',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'speed',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Status',
    field: 'status',
    sortField: 'status',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'status',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Operator',
    field: 'operator',
    sortField: 'operator',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'operator',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Composition',
    field: 'composition',
    sortField: 'composition',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'composition',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
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

      <ConfirmDelete ref="refConfirm" :onDelete="removeOne" />

      <SSDataTable
        ref="refDataTable"
        :columns="columns"
        :records="channelAPI.records"
        :onUpdate="channelAPI.findAll"
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
