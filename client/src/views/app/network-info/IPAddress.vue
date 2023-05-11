<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import {
  useIPAddress,
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
import ModalRecord from '@/components/modals/IPAddress.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/IPAddress.vue';

const { findAll, removeOne } = useIPAddress();

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
    header: 'Location',
    field: 'location.title',
    sortField: 'location.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'location',
    filterOptions: locations,
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
    filterOptions: units,
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
    filterOptions: positions,
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
        isHost
        hostField="ipaddress"
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
        @delete="(data) => refConfirm.toggle(data)"
      />

      <ModalConfirmDelete
        ref="refConfirm"
        :onDelete="removeOne"
        @delete="(data) => refConfirm.toggle(data)"
      />

      <SSDataTable
        :columns="columns"
        :onRecords="findAll"
        :storageKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
        @toggle-menu="toggleMenu"
        @toggle-modal="toggleModal"
        @toggle-sidebar="toggleSidebar"
        @view="(data) => refSidebar.toggle(data)"
        @create="(data) => refModal.toggle(data)"
        @edit="(data) => refModal.toggle(data)"
        @delete="(data) => refConfirm.toggle(data)"
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
