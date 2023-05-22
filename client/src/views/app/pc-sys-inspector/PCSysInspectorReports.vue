<script setup lang="jsx">
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

import { dateTimeToStr, byteToStr } from '@/service/DataFilters';
import { useInspector } from '@/stores/api/inspector';
import { useTool } from '@/stores/api/tool';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/SysInspector.vue';
import SidebarRecord from '@/components/sidebar/SysInspector.vue';

const { t } = useI18n();
const toast = useToast();

const Inspector = useInspector();
const Tool = useTool();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refDataTable = ref();

const options = ref({});

const globalFilter = ref({
  field: 'host',
  placeholder: 'Search IP Address'
});

const columns = ref([
  {
    header: { text: t('PC Name'), icon: null, width: '16rem' },
    column: {
      field: 'system.csname',
      render(value) {
        return (
          <div class="font-medium cursor-pointer">
            <i class="pi pi-desktop mr-2"></i>
            <span>{value}</span>
          </div>
        );
      },
      action(value) {
        refSidebar.value.toggle(value);
      }
    },
    sorter: { field: 'system.csname' },
    filter: {
      field: 'system.csname',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      options: null
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('IP Address'), icon: null, width: '15rem' },
    column: {
      field: 'host',
      render(value) {
        return <span class="font-medium text-primary cursor-pointer">{value}</span>;
      },
      action(value) {
        refModal.value.toggle(value);
      }
    },
    sorter: { field: 'host' },
    filter: { field: 'host', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Users'), icon: null, width: '13rem' },
    column: {
      field: 'total.useraccount',
      render(value) {
        return <Tag class="text-base text-color font-medium surface-hover w-5" value={value} />;
      },
      action: null
    },
    sorter: { field: 'total.useraccount' },
    filter: {
      field: 'total.useraccount',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      options: null
    },
    selectable: true,
    exportable: false,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Products'), icon: null, width: '13rem' },
    column: {
      field: 'total.product',
      render(value) {
        return <Tag class="text-base text-color font-medium surface-hover w-5" value={value} />;
      },
      action: null
    },
    sorter: { field: 'total.product' },
    filter: {
      field: 'total.product',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      options: null
    },
    selectable: true,
    exportable: false,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('SMB Share'), icon: null, width: '13rem' },
    column: {
      field: 'total.share',
      render(value) {
        return <Tag class="text-base text-color font-medium surface-hover w-5" value={value} />;
      },
      action: null
    },
    sorter: { field: 'total.share' },
    filter: {
      field: 'total.share',
      value: null,
      matchMode: FilterMatchMode.CONTAINS,
      options: null
    },
    selectable: true,
    exportable: false,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: { text: t('Report date'), icon: null, width: '15rem' },
    column: {
      field: 'updatedAt',
      render(value) {
        return <span>{dateTimeToStr(value) || '-'}</span>;
      },
      action: null
    },
    sorter: { field: 'updatedAt' },
    filter: { field: 'updatedAt', value: null, matchMode: FilterMatchMode.DATE_IS, options: null },
    selectable: true,
    exportable: true,
    filtrable: false,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('OS Name'), icon: null, width: '20rem' },
    column: {
      field: 'system.osname',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'system.osname' },
    filter: {
      field: 'system.osname',
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
    header: { text: t('OS Platform'), icon: null, width: '15rem' },
    column: {
      field: 'system.platform',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'system.platform' },
    filter: {
      field: 'system.platform',
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
    header: { text: t('OS Version'), icon: null, width: '12rem' },
    column: {
      field: 'system.version',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'system.version' },
    filter: {
      field: 'system.version',
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
    header: { text: t('CPU'), icon: null, width: '25rem' },
    column: {
      field: 'cpu',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'cpu' },
    filter: { field: 'cpu', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('RAM'), icon: null, width: '15rem' },
    column: {
      field: 'ram',
      render(value) {
        return <span>{byteToStr(value)}</span>;
      },
      action: null
    },
    sorter: { field: 'ram' },
    filter: { field: 'ram', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('HDD'), icon: null, width: '12rem' },
    column: {
      field: 'hdd',
      render(value) {
        return <span>{byteToStr(value)}</span>;
      },
      action: null
    },
    sorter: { field: 'hdd' },
    filter: { field: 'hdd', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  }
]);

const createSysInspectorScript = async ({}) => {
  try {
    const file = await Tool.getScriptInspector({});
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'inspector.vbs');
    toast.add({
      severity: 'info',
      summary: t('HD Information'),
      detail: t('SysInspector script file created'),
      life: 3000
    });
    link.click();
  } catch (err) {
    toast.add({
      severity: 'warn',
      summary: t('HD Warning'),
      detail: t('SysInspector script file not created')
    });
  }
};
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <OptionsMenu
        ref="refMenu"
        hostkey="host"
        @view="(data) => refModal.toggle(data)"
        @create="async (data) => await createSysInspectorScript(data)"
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
        :onUpdate="Inspector.findAll"
        :onDelete="Inspector.removeOne"
        @toggle-menu="(event, data) => refMenu.toggle(event, data)"
        @toggle-modal="async (data) => await createSysInspectorScript(data)"
        @toggle-sidebar="(data) => refSidebar.toggle(data)"
      >
        <template #icon>
          <i class="my-auto mr-2 hidden sm:block">
            <AppIcons :name="$route?.name" :size="42" />
          </i>
        </template>

        <template #title>
          {{ $t($route?.meta?.title) }}
        </template>

        <template #subtitle>
          {{ $t($route?.meta?.description) }}
        </template>
      </SSDataTable>

      <SidebarRecord ref="refSidebar" @toggle-menu="(event, data) => refMenu.toggle(event, data)" />
    </div>
  </div>
</template>
