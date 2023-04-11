<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
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
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/VPNClient.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/VPNClient.vue';

const { t } = useI18n();
const toast = useToast();

const VPNAddressAPI = useVPNAddress();

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
    header: t('VPN Address'),
    field: 'vpn',
    sortField: 'vpn',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'vpn',
    showFilterMatchModes: true,
    width: '180px',
    type: 'sidebar',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: t('User login'),
    field: 'login',
    sortField: 'login',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'login',
    showFilterMatchModes: false,
    filterOptions: units,
    width: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Service'),
    field: 'service',
    width: '250px',
    selectable: true,
    exportable: true,
    filtrable: false,
    sortable: false,
    frozen: false
  },

  {
    header: t('IP Address'),
    field: 'ipaddress',
    sortField: 'ipaddress',
    filterField: 'ipaddress',
    showFilterMatchModes: true,
    width: '180px',
    type: 'sidebar',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: t('Location'),
    field: 'location.title',
    sortField: 'location.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'location',
    showFilterMatchModes: false,
    filterOptions: locations,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: true
  },

  {
    header: t('Unit'),
    field: 'unit.title',
    sortField: 'unit.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'unit',
    showFilterMatchModes: false,
    filterOptions: units,
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Company'),
    field: 'company.title',
    sortField: 'company.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'company',
    showFilterMatchModes: false,
    filterOptions: companies,
    width: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Branch'),
    field: 'branch.title',
    sortField: 'branch.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'branch',
    showFilterMatchModes: false,
    filterOptions: branches,
    width: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Enterprise'),
    field: 'enterprise.title',
    sortField: 'enterprise.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'enterprise',
    showFilterMatchModes: false,
    filterOptions: enterprises,
    width: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Department'),
    field: 'department.title',
    sortField: 'department.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'department',
    showFilterMatchModes: false,
    filterOptions: departments,
    width: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Position'),
    field: 'position.title',
    sortField: 'position.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'position',
    showFilterMatchModes: false,
    filterOptions: positions,
    width: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Fullname'),
    field: 'fullname',
    sortField: 'fullname',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'fullname',
    showFilterMatchModes: true,
    width: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Phone'),
    field: 'phone',
    sortField: 'phone',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'phone',
    showFilterMatchModes: true,
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Mail'),
    field: 'mail',
    sortField: 'mail',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'mail',
    showFilterMatchModes: true,
    width: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Date open'),
    field: 'dateOpen',
    sortField: 'dateOpen',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'dateOpen',
    showFilterMatchModes: true,
    width: '200px',
    type: 'date',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Date close'),
    field: 'dateClose',
    sortField: 'dateClose',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'dateClose',
    showFilterMatchModes: true,
    width: '200px',
    type: 'dateClose',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Comment'),
    field: 'comment',
    width: '300px',
    selectable: true,
    exportable: true,
    filtrable: false,
    sortable: false,
    frozen: false
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

async function deleteRecord(data) {
  try {
    await VPNAddressAPI.removeOne(data);
    toast.add({
      severity: 'success',
      summary: t('HD Information'),
      detail: t('Record deletion completed successfully'),
      life: 3000
    });
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: t('HD Error'),
      detail: t('Record deletion failed'),
      life: 3000
    });
  }
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
      />

      <ModalConfirmDelete ref="refConfirm" @delete="deleteRecord" />

      <SSDataTable
        tables
        :columns="columns"
        :store="VPNAddressAPI"
        :stateKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
        @toggle-menu="toggleMenu"
        @toggle-modal="toggleModal"
        @toggle-sidebar="toggleSidebar"
      >
        <template #icon>
          <i class="mr-2 hidden sm:block">
            <AppIcons :name="$route?.meta?.icon" :size="42" />
          </i>
        </template>
        <template #title>
          {{ $t($route?.meta?.title) }}
        </template>
        <template #subtitle>
          {{ $t($route?.meta?.description) }}
        </template>
      </SSDataTable>

      <SidebarRecord ref="refSidebar" @toggle-menu="toggleMenu" />
    </div>
  </div>
</template>
