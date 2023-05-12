<script setup>
import { ref, computed, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import { useTicket } from '@/stores/api/ticket';
import { useСompany } from '@/stores/api/company';
import { useBranch } from '@/stores/api/branch';
import { useLocation } from '@/stores/api/location';
import { useDepartment } from '@/stores/api/department';
import { useEnterprise } from '@/stores/api/enterprise';
import { usePosition } from '@/stores/api/position';
import { useUser } from '@/stores/api/user';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import BtnDBTables from '@/components/buttons/BtnDBTables.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/Ticket.vue';
import ConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/Ticket.vue';

const ticketAPI = useTicket();

const companyAPI = useСompany();
const branchAPI = useBranch();
const departmentAPI = useDepartment();
const enterpriseAPI = useEnterprise();
const positionAPI = usePosition();
const locationAPI = useLocation();
const userAPI = useUser();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refConfirm = ref();
const refDataTable = ref();

const columns = computed(() => [
  {
    header: 'Opened an request',
    field: 'workerOpen.name',
    sortField: 'workerOpen.name',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'workerOpen',
    filterOptions: userAPI.records,
    columnWidth: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: 'Date opened',
    field: 'created',
    fieldType: 'date',
    sortField: 'created',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'created',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: 'Status',
    field: 'status',
    sortField: 'status',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'status',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: 'Request',
    field: 'request',
    sortField: 'request',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'request',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Location',
    field: 'location.title',
    sortField: 'location.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'location',
    filterOptions: locationAPI.records,
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    frozen: true
  },

  {
    header: 'Fullname',
    field: 'fullname',
    sortField: 'fullname',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'fullname',
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Phone',
    field: 'phone',
    sortField: 'phone',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'phone',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Position',
    field: 'position.title',
    sortField: 'position.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'position',
    filterOptions: positionAPI.records,
    columnWidth: '200px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'IP Address',
    field: 'ipaddress',
    sortField: 'ipaddress',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'ipaddress',
    columnWidth: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Mail number',
    field: 'mail',
    sortField: 'mail',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'mail',
    columnWidth: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Company',
    field: 'company.title',
    sortField: 'company.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'company',
    filterOptions: companyAPI.records,
    columnWidth: '200px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'Branch',
    field: 'branch.title',
    sortField: 'branch.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'branch',
    filterOptions: branchAPI.records,
    columnWidth: '200px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'Enterprise',
    field: 'enterprise.title',
    sortField: 'enterprise.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'enterprise',
    filterOptions: enterpriseAPI.records,
    columnWidth: '200px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'Department',
    field: 'department.title',
    sortField: 'department.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'department',
    filterOptions: departmentAPI.records,
    columnWidth: '200px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'Date closed',
    field: 'closed',
    fieldType: 'date',
    sortField: 'closed',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'closed',
    columnWidth: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Closed an request',
    field: 'workerClose.name',
    sortField: 'workerClose.name',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'workerClose',
    filterOptions: userAPI.records,
    columnWidth: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Conclusion for request',
    field: 'conclusion',
    sortField: 'conclusion',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'conclusion',
    columnWidth: '400px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Comment',
    field: 'comment',
    columnWidth: '200px',
    selectable: true,
    exportable: true
  }
]);

onMounted(async () => {
  await Promise.allSettled([
    companyAPI.findAll({}),
    branchAPI.findAll({}),
    departmentAPI.findAll({}),
    enterpriseAPI.findAll({}),
    positionAPI.findAll({}),
    locationAPI.findAll({}),
    userAPI.findAll({})
  ]);
});
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <OptionsMenu
        ref="refMenu"
        host="ipaddress"
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
        :records="ticketAPI.records"
        :onUpdate="ticketAPI.findAll"
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

        <template #dbbutton>
          <BtnDBTables />
        </template>
      </SSDataTable>

      <SidebarRecord ref="refSidebar" @toggle-menu="(event, data) => refMenu.toggle(event, data)" />
    </div>
  </div>
</template>
