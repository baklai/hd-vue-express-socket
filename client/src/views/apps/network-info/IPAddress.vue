<script setup>
import { ref, onMounted } from 'vue';

import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useIPAddress } from '@/stores/restfullapi';

import HDDataTable from '@/components/tables/HDDataTable.vue';
import ModalIPAddress from '@/components/modals/IPAddress.vue';
import SidebarIPAddress from '@/components/sidebar/IPAddress.vue';

const { t } = useI18n();
const toast = useToast();
const API = useIPAddress();

const record = ref(null);

const columns = ref([
  {
    field: 'location',
    header: t('Location'),
    align: 'start',
    width: '180px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: true
  },

  {
    field: 'unit',
    header: t('Unit'),
    align: 'start',
    width: '150px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: false
  },

  {
    field: 'ipaddress',
    header: t('IP Address'),
    align: 'start',
    width: '120px',
    selectable: false,
    exportable: true,
    sortable: true,
    frozen: true
  },

  {
    field: 'company',
    header: t('Company'),
    align: 'start',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: false
  },

  {
    field: 'branch',
    header: t('Branch'),
    align: 'start',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: false
  },

  {
    field: 'enterprise',
    header: t('Enterprise'),
    align: 'start',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: false
  },

  {
    field: 'department',
    header: t('Department'),
    align: 'start',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: false
  },

  {
    field: 'fullname',
    header: t('Fullname'),
    align: 'start',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'position',
    header: t('Position'),
    align: 'start',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: false,
    frozen: false
  },

  {
    field: 'phone',
    header: t('Phone'),
    align: 'start',
    width: '150px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'autoanswer',
    header: t('Autoanswer'),
    align: 'start',
    width: '150px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'mail',
    header: t('Mail'),
    align: 'start',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'date',
    header: t('Date'),
    align: 'start',
    width: '200px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'internet',
    header: t('Internet'),
    align: 'start',
    width: '150px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'email',
    header: t('E-mail'),
    align: 'start',
    width: '150px',
    selectable: true,
    exportable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'comment',
    header: t('Comment'),
    align: 'start',
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
        <HDDataTable tables :columns="columns">
          <template #modal>
            <ModalIPAddress />
          </template>
          <template #sidebar="{ ref }">
            <SidebarIPAddress :ref="ref" />
          </template>
        </HDDataTable>
      </div>
    </div>
  </div>
</template>
