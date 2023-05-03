<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import { useChannel } from '@/stores/restfullapi';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/Channel.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/Channel.vue';

const { findAll, removeOne } = useChannel();

const refMenu = ref();
const refModal = ref();
const refConfirm = ref();
const refSidebar = ref();

const columns = ref([
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

function toggleMenu(event, data) {
  refMenu.value.toggle(event, data);
}

function toggleModal(data) {
  refModal.value.toggle(data);
}

function toggleSidebar(data) {
  refSidebar.value.toggle(data);
}
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <OptionsMenu
        ref="refMenu"
        :isHost="false"
        @view="(data) => refSidebar.toggle(data)"
        @create="(data) => refModal.toggle(data)"
        @edit="(data) => refModal.toggle(data)"
        @delete="(data) => refConfirm.toggle(data)"
      />

      <ModalRecord ref="refModal" />

      <ModalConfirmDelete ref="refConfirm" :onDelete="removeOne" />

      <SSDataTable
        :columns="columns"
        :onRecords="findAll"
        :storageKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
        @toggle-menu="toggleMenu"
        @toggle-modal="toggleModal"
        @toggle-sidebar="toggleSidebar"
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

      <SidebarRecord ref="refSidebar" @toggle-menu="toggleMenu" />
    </div>
  </div>
</template>
