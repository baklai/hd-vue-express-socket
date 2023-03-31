<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useChannel } from '@/stores/restfullapi';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import HostToolsMenu from '@/components/menus/HostToolsMenu.vue';
import ModalChannel from '@/components/modals/Channel.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarChannel from '@/components/sidebar/Channel.vue';

const { t } = useI18n();
const toast = useToast();

const channelAPI = useChannel();

const refMenu = ref();
const refModal = ref();
const refConfirm = ref();
const refSidebar = ref();

const columns = ref([
  {
    header: t('Location From'),
    field: 'locationFrom',
    sortField: 'locationFrom',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'locationFrom',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: t('Unit From'),
    field: 'unitFrom',
    sortField: 'unitFrom',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'unitFrom',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: t('Location To'),
    field: 'locationTo',
    sortField: 'locationTo',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'locationTo',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },
  {
    header: t('Unit To'),
    field: 'unitTo',
    sortField: 'unitTo',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'unitTo',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: t('Level'),
    field: 'level',
    sortField: 'level',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'level',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Type'),
    field: 'type',
    sortField: 'type',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'type',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Speed'),
    field: 'speed',
    sortField: 'speed',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'speed',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Status'),
    field: 'status',
    sortField: 'status',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'status',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Operator'),
    field: 'operator',
    sortField: 'operator',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'operator',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: t('Composition'),
    field: 'composition',
    sortField: 'composition',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'composition',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
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
    await channelAPI.removeOne(data);
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

onMounted(async () => {
  companies.value = await companyAPI.findAll({});
  branches.value = await branchAPI.findAll({});
  departments.value = await departmentAPI.findAll({});
  enterprises.value = await enterpriseAPI.findAll({});
  positions.value = await positionAPI.findAll({});
  locations.value = await locationAPI.findAll({});
  units.value = await unitAPI.findAll({});
});
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <HostToolsMenu
        ref="refMenu"
        :isHost="false"
        @view="(data) => refSidebar.toggle(data)"
        @create="(data) => refModal.toggle(data)"
        @edit="(data) => refModal.toggle(data)"
        @delete="(data) => refConfirm.toggle(data)"
      />

      <ModalChannel ref="refModal" />

      <ModalConfirmDelete ref="refConfirm" @delete="deleteRecord" />

      <SSDataTable
        :tables="false"
        :columns="columns"
        :store="channelAPI"
        :stateKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
        @toggle-menu="toggleMenu"
        @toggle-modal="toggleModal"
        @toggle-sidebar="toggleSidebar"
      >
        <template #icon>
          <i class="mr-2 hidden sm:block">
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

      <SidebarChannel ref="refSidebar" @toggle-menu="toggleMenu" />
    </div>
  </div>
</template>
