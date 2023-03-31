<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useUser } from '@/stores/restfullapi';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import HostToolsMenu from '@/components/menus/HostToolsMenu.vue';
import ModalIPAddress from '@/components/modals/IPAddress.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarIPAddress from '@/components/sidebar/IPAddress.vue';

const { t } = useI18n();
const toast = useToast();

const userAPI = useUser();

const refMenu = ref();
const refModal = ref();
const refConfirm = ref();
const refSidebar = ref();

const columns = ref([
  {
    header: t('Login'),
    headerIcon: 'pi pi-check',
    field: 'location.title',
    fieldIcon: 'pi pi-check',
    sortField: 'location.title',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'location',
    showFilterMatchModes: false,
    filterOptions: locations,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: true
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
    await userAPI.removeOne(data);
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
      <HostToolsMenu
        ref="refMenu"
        isHost
        hostField="ipaddress"
        @view="(data) => refSidebar.toggle(data)"
        @create="(data) => refModal.toggle(data)"
        @edit="(data) => refModal.toggle(data)"
        @delete="(data) => refConfirm.toggle(data)"
      />

      <ModalIPAddress
        ref="refModal"
        :companies="companies"
        :branches="branches"
        :departments="departments"
        :enterprises="enterprises"
        :positions="positions"
        :locations="locations"
        :units="units"
      />

      <ModalConfirmDelete ref="refConfirm" @delete="deleteRecord" />

      <SSDataTable
        tables
        :columns="columns"
        :store="userAPI"
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

      <SidebarIPAddress ref="refSidebar" @toggle-menu="toggleMenu" />
    </div>
  </div>
</template>
