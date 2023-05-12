<script setup>
import { ref, computed, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import { useIPAddress } from '@/stores/api/ipaddress';
import { useСompany } from '@/stores/api/company';
import { useBranch } from '@/stores/api/branch';
import { useLocation } from '@/stores/api/location';
import { useDepartment } from '@/stores/api/department';
import { useEnterprise } from '@/stores/api/enterprise';
import { usePosition } from '@/stores/api/position';
import { useUnit } from '@/stores/api/unit';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import BtnDBTables from '@/components/buttons/BtnDBTables.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/IPAddress.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/IPAddress.vue';

const ipaddressAPI = useIPAddress();

const companyAPI = useСompany();
const branchAPI = useBranch();
const departmentAPI = useDepartment();
const enterpriseAPI = useEnterprise();
const positionAPI = usePosition();
const locationAPI = useLocation();
const unitAPI = useUnit();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refDataTable = ref();
const refConfirmDelete = ref();

const columns = computed(() => [
  {
    header: 'Location',
    field: 'location.title',
    sortField: 'location.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'location',
    filterOptions: locationAPI.records,
    columnWidth: '12rem',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: true
  },

  {
    header: 'Unit',
    field: 'unit.title',
    sortField: 'unit.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'unit',
    filterOptions: unitAPI.records,
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: 'IP Address',
    field: 'ipaddress',
    sortField: 'ipaddress',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'ipaddress',
    columnWidth: '180px',
    fieldType: 'sidebar',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: 'Mask',
    field: 'mask',
    columnWidth: '150px',
    selectable: false,
    exportable: true
  },

  {
    header: 'Gateway',
    field: 'gateway',
    columnWidth: '150px',
    selectable: false,
    exportable: true
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
    header: 'Fullname',
    field: 'fullname',
    sortField: 'fullname',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'fullname',
    columnWidth: '200px',
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
    header: 'Autoanswer',
    field: 'autoanswer',
    sortField: 'autoanswer',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'autoanswer',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Mail',
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
    header: 'Date',
    field: 'date',
    sortField: 'date',
    filter: { value: null, matchMode: FilterMatchMode.DATE_IS },
    filterField: 'date',
    columnWidth: '200px',
    fieldType: 'date',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Internet',
    field: 'status.internet',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'E-mail',
    field: 'status.email',
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Comment',
    field: 'comment',
    columnWidth: '300px',
    selectable: true,
    exportable: true
  }
]);

onMounted(async () => {
  await companyAPI.findAll({});
  await branchAPI.findAll({});
  await departmentAPI.findAll({});
  await enterpriseAPI.findAll({});
  await positionAPI.findAll({});
  await locationAPI.findAll({});
  await unitAPI.findAll({});
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
        @delete="(data) => refDelete.toggle(data)"
      />

      <ModalRecord ref="refModal" @close="() => refDataTable.update()" />

      <ModalConfirmDelete ref="refConfirmDelete" @close="(data) => refConfirmDelete.toggle(data)" />

      <SSDataTable
        ref="refDataTable"
        :store="ipaddressAPI"
        :columns="columns"
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
