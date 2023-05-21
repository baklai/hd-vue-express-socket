<script setup lang="jsx">
import { ref } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { dateTimeToStr, eventToStr } from '@/service/DataFilters';
import { useScope } from '@/stores/appscope';
import { useLogger } from '@/stores/api/logger';
import { useUser } from '@/stores/api/user';

import SSDataTable from '@/components/tables/SSDataTable.vue';
import OptionsMenu from '@/components/menus/OptionsMenu.vue';
import ModalRecord from '@/components/modals/IPAddress.vue';
import SidebarRecord from '@/components/sidebar/IPAddress.vue';

const { t } = useI18n();
const toast = useToast();
const confirm = useConfirm();

const Logger = useLogger();
const Scope = useScope();
const User = useUser();

const refMenu = ref();
const refModal = ref();
const refSidebar = ref();
const refDataTable = ref();

const columns = ref([
  {
    header: { text: t('Address'), icon: null, width: '12rem' },
    column: {
      field: 'address',
      render(value) {
        return <Tag class="text-base font-normal text-color surface-hover px-4" value={value} />;
      },
      action: null
    },
    sorter: { field: 'address' },
    filter: { field: 'address', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('User'), icon: null, width: '12rem' },
    column: {
      field: 'user',
      render(value) {
        return <Tag class="text-base font-normal text-color surface-hover px-4" value={value} />;
      },
      action: null
    },
    sorter: { field: 'user' },
    filter: {
      field: 'user',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'id',
        value: 'login',
        label: 'login',
        async onRecords(params) {
          const items = await User.find({});
          return [{ id: 'anonymous', login: 'anonymous' }, ...items];
        }
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: true
  },

  {
    header: { text: t('Event'), icon: null, width: '16rem' },
    column: {
      field: 'event',
      render(value) {
        return (
          <Tag
            class="text-base font-normal text-color border-1 border-solid surface-border border-round-xs px-2"
            style={{ background: 'transparent' }}
            value={eventToStr(value)}
          />
        );
      },
      action: null
    },
    sorter: { field: 'event' },
    filter: {
      field: 'event',
      value: null,
      matchMode: FilterMatchMode.IN,
      options: {
        key: 'scope',
        value: 'scope',
        label: 'comment',
        async onRecords(params) {
          return Scope.scopesAPI;
        }
      }
    },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('Date'), icon: null, width: '12rem' },
    column: {
      field: 'datetime',
      render(value) {
        return <span>{dateTimeToStr(value)}</span>;
      },
      action: null
    },
    sorter: { field: 'datetime' },
    filter: { field: 'datetime', value: null, matchMode: FilterMatchMode.DATE_IS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  },

  {
    header: { text: t('User agent'), icon: null, width: '30rem' },
    column: {
      field: 'agent',
      render(value) {
        return <span>{value}</span>;
      },
      action: null
    },
    sorter: { field: 'agent' },
    filter: { field: 'agent', value: null, matchMode: FilterMatchMode.CONTAINS, options: null },
    selectable: true,
    exportable: true,
    filtrable: true,
    sortable: true,
    frozen: false
  }
]);

const confirmDeleteAll = () => {
  confirm.require({
    message: t('Do you want to delete all records?'),
    header: t('HD Confirm delete records'),
    icon: 'pi pi-info-circle text-yellow-500',
    acceptIcon: 'pi pi-check',
    acceptClass: 'p-button-danger',
    rejectIcon: 'pi pi-times',
    accept: async () => {
      await Logger.removeAll({});
      await refDataTable.value.update();
      toast.add({
        severity: 'success',
        summary: t('HD Information'),
        detail: t('All records deleted'),
        life: 3000
      });
    },
    reject: () => {
      toast.add({
        severity: 'info',
        summary: t('HD Information'),
        detail: t('Records deletion not confirmed'),
        life: 3000
      });
    }
  });
};
</script>

<template>
  <div class="col-12">
    <div class="card flex h-full">
      <OptionsMenu
        ref="refMenu"
        @view="(data) => refSidebar.toggle(data)"
        @create="(data) => refModal.toggle(data)"
        @update="(data) => refModal.toggle(data)"
        @delete="(data) => refDataTable.delete(data)"
      />

      <ModalRecord ref="refModal" @close="() => refDataTable.update()" />

      <SSDataTable
        ref="refDataTable"
        :columns="columns"
        :globalFilter="null"
        :storageKey="`app-${$route.name}-datatable`"
        :exportFileName="$route.name"
        :onUpdate="Logger.findAll"
        :onDelete="Logger.removeOne"
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
          <Button
            text
            plain
            rounded
            icon="pi pi-trash"
            iconClass="text-2xl"
            class="p-button-lg hover:text-color h-3rem w-3rem"
            v-tooltip.bottom="$t('Delete records')"
            @click="confirmDeleteAll"
          />
        </template>
      </SSDataTable>

      <SidebarRecord ref="refSidebar" @toggle-menu="(event, data) => refMenu.toggle(event, data)" />
    </div>
  </div>
</template>
