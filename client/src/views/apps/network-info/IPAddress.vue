<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useIPAddress, useLocation } from '@/stores/restfullapi';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import ModalIPAddress from '@/components/modals/IPAddress.vue';
import SidebarIPAddress from '@/components/sidebar/IPAddress.vue';

const { t } = useI18n();
const toast = useToast();

const IPAddressAPI = useIPAddress();
const locationAPI = useLocation();

const refSidebar = ref();

const locations = ref([]);

const columns = ref([
  {
    header: t('Location'),
    field: 'location.title',

    //  filter: { location: { value: null, matchMode: FilterMatchMode.IN } },
    filterField: 'location',
    showFilterMatchModes: false,
    filterOptions: locations,
    sortField: 'location.title',
    width: '180px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: true
  },

  {
    header: t('Unit'),
    field: 'unit.title',
    filterField: 'unit',
    sortField: 'unit.title',
    width: '150px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('IP Address'),
    field: 'ipaddress',
    filterField: 'ipaddress',
    sortField: 'ipaddress',
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
    filterField: 'company',
    sortField: 'company.title',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Branch'),
    field: 'branch.title',
    filterField: 'branch',
    sortField: 'branch.title',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Enterprise'),
    field: 'enterprise.title',
    filterField: 'enterprise',
    sortField: 'enterprise.title',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Department'),
    field: 'department.title',
    filterField: 'department',
    sortField: 'department.title',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Fullname'),
    field: 'fullname',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Position'),
    field: 'position.title',
    filterField: 'position',
    sortField: 'position.title',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Phone'),
    field: 'phone',
    width: '150px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Autoanswer'),
    field: 'autoanswer',
    width: '150px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Mail'),
    field: 'mail',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Date'),
    field: 'date',
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
    width: '300px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  }
]);

onMounted(async () => {
  locations.value = await locationAPI.findAll({});

  console.log(locations.value);
});
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <SSDataTable tables :columns="columns" :api="IPAddressAPI">
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
            <ModalIPAddress />
          </template> -->
        <template #sidebar>
          <SidebarIPAddress ref="refSidebar" />
        </template>
      </SSDataTable>
    </div>
  </div>
</template>
