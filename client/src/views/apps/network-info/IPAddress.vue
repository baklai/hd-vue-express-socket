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
import ModalIPAddress from '@/components/modals/IPAddress.vue';
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

const refModal = ref();
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
    type: 'action',
    action(data) {
      refSidebar.value.toggle(data);
    },
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: true
  },

  {
    header: t('Company'),
    field: 'company.title',
    sortField: 'company.title',
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
    filterField: 'comment',
    showFilterMatchModes: true,
    width: '300px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  }
]);

const modalA = ref(false);

onMounted(async () => {
  companies.value = await companyAPI.findAll({});
  branches.value = await branchAPI.findAll({});
  departments.value = await departmentAPI.findAll({});
  enterprises.value = await enterpriseAPI.findAll({});
  positions.value = await positionAPI.findAll({});
  locations.value = await locationAPI.findAll({});
  units.value = await unitAPI.findAll({});
});

const openModal = () => {
  modalA.value = true;
  // refModal.value.toggle(data);
};
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <ModalIPAddress ref="refModal" v-model:show="modalA" />
      <Button @click="modalA = !modalA">Open Modal</Button>
      <SSDataTable tables :columns="columns" :api="IPAddressAPI" :modal="openModal">
        <template #icon>
          <i class="pi pi-sitemap text-6xl mr-3 hidden sm:block"></i>
        </template>
        <template #title>
          {{ $t('Network IP Address') }}
        </template>
        <template #subtitle>
          {{ $t('Network IP Address of the technical support department') }}
        </template>
        <!-- <template #modal>
          <ModalIPAddress ref="refModal" />
        </template> -->
        <template #sidebar>
          <SidebarIPAddress ref="refSidebar" />
        </template>
      </SSDataTable>
    </div>
  </div>
</template>
