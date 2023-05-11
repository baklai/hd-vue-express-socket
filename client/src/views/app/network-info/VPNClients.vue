<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import {
  useVPNAddress,
  useСompany,
  useBranch,
  useLocation,
  useDepartment,
  useEnterprise,
  usePosition,
  useUnit
} from '@/stores/restfullapi';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import BtnDBTables from '@/components/buttons/BtnDBTables.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/VPNClient.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/VPNClient.vue';

const { findAll, removeOne } = useVPNAddress();

const companyAPI = useСompany();
const branchAPI = useBranch();
const departmentAPI = useDepartment();
const enterpriseAPI = useEnterprise();
const positionAPI = usePosition();
const locationAPI = useLocation();
const unitAPI = useUnit();

const refMenu = ref();
const refModal = ref();
const refConfirm = ref();
const refSidebar = ref();

const companies = ref([]);
const branches = ref([]);
const departments = ref([]);
const enterprises = ref([]);
const positions = ref([]);
const locations = ref([]);
const units = ref([]);

const columns = ref([
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
    filterOptions: locations,
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
    filterOptions: units,
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
    filterOptions: companies,
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
    filterOptions: branches,
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
    filterOptions: enterprises,
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
    filterOptions: departments,
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
    filterOptions: positions,
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

function toggleMenu(event, data) {
  refMenu.value.toggle(event, data);
}

function toggleModal(data) {
  refModal.value.toggle(data);
}

function toggleSidebar(data) {
  refSidebar.value.toggle(data);
}

onMounted(async () => {
  try {
    const [company, branch, department, enterprise, position, location, unit] = await Promise.all([
      companyAPI.findAll({}),
      branchAPI.findAll({}),
      departmentAPI.findAll({}),
      enterpriseAPI.findAll({}),
      positionAPI.findAll({}),
      locationAPI.findAll({}),
      unitAPI.findAll({})
    ]);
    companies.value = company;
    branches.value = branch;
    departments.value = department;
    enterprises.value = enterprise;
    positions.value = position;
    locations.value = location;
    units.value = unit;
  } catch (err) {
    console.log(err);
  }
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

      <ModalRecord
        ref="refModal"
        :companies="companies"
        :branches="branches"
        :departments="departments"
        :enterprises="enterprises"
        :positions="positions"
        :locations="locations"
        :units="units"
      />

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

      <SidebarRecord ref="refSidebar" @toggle-menu="toggleMenu" />
    </div>
  </div>
</template>
