<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import { useVPNAddress } from '@/stores/api/vpn';
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
import ModalRecord from '@/components/modals/VPNClient.vue';
import ConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/VPNClient.vue';

const VPNAddress = useVPNAddress();

const Сompany = useСompany();
const Branch = useBranch();
const Department = useDepartment();
const Enterprise = useEnterprise();
const Position = usePosition();
const Location = useLocation();
const Unit = useUnit();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refConfirm = ref();
const refDataTable = ref();

const columns = computed(() => [
  {
    header: 'VPN Address',
    field: 'vpn',
    sortField: 'vpn',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'vpn',
    columnWidth: '180px',
    fieldType: 'sidebar',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: 'User login',
    field: 'login',
    sortField: 'login',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'login',
    columnWidth: '200px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'Service',
    field: 'service',
    columnWidth: '250px',
    selectable: true,
    exportable: true
  },

  {
    header: 'IP Address',
    field: 'ipaddress',
    sortField: 'ipaddress',
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
    header: 'Location',
    field: 'location.title',
    sortField: 'location.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'location',
    filterOptions: Location.records,
    columnWidth: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    frozen: true
  },

  {
    header: 'Unit',
    field: 'unit.title',
    sortField: 'unit.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'unit',
    filterOptions: Unit.records,
    columnWidth: '150px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'Company',
    field: 'company.title',
    sortField: 'company.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'company',
    filterOptions: Сompany.records,
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
    filterOptions: Branch.records,
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
    filterOptions: Enterprise.records,
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
    filterOptions: Department.records,
    columnWidth: '200px',
    selectable: true,
    exportable: true,
    filtrable: true
  },

  {
    header: 'Position',
    field: 'position.title',
    sortField: 'position.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'position',
    filterOptions: Position.records,
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
    header: 'Date open',
    field: 'dateOpen',
    fieldType: 'date',
    sortField: 'dateOpen',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'dateOpen',
    columnWidth: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true
  },

  {
    header: 'Date close',
    field: 'dateClose',
    fieldType: 'dateClose',
    sortField: 'dateClose',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filterField: 'dateClose',
    columnWidth: '200px',
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
  await Promise.allSettled([
    Сompany.findAll({}),
    Branch.findAll({}),
    Department.findAll({}),
    Enterprise.findAll({}),
    Position.findAll({}),
    Location.findAll({}),
    Unit.findAll({})
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
        :records="VPNAddress.records"
        :onUpdate="VPNAddress.findAll"
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
