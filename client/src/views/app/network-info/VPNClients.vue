<script setup lang="jsx">
import { ref, computed, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';

import { dateToStr } from '@/service/DataFilters';
import { useVPNAddress } from '@/stores/api/vpn';
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
import ModalRecord from '@/components/modals/VPNClient.vue';
import SidebarRecord from '@/components/sidebar/VPNClient.vue';

const { t } = useI18n();

const VPNAddress = useVPNAddress();
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

const globalFilter = computed(() => {
  return {
    field: 'vpn',
    placeholder: 'Search VPN Address'
  };
});

const columns = ref([
  {
    header: { text: 'VPN Address', icon: null, width: '15rem' },
    column: {
      field: 'vpn',
      render(value) {
        return (
          <Tag
            class="text-base font-normal text-primary cursor-pointer surface-hover w-10"
            value={value}
          />
        );
      },
      action(data) {
        refSidebar.value.toggle(data);
      }
    },
    sorter: { field: 'vpn' },
    filter: { field: 'vpn', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: 'User login', icon: null, width: '16rem' },
    column: {
      field: 'login',
      render(value) {
        return <Tag class="text-base font-normal text-color surface-hover px-4" value={value} />;
      },
      action: null
    },
    sorter: { field: 'login' },
    filter: { field: 'login', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: 'IP Address', icon: null, width: '15rem' },
    column: {
      field: 'ipaddress',
      render(value) {
        return <span class="font-medium text-primary cursor-pointer">{value}</span>;
      },
      action: null
    },
    sorter: { field: 'ipaddress' },
    filter: { field: 'ipaddress', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: 'Service', icon: null, width: '20rem' },
    column: {
      field: 'service',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'service' },
    filter: { field: 'service', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: 'Location', icon: null, width: '16rem' },
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
    header: { text: 'Unit', icon: null, width: '16rem' },
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
    header: { text: 'Fullname', icon: null, width: '16rem' },
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
    header: { text: 'Phone', icon: null, width: '12rem' },
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
    header: { text: 'Mail', icon: null, width: '16rem' },
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
    header: { text: 'Date open', icon: null, width: '16rem' },
    column: {
      field: 'dateOpen',
      render(value) {
        return <span>{dateToStr(value) || '-'}</span>;
      },
      action: null
    },
    sorter: { field: 'dateOpen' },
    filter: { field: 'dateOpen', value: null, matchMode: FilterMatchMode.DATE_IS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: 'Date close', icon: null, width: '16rem' },
    column: {
      field: 'dateClose',
      render(value) {
        return <span>{dateToStr(value) || '-'}</span>;
      },
      action: null
    },
    sorter: { field: 'dateClose' },
    filter: { field: 'dateClose', value: null, matchMode: FilterMatchMode.DATE_IS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
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
      unit: await Unit.findAll({})
    };
  } catch (err) {
    console.error(err);
    toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t(err.message), life: 3000 });
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

      <ModalRecord ref="refModal" @close="() => refDataTable.update({})" />

      <SSDataTable
        ref="refDataTable"
        :options="options"
        :columns="columns"
        :globalFilter="globalFilter"
        :storageKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
        :onUpdate="VPNAddress.findAll"
        :onDelete="VPNAddress.removeOne"
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
