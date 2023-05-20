<script setup lang="jsx">
import { ref } from 'vue';
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

const columns = ref([
  {
    header: { text: t('Location from'), icon: null, width: '15rem' },
    column: {
      field: 'locationFrom',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'locationFrom' },
    filter: {
      field: 'locationFrom',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      options: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Unit from'), icon: null, width: '12rem' },
    column: {
      field: 'unitFrom',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'unitFrom' },
    filter: { field: 'unitFrom', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Location to'), icon: null, width: '15rem' },
    column: {
      field: 'locationTo',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'locationTo' },
    filter: {
      field: 'locationTo',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      options: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Unit to'), icon: null, width: '12rem' },
    column: {
      field: 'unitTo',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'unitTo' },
    filter: { field: 'unitTo', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Level'), icon: null, width: '12rem' },
    column: {
      field: 'level',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'level' },
    filter: { field: 'level', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Type'), icon: null, width: '12rem' },
    column: {
      field: 'type',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'type' },
    filter: { field: 'type', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Speed'), icon: null, width: '12rem' },
    column: {
      field: 'speed',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'speed' },
    filter: { field: 'speed', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Status'), icon: null, width: '12rem' },
    column: {
      field: 'status',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'status' },
    filter: { field: 'status', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Operator'), icon: null, width: '12rem' },
    column: {
      field: 'operator',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'operator' },
    filter: { field: 'operator', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Composition'), icon: null, width: '12rem' },
    column: {
      field: 'composition',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'composition' },
    filter: {
      field: 'composition',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      options: null
    },
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
        :onUpdate="Channel.findAll"
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
