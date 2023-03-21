<script setup>
import { ref, onMounted } from 'vue';

import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useIPAddress } from '@/stores/restfullapi';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import ModalIPAddress from '@/components/modals/IPAddress.vue';
import SidebarIPAddress from '@/components/sidebar/IPAddress.vue';

const { t } = useI18n();
const toast = useToast();
const API = useIPAddress();

const record = ref(null);

const columns = ref([
  {
    header: t('Location'),
    field: 'location.title',
    filterField: 'location.title',
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
    filterField: 'unit.title',
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
    width: '120px',
    type: 'action',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: true
  },

  {
    header: t('Company'),
    field: 'company.title',
    filterField: 'company.title',
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
    filterField: 'branch.title',
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
    filterField: 'enterprise.title',
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
    filterField: 'department.title',
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
    filterField: 'position.title',
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

const refSidebar = ref();
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <div class="w-full overflow-x-auto">
        <SSDataTable tables :columns="columns" :api="API">
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
          <template #sidebar="{ ref }">
            <SidebarIPAddress :ref="ref" />
          </template>
        </SSDataTable>
      </div>
    </div>
  </div>
</template>
