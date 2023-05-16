<script setup>
import { ref, computed } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';

import { useInspector } from '@/stores/api/inspector';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/SysInspector.vue';
import ConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/SysInspector.vue';

const { t } = useI18n();

const Inspector = useInspector();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refConfirm = ref();
const refDataTable = ref();

const columns = computed(() => [
  {
    header: { text: t('PC Name'), icon: null, width: '15rem' },
    column: {
      field: 'system.csname',
      icon: 'pi pi-desktop',
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'system.csname', default: 1 },
    filter: { field: 'system.csname', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('IP Address'), icon: null, width: '12rem' },
    column: {
      field: 'host',
      icon: null,
      type: 'text',
      class: 'font-medium text-primary cursor-pointer',
      action(data) {
        refSidebar.value.toggle(data);
      }
    },
    sorter: { field: 'host', default: 1 },
    filter: { field: 'host', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Users'), icon: null, width: '13rem' },
    column: {
      field: 'warnings.useraccount',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'warnings.useraccount', default: 1 },
    filter: { field: 'warnings.useraccount', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: false,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Products'), icon: null, width: '13rem' },
    column: {
      field: 'warnings.product',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'warnings.product', default: 1 },
    filter: { field: 'warnings.product', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: false,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('SMB Share'), icon: null, width: '13rem' },
    column: {
      field: 'warnings.share',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'warnings.share', default: 1 },
    filter: { field: 'warnings.share', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: false,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Report date'), icon: null, width: '15rem' },
    column: {
      field: 'updated',
      icon: null,
      type: 'datetime',
      class: null,
      action: null
    },
    sorter: { field: 'updated', default: 1 },
    filter: { field: 'updated', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('OS Name'), icon: null, width: '20rem' },
    column: {
      field: 'system.osname',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'system.osname', default: 1 },
    filter: { field: 'system.osname', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('OS Platform'), icon: null, width: '15rem' },
    column: {
      field: 'system.platform',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'system.platform', default: 1 },
    filter: { field: 'system.platform', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('OS Version'), icon: null, width: '12rem' },
    column: {
      field: 'system.version',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'system.version', default: 1 },
    filter: { field: 'system.version', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('CPU'), icon: null, width: '25rem' },
    column: {
      field: 'cpu',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'cpu', default: 1 },
    filter: { field: 'cpu', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('RAM'), icon: null, width: '15rem' },
    column: {
      field: 'ram',
      icon: null,
      type: 'byte',
      class: null,
      action: null
    },
    sorter: { field: 'ram', default: 1 },
    filter: { field: 'ram', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('HDD'), icon: null, width: '12rem' },
    column: {
      field: 'hdd',
      icon: null,
      type: 'byte',
      class: null,
      action: null
    },
    sorter: { field: 'hdd', default: 1 },
    filter: { field: 'hdd', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
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
        option-key="host"
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
        :records="Inspector.records"
        :onUpdate="Inspector.findAll"
        :storageKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
        @toggle-menu="(event, data) => refMenu.toggle(event, data)"
        @toggle-modal="(data) => refModal.toggle(data)"
        @toggle-sidebar="(data) => refSidebar.toggle(data)"
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

      <SidebarRecord ref="refSidebar" @toggle-menu="(event, data) => refMenu.toggle(event, data)" />
    </div>
  </div>
</template>
