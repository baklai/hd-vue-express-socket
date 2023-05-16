<script setup>
import { ref, computed } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';

import { useUser } from '@/stores/api/user';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/User.vue';
import ConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/IPAddress.vue';

const { t } = useI18n();

const User = useUser();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refConfirm = ref();
const refDataTable = ref();

const columns = computed(() => [
  {
    header: { text: t('Name'), icon: null, width: '15rem' },
    column: {
      field: 'name',
      icon: 'pi pi-user',
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'name', default: 1 },
    filter: { field: 'name', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Login'), icon: null, width: '15rem' },
    column: {
      field: 'login',
      icon: 'pi pi-user',
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'login', default: 1 },
    filter: { field: 'login', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('E-mail'), icon: null, width: '15rem' },
    column: {
      field: 'email',
      icon: 'pi pi-envelope',
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'email', default: 1 },
    filter: { field: 'email', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Phone'), icon: null, width: '12rem' },
    column: {
      field: 'phone',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'phone', default: 1 },
    filter: { field: 'phone', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Active'), icon: null, width: '12rem' },
    column: {
      field: 'isActive',
      icon: null,
      type: 'boolean',
      class: null,
      action: null
    },
    sorter: { field: 'isActive', default: 1 },
    filter: { field: 'isActive', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Admin'), icon: null, width: '12rem' },
    column: {
      field: 'isAdmin',
      icon: null,
      type: 'boolean',
      class: null,
      action: null
    },
    sorter: { field: 'isAdmin', default: 1 },
    filter: { field: 'isAdmin', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Scope'), icon: null, width: '12rem' },
    column: {
      field: 'scope',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'scope', default: 1 },
    filter: { field: 'scope', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
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
        @edit="(data) => refModal.toggle(data)"
        @delete="(data) => refConfirm.toggle(data)"
      />

      <ModalRecord ref="refModal" @close="() => refDataTable.update()" />

      <ConfirmDelete ref="refConfirm" @close="(data) => refConfirm.toggle(data)" />

      <SSDataTable
        ref="refDataTable"
        :columns="columns"
        :records="User.records"
        :onUpdate="User.findAll"
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
