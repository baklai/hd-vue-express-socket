<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useInspector } from '@/stores/restfullapi';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionMenu from '@/components/menus/HostToolsMenu.vue';
import ModalRecord from '@/components/modals/SysInspector.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/SysInspector.vue';

const { t } = useI18n();
const toast = useToast();

const inspectorAPI = useInspector();

const refMenu = ref();
const refModal = ref();
const refConfirm = ref();
const refSidebar = ref();

const columns = ref([
  {
    header: t('PC Name'),
    field: 'system.csname',
    fieldIcon: 'pi pi-desktop',
    sortField: 'system.csname',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'system.csname',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('IP Address'),
    field: 'host',
    sortField: 'host',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'host',
    showFilterMatchModes: false,
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Users'),
    field: 'warnings.useraccount',
    sortField: 'warnings.useraccount',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'warnings.useraccount',
    showFilterMatchModes: false,
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Products'),
    field: 'warnings.product',
    sortField: 'warnings.product',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'warnings.product',
    showFilterMatchModes: false,
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('SMB Share'),
    field: 'warnings.share',
    sortField: 'warnings.share',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'warnings.share',
    showFilterMatchModes: false,
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('Report date'),
    field: 'updated',
    sortField: 'updated',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'updated',
    showFilterMatchModes: false,
    type: 'datetime',
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('OS Name'),
    field: 'system.osname',
    sortField: 'system.osname',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'system.osname',
    showFilterMatchModes: false,
    width: '250px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('OS Platform'),
    field: 'system.platform',
    sortField: 'system.platform',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'system.platform',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('OS Version'),
    field: 'system.version',
    sortField: 'system.version',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'system.version',
    showFilterMatchModes: false,
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('CPU'),
    field: 'cpu',
    sortField: 'cpu',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'cpu',
    showFilterMatchModes: false,
    width: '300px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('RAM'),
    field: 'ram',
    sortField: 'ram',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'ram',
    showFilterMatchModes: false,
    type: 'byte',
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  },

  {
    header: t('HDD'),
    field: 'hdd',
    sortField: 'hdd',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'hdd',
    showFilterMatchModes: false,
    type: 'byte',
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: false
  }
]);

function toggleMenu(event, data) {
  refMenu.value.toggle(event, data);
}

function toggleModal(data) {
  refModal.value.toggle(data);
}

function toggleSidebar(data) {
  refSidebar.value.toggle(data);
}

async function deleteRecord(data) {
  try {
    await inspectorAPI.removeOne(data);
    toast.add({
      severity: 'success',
      summary: t('HD Information'),
      detail: t('Record deletion completed successfully'),
      life: 3000
    });
  } catch (err) {
    toast.add({
      severity: 'error',
      summary: t('HD Error'),
      detail: t('Record deletion failed'),
      life: 3000
    });
  }
}

onMounted(async () => {});
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <OptionMenu
        ref="refMenu"
        isHost
        hostField="host"
        @view="(data) => refSidebar.toggle(data)"
        @create="(data) => refModal.toggle(data)"
        @edit="(data) => refModal.toggle(data)"
        @delete="(data) => refConfirm.toggle(data)"
      />

      <ModalRecord ref="refModal" />

      <ModalConfirmDelete ref="refConfirm" @delete="deleteRecord" />

      <SSDataTable
        tables
        :columns="columns"
        :store="inspectorAPI"
        :stateKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
        @toggle-menu="toggleMenu"
        @toggle-modal="toggleModal"
        @toggle-sidebar="toggleSidebar"
      >
        <template #icon>
          <i class="my-auto mr-2 hidden sm:block">
            <AppIcons :name="$route?.meta?.icon" :size="42" />
          </i>
        </template>
        <template #title>
          {{ $t($route?.meta?.title) }}
        </template>
        <template #subtitle>
          {{ $t($route?.meta?.description) }}
        </template>
      </SSDataTable>

      <SidebarRecord ref="refSidebar" @toggle-menu="toggleMenu" />
    </div>
  </div>
</template>
