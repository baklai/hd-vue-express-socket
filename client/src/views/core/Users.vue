<script setup>
import { ref, computed } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import { useUser } from '@/stores/api/user';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/User.vue';
import ConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/IPAddress.vue';

const User = useUser();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refConfirm = ref();
const refDataTable = ref();

const columns = computed(() => [
  {
    header: 'Name',
    field: 'name',
    fieldIcon: 'pi pi-user',
    sortField: 'name',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'name',
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    frozen: true
  },
  {
    header: 'Login',
    field: 'login',
    fieldIcon: 'pi pi-user',
    sortField: 'login',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'login',
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    frozen: true
  },
  {
    header: 'E-mail',
    field: 'email',
    sortField: 'email',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'email',
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    frozen: true
  },
  {
    header: 'Phone',
    field: 'phone',
    sortField: 'phone',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'phone',
    width: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    frozen: true
  },
  {
    header: 'Active',
    field: 'isActive',
    sortField: 'isActive',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'isActive',
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    frozen: true
  },
  {
    header: 'Admin',
    field: 'isAdmin',
    sortField: 'isAdmin',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'isAdmin',
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    frozen: true
  },
  {
    header: 'Scope',
    field: 'scope',
    sortField: 'scope',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'scope',
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
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
