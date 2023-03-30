<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
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
import HostToolsMenu from '@/components/menus/HostToolsMenu.vue';
import ModalIPAddress from '@/components/modals/IPAddress.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarIPAddress from '@/components/sidebar/IPAddress.vue';

const { t } = useI18n();
const toast = useToast();

const IPAddressAPI = useIPAddress();

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
    sortable: false,
    frozen: false
  },

  {
    header: t('IP Address'),
    field: 'ipaddress',
    sortField: 'ipaddress',
    filterField: 'ipaddress',
    showFilterMatchModes: true,
    width: '150px',
    type: 'sidebar',
    // action: toggleSidebar(record),
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: true
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
    sortable: true,
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
    sortable: false,
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
    sortable: true,
    frozen: false
  },

  {
    header: t('Autoanswer'),
    field: 'autoanswer',
    sortField: 'autoanswer',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'autoanswer',
    showFilterMatchModes: true,
    width: '150px',
    selectable: true,
    exportable: true,
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
    sortable: true,
    frozen: false
  },

  {
    header: t('Date'),
    field: 'date',
    sortField: 'date',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'date',
    showFilterMatchModes: true,
    width: '200px',
    type: 'date',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Internet'),
    field: 'internet',
    width: '150px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('E-mail'),
    field: 'email',
    width: '150px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Comment'),
    field: 'comment',
    sortField: 'comment',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'comment',
    showFilterMatchModes: true,
    width: '300px',
    selectable: true,
    exportable: true,
    sortable: true,
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
    await IPAddressAPI.removeOne(data);
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
  companies.value = await companyAPI.findAll({});
  branches.value = await branchAPI.findAll({});
  departments.value = await departmentAPI.findAll({});
  enterprises.value = await enterpriseAPI.findAll({});
  positions.value = await positionAPI.findAll({});
  locations.value = await locationAPI.findAll({});
  units.value = await unitAPI.findAll({});
});
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <HostToolsMenu
        ref="refMenu"
        isHost
        hostField="ipaddress"
        @view="(data) => refSidebar.toggle(data)"
        @create="(data) => refModal.toggle(data)"
        @edit="(data) => refModal.toggle(data)"
        @delete="(data) => refConfirm.toggle(data)"
      />

      <ModalIPAddress
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
        :store="IPAddressAPI"
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

      <SidebarIPAddress ref="refSidebar" @toggle-menu="toggleMenu" />
    </div>
  </div>
</template>
