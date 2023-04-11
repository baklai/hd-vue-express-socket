<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import {
  useRequest,
  useСompany,
  useBranch,
  useLocation,
  useDepartment,
  useEnterprise,
  usePosition,
  useUser
} from '@/stores/restfullapi';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/Request.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/Request.vue';

const { t } = useI18n();
const toast = useToast();

const requestAPI = useRequest();

const companyAPI = useСompany();
const branchAPI = useBranch();
const departmentAPI = useDepartment();
const enterpriseAPI = useEnterprise();
const positionAPI = usePosition();
const locationAPI = useLocation();
const userAPI = useUser();

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
const users = ref([]);

const columns = ref([
  {
    header: t('Opened an request'),
    field: 'workerOpen.name',
    sortField: 'workerOpen.name',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'workerOpen',
    showFilterMatchModes: false,
    filterOptions: users,
    width: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: t('Date opened'),
    field: 'created',
    sortField: 'created',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'created',
    showFilterMatchModes: false,
    type: 'date',
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: t('Status'),
    field: 'status',
    sortField: 'status',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'status',
    showFilterMatchModes: false,
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: t('Request'),
    field: 'request',
    sortField: 'request',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'request',
    showFilterMatchModes: false,
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
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
    header: t('Fullname'),
    field: 'fullname',
    sortField: 'fullname',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'fullname',
    showFilterMatchModes: true,
    width: '180px',
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
    header: t('IP Address'),
    field: 'ipaddress',
    sortField: 'ipaddress',
    filterField: 'ipaddress',
    showFilterMatchModes: true,
    width: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Mail number'),
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
    header: t('Date closed'),
    field: 'closed',
    sortField: 'closed',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'closed',
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
    header: t('Closed an request'),
    field: 'workerClose.name',
    sortField: 'workerClose.name',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'workerClose',
    showFilterMatchModes: false,
    filterOptions: users,
    width: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Conclusion for request'),
    field: 'conclusion',
    sortField: 'conclusion',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'conclusion',
    showFilterMatchModes: true,
    width: '400px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Comment'),
    field: 'comment',
    width: '200px',
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
    await requestAPI.removeOne(data);
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
    const [company, branch, department, enterprise, position, location, user] = await Promise.all([
      companyAPI.findAll({}),
      branchAPI.findAll({}),
      departmentAPI.findAll({}),
      enterpriseAPI.findAll({}),
      positionAPI.findAll({}),
      locationAPI.findAll({}),
      userAPI.findAll({})
    ]);
    companies.value = company;
    branches.value = branch;
    departments.value = department;
    enterprises.value = enterprise;
    positions.value = position;
    locations.value = location;
    users.value = user;
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
        :users="users"
      />

      <ModalConfirmDelete ref="refConfirm" @delete="deleteRecord" />

      <SSDataTable
        tables
        :columns="columns"
        :store="requestAPI"
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
