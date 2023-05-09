<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import { useInspector } from '@/stores/restfullapi';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/SysInspector.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/SysInspector.vue';

const { findAll, removeOne } = useInspector();

const refMenu = ref();
const refModal = ref();
const refConfirm = ref();
const refSidebar = ref();

const columns = ref([
  {
    header: 'PC Name',
    field: 'system.csname',
    fieldIcon: 'pi pi-desktop',
    sortField: 'system.csname',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'system.csname',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'IP Address',
    field: 'host',
    sortField: 'host',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'host',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'Users',
    field: 'warnings.useraccount',
    sortField: 'warnings.useraccount',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'warnings.useraccount',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'Products',
    field: 'warnings.product',
    sortField: 'warnings.product',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'warnings.product',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'SMB Share',
    field: 'warnings.share',
    sortField: 'warnings.share',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'warnings.share',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'Report date',
    field: 'updated',
    fieldType: 'datetime',
    sortField: 'updated',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'updated',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'OS Name',
    field: 'system.osname',
    sortField: 'system.osname',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'system.osname',
    columnWidth: '250px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'OS Platform',
    field: 'system.platform',
    sortField: 'system.platform',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'system.platform',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'OS Version',
    field: 'system.version',
    sortField: 'system.version',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'system.version',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'CPU',
    field: 'cpu',
    sortField: 'cpu',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'cpu',
    columnWidth: '300px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'RAM',
    field: 'ram',
    fieldType: 'byte',
    sortField: 'ram',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'ram',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'HDD',
    field: 'hdd',
    fieldType: 'byte',
    sortField: 'hdd',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'hdd',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true
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
        isHost
        hostField="host"
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
          <i class="my-auto mr-2 hidden sm:block">
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
