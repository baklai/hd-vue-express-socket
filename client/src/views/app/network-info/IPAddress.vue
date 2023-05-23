<script setup lang="jsx">
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';

import { dateToStr } from '@/service/DataFilters';
import { useIPAddress } from '@/stores/api/ipaddress';
import { useСompany } from '@/stores/api/company';
import { useBranch } from '@/stores/api/branch';
import { useLocation } from '@/stores/api/location';
import { useDepartment } from '@/stores/api/department';
import { useEnterprise } from '@/stores/api/enterprise';
import { usePosition } from '@/stores/api/position';
import { useUnit } from '@/stores/api/unit';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import BtnDBTables from '@/components/buttons/BtnDBTables.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/IPAddress.vue';
import SidebarRecord from '@/components/sidebar/IPAddress.vue';

const { t } = useI18n();

const IPAddress = useIPAddress();
const Сompany = useСompany();
const Branch = useBranch();
const Department = useDepartment();
const Enterprise = useEnterprise();
const Position = usePosition();
const Location = useLocation();
const Unit = useUnit();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refDataTable = ref();

const options = ref({});

const globalFilter = ref({
  field: 'ipaddress',
  placeholder: 'Search IP Address'
});

const columns = ref([
  {
    header: { text: t('Location'), icon: null, width: '15rem' },
    column: {
      field: 'location.title',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'location.title' },
    filter: {
      field: 'location',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title'
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: true
  },

  {
    header: { text: t('Unit'), icon: null, width: '12rem' },
    column: {
      field: 'unit.title',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'unit.title' },
    filter: {
      field: 'unit',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title'
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('IP Address'), icon: null, width: '15rem' },
    column: {
      field: 'ipaddress',
      render(value) {
        return <span class="font-medium text-primary cursor-pointer">{value}</span>;
      },
      action(data) {
        refSidebar.value.toggle(data);
      }
    },
    sorter: { field: 'indexip' },
    filter: { field: 'ipaddress', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Mask'), icon: null, width: '12rem' },
    column: {
      field: 'mask',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    selectable: false,
    exportable: false,
    filtrable: false,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Gateway'), icon: null, width: '12rem' },
    column: {
      field: 'gateway',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    selectable: false,
    exportable: false,
    filtrable: false,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Company'), icon: null, width: '16rem' },
    column: {
      field: 'company.title',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'company.title' },
    filter: {
      field: 'company',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title'
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Branch'), icon: null, width: '16rem' },
    column: {
      field: 'branch.title',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'branch.title' },
    filter: {
      field: 'branch',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title'
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Enterprise'), icon: null, width: '16rem' },
    column: {
      field: 'enterprise.title',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'enterprise.title' },
    filter: {
      field: 'enterprise',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title'
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Department'), icon: null, width: '16rem' },
    column: {
      field: 'department.title',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'department.title' },
    filter: {
      field: 'department',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title'
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Fullname'), icon: null, width: '16rem' },
    column: {
      field: 'fullname',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'fullname' },
    filter: { field: 'fullname', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Position'), icon: null, width: '16rem' },
    column: {
      field: 'position.title',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'position.title' },
    filter: {
      field: 'position',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title'
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Phone'), icon: null, width: '12rem' },
    column: {
      field: 'phone',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'phone' },
    filter: { field: 'phone', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Autoanswer'), icon: null, width: '12rem' },
    column: {
      field: 'autoanswer',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'autoanswer' },
    filter: {
      field: 'autoanswer',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      options: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Mail'), icon: null, width: '16rem' },
    column: {
      field: 'mail',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'mail' },
    filter: { field: 'mail', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Date'), icon: null, width: '16rem' },
    column: {
      field: 'date',
      render(value) {
        return <span>{dateToStr(value) || '-'}</span>;
      },
      action: null
    },
    sorter: { field: 'date' },
    filter: { field: 'date', value: null, matchMode: FilterMatchMode.DATE_IS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Internet'), icon: null, width: '12rem' },
    column: {
      field: 'status.internet',
      dataType: 'boolean',
      render(value) {
        return value ? <i class={'pi pi-check font-bold text-green-500'}></i> : <span>-</span>;
      },
      action: null
    },
    sorter: { field: 'status.internet' },
    filter: {
      field: 'internet',
      value: null,
      matchMode: FilterMatchMode.EQUALS,
      options: {
        key: 'key',
        value: 'key',
        label: 'title'
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('E-mail'), icon: null, width: '12rem' },
    column: {
      field: 'status.email',
      dataType: 'boolean',
      render(value) {
        return value ? <i class={'pi pi-check font-bold text-green-500'}></i> : <span>-</span>;
      },
      action: null
    },
    sorter: { field: 'status.email' },
    filter: {
      field: 'email',
      value: null,
      matchMode: FilterMatchMode.EQUALS,
      options: {
        key: 'key',
        value: 'key',
        label: 'title'
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Comment'), icon: null, width: '25rem' },
    column: {
      field: 'comment',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    selectable: true,
    exportable: false,
    filtrable: false,
    sortable: false,
    frozen: false
  }
]);

onMounted(async () => {
  try {
    options.value = {
      company: await Сompany.findAll({}),
      branch: await Branch.findAll({}),
      enterprise: await Enterprise.findAll({}),
      department: await Department.findAll({}),
      position: await Position.findAll({}),
      location: await Location.findAll({}),
      unit: await Unit.findAll({}),
      internet: [
        { key: 'opened', title: t('Internet opened') },
        { key: 'closed', title: t('Internet closed') },
        { key: 'missing', title: t('Not Internet') }
      ],
      email: [
        { key: 'opened', title: t('Email opened') },
        { key: 'closed', title: t('Email closed') },
        { key: 'missing', title: t('Not Email') }
      ]
    };
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <OptionsMenu
        ref="refMenu"
        hostkey="ipaddress"
        @view="(data) => refSidebar.toggle(data)"
        @create="(data) => refModal.toggle(data)"
        @update="(data) => refModal.toggle(data)"
        @delete="(data) => refDataTable.delete(data)"
      />

      <ModalRecord ref="refModal" @close="() => refDataTable.update()" />

      <SSDataTable
        ref="refDataTable"
        :options="options"
        :columns="columns"
        :globalFilter="globalFilter"
        :storageKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
        :onUpdate="IPAddress.findAll"
        :onDelete="IPAddress.removeOne"
        @toggle-menu="(event, data) => refMenu.toggle(event, data)"
        @toggle-modal="(data) => refModal.toggle(data)"
        @toggle-sidebar="(data) => refSidebar.toggle(data)"
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

        <template #actions>
          <BtnDBTables />
        </template>
      </SSDataTable>

      <SidebarRecord ref="refSidebar" @toggle-menu="(event, data) => refMenu.toggle(event, data)" />
    </div>
  </div>
</template>
