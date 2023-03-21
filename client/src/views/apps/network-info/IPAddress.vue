<script setup>
import { ref, onMounted } from 'vue';

import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useIPAddress } from '@/stores/restfullapi';

import HDDataTable from '@/components/tables/HDDataTable.vue';
import IPAddress from '@/components/sidebar/IPAddress.vue';

const { t } = useI18n();
const toast = useToast();
const API = useIPAddress();

const params = ref({});
const loading = ref(false);

const record = ref(null);
const records = ref([]);

const columns = ref([
  {
    field: 'options',
    header: t('Options'),
    align: 'start',
    width: '180px',
    selectable: true,
    exportable: false,
    sortable: false,
    frozen: true
  },

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
    selectable: true,
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

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  location: { value: null, matchMode: FilterMatchMode.IN },
  unit: { value: null, matchMode: FilterMatchMode.IN },
  ipaddress: { value: null, matchMode: FilterMatchMode.IN },
  company: { value: null, matchMode: FilterMatchMode.IN },
  branch: { value: null, matchMode: FilterMatchMode.IN },
  enterprise: { value: null, matchMode: FilterMatchMode.IN },
  department: { value: null, matchMode: FilterMatchMode.IN },
  fullname: { value: null, matchMode: FilterMatchMode.IN },
  position: { value: null, matchMode: FilterMatchMode.IN },
  phone: { value: null, matchMode: FilterMatchMode.IN },
  autoanswer: { value: null, matchMode: FilterMatchMode.IN },
  mail: { value: null, matchMode: FilterMatchMode.IN },
  date: { value: null, matchMode: FilterMatchMode.IN },
  internet: { value: null, matchMode: FilterMatchMode.IN },
  email: { value: null, matchMode: FilterMatchMode.IN },
  comment: { value: null, matchMode: FilterMatchMode.IN }
});

const refOptionMenu = ref();

const refSidebar = ref();

onMounted(async () => {
  loading.value = true;
  params.value = {
    offset: offsetRecords.value,
    limit: recordsPerPage.value,
    sortField: null,
    sortOrder: null,
    filters: filters.value
  };
  await getDataRecords();
});

const getDataRecords = async () => {
  try {
    loading.value = true;
    const { docs, total, offset, limit } = await API.findAll(params.value);
    records.value = docs;
    totalRecords.value = total;
    offsetRecords.value = Number(offset);
    recordsPerPage.value = limit;
  } catch (err) {
    records.value = [];
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <div class="w-full overflow-x-auto">
        <HDDataTable />
      </div>

      <IPAddress ref="refSidebar" />
    </div>
  </div>
</template>
