<script setup lang="jsx">
import { ref } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';

import { useScope } from '@/stores/appscope';
import { useUser } from '@/stores/api/user';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/User.vue';
import SidebarRecord from '@/components/sidebar/IPAddress.vue';

const { t } = useI18n();

const User = useUser();
const Scope = useScope();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refDataTable = ref();

const columns = ref([
  {
    header: { text: t('Name'), icon: 'pi pi-id-card', width: '15rem' },
    column: {
      field: 'name',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'name' },
    filter: { field: 'name', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Login'), icon: 'pi pi-user', width: '12rem' },
    column: {
      field: 'login',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'login' },
    filter: { field: 'login', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('E-mail'), icon: 'pi pi-envelope', width: '16rem' },
    column: {
      field: 'email',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'email' },
    filter: { field: 'email', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Phone'), icon: 'pi pi-phone', width: '16rem' },
    column: {
      field: 'phone',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'phone' },
    filter: { field: 'phone', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Active'), icon: 'pi pi-check', width: '12rem' },
    column: {
      field: 'isActive',
      render(value) {
        return value ? <i class={'pi pi-check font-bold text-green-500'}></i> : <span>-</span>;
      },
      action: null
    },
    sorter: { field: 'isActive' },
    filter: { field: 'isActive', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Admin'), icon: 'pi pi-check-circle', width: '12rem' },
    column: {
      field: 'isAdmin',
      render(value) {
        return value ? (
          <i class={'pi pi-check-circle font-bold text-green-500'}></i>
        ) : (
          <span>-</span>
        );
      },
      action: null
    },
    sorter: { field: 'isAdmin' },
    filter: { field: 'isAdmin', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Scope'), icon: 'pi pi-exclamation-triangle', width: '12rem' },
    column: {
      field: 'scope',
      render(value) {
        return (
          <Tag
            class="text-base font-normal text-color surface-hover w-7rem px-2"
            value={value ? `${value} / ${Scope.scopeLength}` : '-'}
          />
        );
      },
      action: null
    },
    sorter: { field: 'scope' },
    filter: { field: 'scope', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: false,
    filtrable: false,
    sortable: false,
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
        @delete="(data) => refDataTable.delete(data)"
      />

      <ModalRecord ref="refModal" @close="() => refDataTable.update()" />

      <SSDataTable
        ref="refDataTable"
        :columns="columns"
        :globalFilter="null"
        :storageKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
        :onUpdate="User.findAll"
        :onDelete="User.removeOne"
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
