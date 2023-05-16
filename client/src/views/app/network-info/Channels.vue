<script setup>
import { ref, computed } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';

import { useChannel } from '@/stores/api/channel';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/Channel.vue';
import ConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/Channel.vue';

const { t } = useI18n();

const Channel = useChannel();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refConfirm = ref();
const refDataTable = ref();

const columns = computed(() => [
  {
    header: { text: t('Location From'), icon: null, width: '15rem' },
    column: {
      field: 'locationFrom',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'locationFrom', default: 1 },
    filter: { field: 'locationFrom', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Unit From'), icon: null, width: '15rem' },
    column: {
      field: 'unitFrom',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'unitFrom', default: 1 },
    filter: { field: 'unitFrom', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Location To'), icon: null, width: '15rem' },
    column: {
      field: 'locationTo',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'locationTo', default: 1 },
    filter: { field: 'locationTo', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Unit To'), icon: null, width: '15rem' },
    column: {
      field: 'unitTo',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'unitTo', default: 1 },
    filter: { field: 'unitTo', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Level'), icon: null, width: '15rem' },
    column: {
      field: 'level',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'level', default: 1 },
    filter: { field: 'level', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Type'), icon: null, width: '15rem' },
    column: {
      field: 'type',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'type', default: 1 },
    filter: { field: 'type', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Speed'), icon: null, width: '15rem' },
    column: {
      field: 'speed',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'speed', default: 1 },
    filter: { field: 'speed', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Status'), icon: null, width: '15rem' },
    column: {
      field: 'status',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'status', default: 1 },
    filter: { field: 'status', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Operator'), icon: null, width: '15rem' },
    column: {
      field: 'operator',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'operator', default: 1 },
    filter: { field: 'operator', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Composition'), icon: null, width: '15rem' },
    column: {
      field: 'composition',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'composition', default: 1 },
    filter: { field: 'composition', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
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
        :records="Channel.records"
        :onUpdate="Channel.findAll"
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
