<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useUser } from '@/stores/restfullapi';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/User.vue';
import ModalConfirmDelete from '@/components/modals/ConfirmDelete.vue';
import SidebarRecord from '@/components/sidebar/IPAddress.vue';

const { t } = useI18n();
const toast = useToast();

const userAPI = useUser();

const refMenu = ref();
const refModal = ref();
const refConfirm = ref();
const refSidebar = ref();

const columns = ref([
  {
    header: t('Name'),
    field: 'name',
    fieldIcon: 'pi pi-user',
    sortField: 'name',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'name',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: true
  },
  {
    header: t('Login'),
    field: 'login',
    fieldIcon: 'pi pi-user',
    sortField: 'login',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'login',
    showFilterMatchModes: false,
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: true
  },
  {
    header: t('E-mail'),
    field: 'email',
    sortField: 'email',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'email',
    showFilterMatchModes: false,
    width: '180px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: true
  },
  {
    header: t('Phone'),
    field: 'phone',
    sortField: 'phone',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'phone',
    showFilterMatchModes: false,
    width: '200px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: true
  },
  {
    header: t('Active'),
    field: 'isActive',
    sortField: 'isActive',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'isActive',
    showFilterMatchModes: false,
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: true
  },
  {
    header: t('Admin'),
    field: 'isAdmin',
    sortField: 'isAdmin',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'isAdmin',
    showFilterMatchModes: false,
    width: '150px',
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: false,
    frozen: true
  },
  {
    header: t('Scope'),
    field: 'scope',
    sortField: 'scope',
    filter: { value: null, matchMode: FilterMatchMode.IN },
    filterField: 'scope',
    showFilterMatchModes: false,
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
      <OptionsMenu
        ref="refMenu"
        :isHost="false"
        @view="(data) => refSidebar.toggle(data)"
        @create="(data) => refModal.toggle(data)"
        @edit="(data) => refModal.toggle(data)"
        @delete="(data) => refConfirm.toggle(data)"
      />

      <ModalRecord ref="refModal" />

      <ModalConfirmDelete ref="refConfirm" @delete="deleteRecord" />

      <SSDataTable
        :tables="false"
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

      <SidebarRecord ref="refSidebar" @toggle-menu="toggleMenu" />
    </div>
  </div>
</template>
