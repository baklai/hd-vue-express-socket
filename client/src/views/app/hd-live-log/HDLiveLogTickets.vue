<script setup>
import { ref, computed, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';

import { useTicket } from '@/stores/api/ticket';
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
import ModalRecord from '@/components/modals/Ticket.vue';
import ConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/Ticket.vue';

const { t } = useI18n();

const ticketAPI = useTicket();
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
const refConfirm = ref();
const refDataTable = ref();

const columns = computed(() => [
  {
    header: { text: t('Opened an request'), icon: null, width: '16rem' },
    column: { field: 'workerOpen.name', icon: null, type: 'text', class: null, action: null },
    sorter: { field: 'workerOpen.name', default: 1 },
    filter: {
      field: 'workerOpen',
      options: { records: User.records, key: 'id', value: 'id', label: 'name' },
      matchMode: FilterMatchMode.IN,
      value: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: true
  },

  {
    header: { text: t('Date opened'), icon: null, width: '15rem' },
    column: {
      field: 'created',
      icon: null,
      type: 'date',
      class: null,
      action: null
    },
    sorter: { field: 'created', default: 1 },
    filter: { field: 'created', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Status'), icon: null, width: '12rem' },
    column: {
      field: 'status',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'status', default: 1 },
    filter: { field: 'status', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: false,
    filtrable: true,
    sortable: false,
    frozen: true
  },

  {
    header: { text: t('Request'), icon: null, width: '25rem' },
    column: {
      field: 'request',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'request', default: 1 },
    filter: { field: 'request', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Location'), icon: null, width: '15rem' },
    column: { field: 'location.title', icon: null, type: 'text', class: null, action: null },
    sorter: { field: 'location.title', default: 1 },
    filter: {
      field: 'location',
      options: { records: Location.records, key: 'id', value: 'id', label: 'title' },
      matchMode: FilterMatchMode.IN,
      value: null
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
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'fullname', default: 1 },
    filter: { field: 'fullname', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Phone'), icon: null, width: '15rem' },
    column: {
      field: 'phone',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'phone', default: 1 },
    filter: { field: 'phone', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Position'), icon: null, width: '16rem' },
    column: { field: 'position.title', icon: null, type: 'text', class: null, action: null },
    sorter: { field: 'position.title', default: 1 },
    filter: {
      field: 'position',
      options: { records: Position.records, key: 'id', value: 'id', label: 'title' },
      matchMode: FilterMatchMode.IN,
      value: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('IP Address'), icon: null, width: '16rem' },
    column: {
      field: 'ipaddress',
      icon: null,
      type: 'text',
      class: 'font-medium text-primary cursor-pointer',
      action(data) {
        refSidebar.value.toggle(data);
      }
    },
    sorter: { field: 'ipaddress', default: 1 },
    filter: { field: 'ipaddress', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
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
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    sorter: { field: 'mail', default: 1 },
    filter: { field: 'mail', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Company'), icon: null, width: '16rem' },
    column: { field: 'company.title', icon: null, type: 'text', class: null, action: null },
    sorter: { field: 'company.title', default: 1 },
    filter: {
      field: 'company',
      options: { records: Сompany.records, key: 'id', value: 'id', label: 'title' },
      matchMode: FilterMatchMode.IN,
      value: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Branch'), icon: null, width: '16rem' },
    column: { field: 'branch.title', icon: null, type: 'text', class: null, action: null },
    sorter: { field: 'branch.title', default: 1 },
    filter: {
      field: 'branch',
      options: { records: Branch.records, key: 'id', value: 'id', label: 'title' },
      matchMode: FilterMatchMode.IN,
      value: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Enterprise'), icon: null, width: '16rem' },
    column: { field: 'enterprise.title', icon: null, type: 'text', class: null, action: null },
    sorter: { field: 'enterprise.title', default: 1 },
    filter: {
      field: 'enterprise',
      options: { records: Enterprise.records, key: 'id', value: 'id', label: 'title' },
      matchMode: FilterMatchMode.IN,
      value: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Department'), icon: null, width: '16rem' },
    column: { field: 'department.title', icon: null, type: 'text', class: null, action: null },
    sorter: { field: 'department.title', default: 1 },
    filter: {
      field: 'department',
      options: { records: Department.records, key: 'id', value: 'id', label: 'title' },
      matchMode: FilterMatchMode.IN,
      value: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Date closed'), icon: null, width: '15rem' },
    column: {
      field: 'closed',
      icon: null,
      type: 'date',
      class: null,
      action: null
    },
    sorter: { field: 'closed', default: 1 },
    filter: { field: 'closed', options: null, matchMode: FilterMatchMode.CONTAINS, value: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Closed an request'), icon: null, width: '16rem' },
    column: { field: 'workerClose.name', icon: null, type: 'text', class: null, action: null },
    sorter: { field: 'workerClose.name', default: 1 },
    filter: {
      field: 'workerClose',
      options: { records: User.records, key: 'id', value: 'id', label: 'name' },
      matchMode: FilterMatchMode.IN,
      value: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Conclusion for request'), icon: null, width: '25rem' },
    column: {
      field: 'conclusion',
      icon: null,
      type: 'text',
      class: null,
      action: null
    },
    selectable: true,
    exportable: true,
    filtrable: false,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Comment'), icon: null, width: '25rem' },
    column: {
      field: 'comment',
      icon: null,
      type: 'text',
      class: null,
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
  await Promise.allSettled([
    Сompany.findAll({}),
    Branch.findAll({}),
    Department.findAll({}),
    Enterprise.findAll({}),
    Position.findAll({}),
    Location.findAll({}),
    User.findAll({})
  ]);
});
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <OptionsMenu
        ref="refMenu"
        option-key="ipaddress"
        @view="(data) => refSidebar.toggle(data)"
        @create="(data) => refModal.toggle(data)"
        @update="(data) => refModal.toggle(data)"
        @delete="(data) => refConfirm.toggle(data)"
      />

      <ModalRecord ref="refModal" @close="() => refDataTable.update()" />

      <ConfirmDelete ref="refConfirm" @close="(data) => refConfirm.toggle(data)" />

      <SSDataTable
        ref="refDataTable"
        :columns="columns"
        :records="ticketAPI.records"
        :onUpdate="ticketAPI.findAll"
        :storageKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
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

        <template #dbbutton>
          <BtnDBTables />
        </template>
      </SSDataTable>

      <SidebarRecord ref="refSidebar" @toggle-menu="(event, data) => refMenu.toggle(event, data)" />
    </div>
  </div>
</template>
