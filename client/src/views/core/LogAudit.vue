<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import { useLogger } from '@/stores/restfullapi';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/IPAddress.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/IPAddress.vue';

const { findAll, removeOne } = useLogger();

const refMenu = ref();
const refModal = ref();
const refConfirm = ref();
const refSidebar = ref();

const columns = ref([
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
