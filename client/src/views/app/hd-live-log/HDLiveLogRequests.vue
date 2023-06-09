<script setup lang="jsx">
import { ref, computed, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';

import { dateTimeToStr } from '@/service/DataFilters';
import { useRequest } from '@/stores/api/request';
import { useСompany } from '@/stores/api/company';
import { useBranch } from '@/stores/api/branch';
import { useLocation } from '@/stores/api/location';
import { useDepartment } from '@/stores/api/department';
import { useEnterprise } from '@/stores/api/enterprise';
import { usePosition } from '@/stores/api/position';
import { useUser } from '@/stores/api/user';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import BtnDBTables from '@/components/buttons/BtnDBTables.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/Request.vue';
import SidebarRecord from '@/components/sidebar/Request.vue';

const { t } = useI18n();

const Request = useRequest();
const Сompany = useСompany();
const Branch = useBranch();
const Department = useDepartment();
const Enterprise = useEnterprise();
const Position = usePosition();
const Location = useLocation();
const User = useUser();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refDataTable = ref();

const options = ref({});

const globalFilter = computed(() => {
  return {
    field: 'request',
    value: null,
    matchMode: FilterMatchMode.STARTS_WITH,
    placeholder: 'Search request'
  };
});

const columns = ref([
  {
    header: { text: 'Opened an request', icon: null, width: '16rem' },
    column: {
      field: 'workerOpen.fullname',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'workerOpen.fullname' },
    filter: {
      field: 'workerOpen',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'fullname'
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: true
  },

  {
    header: { text: 'Date opened', icon: null, width: '15rem' },
    column: {
      field: 'createdAt',
      render(value) {
        return <span class="cursor-pointer">{dateTimeToStr(value) || '-'}</span>;
      },
      action(data) {
        refSidebar.value.toggle(data);
      }
    },
    sorter: { field: 'createdAt' },
    filter: {
      field: 'createdAt',
      value: null,
      matchMode: FilterMatchMode.DATE_IS,
      showFilterMatchModes: true,
      options: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: 'Status', icon: null, width: '12rem' },
    column: {
      field: 'closed',
      render(value) {
        return !value ? (
          <i class="pi pi-info-circle text-orange-500 font-bold cursor-pointer" />
        ) : (
          <i class="pi pi-check-circle text-green-500 font-bold cursor-pointer" />
        );
      },
      action(data) {
        refSidebar.value.toggle(data);
      }
    },
    sorter: { field: 'closed' },
    filter: {
      field: 'closed',
      value: null,
      matchMode: FilterMatchMode.DATE_IS,
      showFilterMatchModes: true,
      options: null
    },
    selectable: true,
    exportable: false,
    filtrable: false,
    sortable: true,
    frozen: true
  },

  {
    header: { text: 'Request', icon: null, width: '25rem' },
    column: {
      field: 'request',
      render(value) {
        return <span class="cursor-pointer">{value}</span>;
      },
      action(data) {
        refSidebar.value.toggle(data);
      }
    },
    sorter: { field: 'request' },
    filter: {
      field: 'request',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      showFilterMatchModes: true,
      options: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: 'Location', icon: null, width: '15rem' },
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
    frozen: false
  },

  {
    header: { text: 'Fullname', icon: null, width: '16rem' },
    column: {
      field: 'fullname',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'fullname' },
    filter: {
      field: 'fullname',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      showFilterMatchModes: true,
      options: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: 'Phone', icon: null, width: '15rem' },
    column: {
      field: 'phone',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'phone' },
    filter: {
      field: 'phone',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      showFilterMatchModes: true,
      options: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: 'Position', icon: null, width: '16rem' },
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
    header: { text: 'IP Address', icon: null, width: '16rem' },
    column: {
      field: 'ipaddress',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'ipaddress' },
    filter: {
      field: 'ipaddress',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      showFilterMatchModes: true,
      options: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: 'Mail', icon: null, width: '16rem' },
    column: {
      field: 'mail',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'mail' },
    filter: {
      field: 'mail',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      showFilterMatchModes: true,
      options: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: 'Company', icon: null, width: '16rem' },
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
    header: { text: 'Branch', icon: null, width: '16rem' },
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
    header: { text: 'Enterprise', icon: null, width: '16rem' },
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
    header: { text: 'Department', icon: null, width: '16rem' },
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
    header: { text: 'Date closed', icon: null, width: '15rem' },
    column: {
      field: 'closed',
      render(value) {
        return <span>{dateTimeToStr(value) || '-'}</span>;
      },
      action: null
    },
    sorter: { field: 'closed' },
    filter: {
      field: 'closed',
      value: null,
      matchMode: FilterMatchMode.DATE_IS,
      showFilterMatchModes: true,
      options: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: 'Closed an request', icon: null, width: '16rem' },
    column: {
      field: 'workerClose.fullname',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'workerClose.fullname' },
    filter: {
      field: 'workerClose',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'fullname'
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: 'Conclusion for request', icon: null, width: '25rem' },
    column: {
      field: 'conclusion',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    selectable: true,
    exportable: true,
    filtrable: false,
    sortable: false,
    frozen: false
  },

  {
    header: { text: 'Comment', icon: null, width: '25rem' },
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
      workerOpen: await User.find({}),
      workerClose: await User.find({})
    };
  } catch (err) {
    console.error(err);
    toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t(err.message), life: 3000 });
  }
});
</script>

<template>
  <div class="col-12">
    <div class="flex h-full">
      <OptionsMenu
        ref="refMenu"
        hostkey="ipaddress"
        @view="(data) => refSidebar.toggle(data)"
        @create="(data) => refModal.toggle(data)"
        @update="(data) => refModal.toggle(data)"
        @delete="(data) => refDataTable.delete(data)"
      />

      <ModalRecord ref="refModal" @close="() => refDataTable.update({})" />

      <SSDataTable
        ref="refDataTable"
        :options="options"
        :columns="columns"
        :globalFilter="globalFilter"
        :storageKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
        :onUpdate="Request.findAll"
        :onDelete="Request.removeOne"
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
