<script setup lang="jsx">
import { ref } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

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

const globalFilter = ref({
  field: 'vpn',
  matchMode: FilterMatchMode.STARTS_WITH,
  placeholder: 'Search VPN Address'
});

const columns = ref([
  {
    header: { text: 'VPN Address', width: '15rem' },
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
    filter: {
      field: 'vpn',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      filterOperator: FilterOperator.AND,
      showFilterMatchModes: true
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: 'User login', width: '16rem' },
    column: {
      field: 'login',
      render(value) {
        return <Tag class="text-base font-normal text-color surface-hover px-4" value={value} />;
      }
    },
    sorter: { field: 'login' },
    filter: {
      field: 'login',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      filterOperator: FilterOperator.AND,
      showFilterMatchModes: true
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: 'IP Address', width: '15rem' },
    column: {
      field: 'ipaddress',
      render(value) {
        return <span class="font-medium text-primary cursor-pointer">{value}</span>;
      }
    },
    sorter: { field: 'ipaddress' },
    filter: {
      field: 'ipaddress',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      filterOperator: FilterOperator.AND,
      showFilterMatchModes: true
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: 'Service', width: '20rem' },
    column: {
      field: 'service',
      render(value) {
        return <span>{value}</span>;
      }
    },
    sorter: { field: 'service' },
    filter: {
      field: 'service',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      filterOperator: FilterOperator.AND,
      showFilterMatchModes: true
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: 'Location', width: '16rem' },
    column: {
      field: 'location.title',
      render(value) {
        return <span>{value}</span>;
      }
    },
    sorter: { field: 'location.title' },
    filter: {
      field: 'location',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title',
        onRecords: async () => {
          return await Location.findAll({});
        }
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: 'Unit', width: '16rem' },
    column: {
      field: 'unit.title',
      render(value) {
        return <span>{value}</span>;
      }
    },
    sorter: { field: 'unit.title' },
    filter: {
      field: 'unit',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title',
        onRecords: async () => {
          return await Unit.findAll({});
        }
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: 'Company', width: '16rem' },
    column: {
      field: 'company.title',
      render(value) {
        return <span>{value}</span>;
      }
    },
    sorter: { field: 'company.title' },
    filter: {
      field: 'company',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title',
        onRecords: async () => {
          return await Сompany.findAll({});
        }
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: 'Branch', width: '16rem' },
    column: {
      field: 'branch.title',
      render(value) {
        return <span>{value}</span>;
      }
    },
    sorter: { field: 'branch.title' },
    filter: {
      field: 'branch',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title',
        onRecords: async () => {
          return await Branch.findAll({});
        }
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: 'Enterprise', width: '16rem' },
    column: {
      field: 'enterprise.title',
      render(value) {
        return <span>{value}</span>;
      }
    },
    sorter: { field: 'enterprise.title' },
    filter: {
      field: 'enterprise',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title',
        onRecords: async () => {
          return await Enterprise.findAll({});
        }
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: 'Department', width: '16rem' },
    column: {
      field: 'department.title',
      render(value) {
        return <span>{value}</span>;
      }
    },
    sorter: { field: 'department.title' },
    filter: {
      field: 'department',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title',
        onRecords: async () => {
          return await Department.findAll({});
        }
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: 'Position', width: '16rem' },
    column: {
      field: 'position.title',
      render(value) {
        return <span>{value}</span>;
      }
    },
    sorter: { field: 'position.title' },
    filter: {
      field: 'position',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'id',
        label: 'title',
        onRecords: async () => {
          return await Position.findAll({});
        }
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: 'Fullname', width: '16rem' },
    column: {
      field: 'fullname',
      render(value) {
        return <span>{value}</span>;
      }
    },
    sorter: { field: 'fullname' },
    filter: {
      field: 'fullname',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      filterOperator: FilterOperator.AND,
      showFilterMatchModes: true
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: 'Phone', width: '12rem' },
    column: {
      field: 'phone',
      render(value) {
        return <span>{value}</span>;
      }
    },
    sorter: { field: 'phone' },
    filter: {
      field: 'phone',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      filterOperator: FilterOperator.AND,
      showFilterMatchModes: true
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: 'Mail', width: '16rem' },
    column: {
      field: 'mail',
      render(value) {
        return <span>{value}</span>;
      }
    },
    sorter: { field: 'mail' },
    filter: {
      field: 'mail',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      filterOperator: FilterOperator.AND,
      showFilterMatchModes: true
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: 'Date open', width: '16rem' },
    column: {
      field: 'dateOpen',
      render(value) {
        return <span>{dateToStr(value) || '-'}</span>;
      }
    },
    sorter: { field: 'dateOpen' },
    filter: {
      field: 'dateOpen',
      value: null,
      matchMode: FilterMatchMode.DATE_IS
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: 'Date close', width: '16rem' },
    column: {
      field: 'dateClose',
      render(value) {
        return <span>{dateToStr(value) || '-'}</span>;
      }
    },
    sorter: { field: 'dateClose' },
    filter: {
      field: 'dateClose',
      value: null,
      matchMode: FilterMatchMode.DATE_IS
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: 'Comment', width: '25rem' },
    column: {
      field: 'comment',
      render(value) {
        return <span>{value}</span>;
      }
    },
    selectable: true,
    exportable: false,
    filtrable: false,
    sortable: false,
    frozen: false
  }
]);
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
