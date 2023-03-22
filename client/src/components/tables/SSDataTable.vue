<script setup>
import { ref, computed, onMounted } from 'vue';

import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { dateToStr } from '@/service/DataFilters';
import { getObjField } from '@/service/ObjectMethods';
import { sortConverter } from '@/service/SortConverter';

import HostToolsMenu from '@/components/menus/HostToolsMenu.vue';
import BtnDBTables from '@/components/buttons/BtnDBTables.vue';

const props = defineProps({
  api: {
    type: Object,
    required: true
  },
  columns: {
    type: Array,
    default: []
  },
  tables: {
    type: Boolean,
    default: false
  }
});

const { t } = useI18n();
const toast = useToast();

const params = ref({});
const loading = ref(false);

const record = ref(null);
const records = ref([]);
const totalRecords = ref();
const offsetRecords = ref(0);
const recordsPerPage = ref(15);
const recordsPerPageOptions = ref([5, 10, 15, 25, 50]);

const selectedColumns = ref(props.columns.filter((column) => column.selectable));

// const filters = ref({ ...props.columns.map((item) => item.filter) });

const filters = ref({
  // global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  location: { value: null, matchMode: FilterMatchMode.IN },
  unit: { value: null, matchMode: FilterMatchMode.IN },
  // ipaddress: { value: null, matchMode: FilterMatchMode.IN },
  company: { value: null, matchMode: FilterMatchMode.IN },
  branch: { value: null, matchMode: FilterMatchMode.IN },
  enterprise: { value: null, matchMode: FilterMatchMode.IN },
  department: { value: null, matchMode: FilterMatchMode.IN },
  fullname: { value: null, matchMode: FilterMatchMode.IN },
  position: { value: null, matchMode: FilterMatchMode.IN },
  phone: { value: null, matchMode: FilterMatchMode.IN },
  autoanswer: { value: null, matchMode: FilterMatchMode.IN },
  mail: { value: null, matchMode: FilterMatchMode.IN },
  date: { value: null, matchMode: FilterMatchMode.IN },
  // internet: { value: null, matchMode: FilterMatchMode.IN },
  // email: { value: null, matchMode: FilterMatchMode.IN },
  comment: { value: null, matchMode: FilterMatchMode.IN }
});

const refMenuColumns = ref(null);

const refOptionMenu = ref();

const refSidebar = ref();

const menuRecord = ref([
  {
    label: 'View record',
    icon: 'pi pi-eye',
    command: () => toggleSidebar(record.value)
  },
  {
    label: 'Edit record',
    icon: 'pi pi-file-edit'
    // command: () => toggleSidebar(record)
  },
  {
    label: 'Delete record',
    icon: 'pi pi-times-circle'
    // command: () => toggleSidebar(record)
  }
]);

const menuActions = ref([
  {
    label: t('Clear filters'),
    icon: 'pi pi-filter-slash',
    command: () => {}
  },
  {
    label: t('Update records'),
    icon: 'pi pi-sync',
    command: () => {}
  },
  {
    label: t('Create record'),
    icon: 'pi pi-plus-circle',
    command: () => {}
  }
]);

const menuReports = ref([
  {
    label: t('Export records'),
    icon: 'pi pi-file-export',
    command: () => {}
  },
  {
    label: t('Export all records'),
    icon: 'pi pi-file-export',
    command: () => {}
  }
]);

onMounted(async () => {
  loading.value = true;
  params.value = {
    offset: offsetRecords.value,
    limit: recordsPerPage.value,
    sortField: null,
    sortOrder: null,
    filters: filters.value
  };
  await getDataRecords();
});

const onSelectedColumnsMenu = (event) => {
  refMenuColumns.value.toggle(event);
};

const onSelectedColumns = (value) => {
  selectedColumns.value = props.columns.filter((column) => value.includes(column));
};

const getDataRecords = async () => {
  try {
    loading.value = true;
    const { docs, total, offset, limit } = await props.api.findAll(params.value);
    records.value = docs;
    totalRecords.value = total;
    offsetRecords.value = Number(offset);
    recordsPerPage.value = limit;
  } catch (err) {
    records.value = [];
  } finally {
    loading.value = false;
  }
};

const toggleOptionMenu = (event, data) => {
  record.value = data;
  refOptionMenu.value.toggle(event, data.ipaddress);
};

const toggleSidebar = (data) => {
  record.value = data;
  refSidebar.value.toggle(data);
};

const onPagination = async (event) => {
  const { rows, first } = event;
  params.value.limit = rows;
  params.value.offset = first;
  await getDataRecords();
};

const onFilter = async (event) => {
  console.log(event);
  // params.value.filter = sortConverter(event.multiSortMeta);
  // await getDataRecords();
};

const onSort = async (event) => {
  console.log(event);
  params.value.sort = sortConverter(event.multiSortMeta);
  await getDataRecords();
};
</script>

<template>
  <Menu popup ref="refMenuColumns" class="p-menu-list p-reset w-18rem p-2">
    <template #start>
      <MultiSelect
        optionLabel="header"
        :options="props.columns"
        :modelValue="selectedColumns"
        :placeholder="$t('Select columns')"
        @update:modelValue="onSelectedColumns"
        class="p-multiselect-trigger"
      />
    </template>
  </Menu>

  <HostToolsMenu ref="refOptionMenu" :items="menuRecord" />

  <div class="w-full overflow-x-auto">
    <DataTable
      lazy
      rowHover
      scrollable
      removableSort
      resizableColumns
      dataKey="id"
      sortMode="multiple"
      scrollHeight="flex"
      stateStorage="local"
      filterDisplay="menu"
      responsiveLayout="scroll"
      columnResizeMode="expand"
      style="height: calc(100vh - 13rem)"
      class="p-datatable-sm overflow-x-auto"
      :currentPageReportTemplate="$t('Showing {first} to {last} of {totalRecords} records')"
      :value="records"
      :loading="loading"
      v-model:filters="filters"
      @filter="onFilter"
      @sort="onSort"
    >
      <template #header>
        <div class="flex flex-wrap gap-4 mb-2 align-items-center justify-content-between">
          <div class="flex flex-wrap gap-2 align-items-center">
            <slot name="icon" />
            <div>
              <h3 class="text-color m-0">
                <slot name="title" />
              </h3>
              <p class="text-color-secondary">
                <slot name="subtitle" />
              </p>
            </div>
          </div>
          <div
            class="flex flex-wrap gap-2 align-items-center justify-content-between sm:w-max w-full"
          >
            <!-- <span class="p-input-icon-left p-input-icon-right sm:w-max w-full">
              <i class="pi pi-search" />
               <InputText
                v-model="filters['global'].value"
                :placeholder="$t('Search in table')"
                class="sm:w-max w-full"
              />
              <i
                class="pi pi-times cursor-pointer hover:text-color"
                v-show="filters['global'].value"
              /> 
            </span> -->

            <div class="flex gap-2 sm:w-max w-full justify-content-between">
              <Button
                text
                plain
                rounded
                icon="pi pi-filter-slash"
                iconClass="text-2xl"
                class="p-button-lg hover:text-color h-3rem w-3rem"
                v-tooltip.bottom="$t('Clear filters')"
              />

              <Button
                text
                plain
                rounded
                icon="pi pi-plus-circle"
                iconClass="text-2xl"
                class="p-button-lg hover:text-color h-3rem w-3rem"
                v-tooltip.bottom="$t('Create record')"
              />

              <Button
                @click="getDataRecords"
                text
                plain
                rounded
                icon="pi pi-sync"
                iconClass="text-2xl"
                class="p-button-lg hover:text-color h-3rem w-3rem"
                v-tooltip.bottom="$t('Update records')"
              />

              <Button
                @click="onSelectedColumnsMenu"
                text
                plain
                rounded
                icon="pi pi-cog"
                iconClass="text-2xl"
                class="p-button-lg hover:text-color h-3rem w-3rem"
                v-tooltip.bottom="$t('Columns options')"
              />
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div
          class="flex flex-wrap gap-4 align-items-center justify-content-evenly xl:justify-content-between p-2"
        >
          <div class="flex flex-wrap gap-2 align-items-center justify-content-evenly">
            <SplitButton
              :label="$t('Actions')"
              icon="pi pi-sliders-h"
              :model="menuActions"
              class="p-button-outlined sm:w-max w-full"
              :buttonProps="{ class: 'text-color-secondary' }"
              :menuButtonProps="{ class: 'text-color-secondary' }"
            />

            <SplitButton
              :label="$t('Reports')"
              icon="pi pi-save"
              :model="menuReports"
              class="p-button-outlined sm:w-max w-full"
              :buttonProps="{ class: 'text-color-secondary' }"
              :menuButtonProps="{ class: 'text-color-secondary' }"
            />

            <BtnDBTables v-if="props.tables" />
          </div>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-evenly">
            <Paginator
              :pageLinkSize="1"
              :alwaysShow="true"
              :first="offsetRecords"
              :rows="recordsPerPage"
              :totalRecords="totalRecords"
              :rowsPerPageOptions="recordsPerPageOptions"
              :currentPageReportTemplate="$t('Showing {first} to {last} of {totalRecords} records')"
              :template="{
                '640px': $t('FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink'),
                '960px': $t(
                  'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink'
                ),
                '1300px': $t(
                  'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink'
                ),
                default: $t(
                  'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                )
              }"
              @page="onPagination"
            />
          </div>
        </div>
      </template>

      <template #loading>
        <i class="pi pi-spin pi-spinner text-4xl mr-4"></i>
        <span> {{ $t('Loading records data. Please wait') }}.</span>
      </template>

      <template #empty>
        <div
          v-if="!loading"
          class="flex flex-column justify-content-center p-datatable-loading-overlay p-component-overlay"
        >
          <i class="pi pi-filter-slash" style="font-size: 4rem"></i>
          <h5>{{ $t('No records found') }}</h5>
          <p>{{ $t('Try changing the search terms in the filter') }}</p>
          <Button :label="$t('Clear filters')" class="p-button-lg" />
        </div>
      </template>

      <Column frozen field="options" class="max-w-3rem">
        <template #header>
          <Button
            text
            plain
            rounded
            icon="pi pi-cog"
            class="hover:text-color"
            v-tooltip.bottom="$t('Columns options')"
            @click="onSelectedColumnsMenu"
          />
        </template>
        <template #body="{ data }">
          <Button
            text
            plain
            rounded
            icon="pi pi-ellipsis-v"
            class="hover:text-color"
            v-tooltip.bottom="$t('Optional menu')"
            @click="toggleOptionMenu($event, data)"
          />
        </template>
      </Column>

      <Column
        v-for="column of selectedColumns"
        :field="column.field"
        :sortable="column.sortable || false"
        :frozen="column.frozen || false"
        headerClass="text-center uppercase"
        :style="`min-width: ${column.width}`"
        :key="column.field"
        :filterField="column.filterField"
        :showFilterMatchModes="column.showFilterMatchModes || false"
      >
        <template #header>
          <span>{{ column.header }}</span>
        </template>

        <template #body="{ data }">
          <span v-if="!column.type">
            {{ getObjField(data, column.field) }}
          </span>
          <span v-else-if="column.type === 'date'">
            {{ dateToStr(getObjField(data, column.field)) }}
          </span>
          <span
            v-else-if="column.type === 'action'"
            class="font-bold text-primary cursor-pointer"
            @click="column.action(data)"
          >
            {{ getObjField(data, column.field) }}
          </span>
        </template>

        <template #filter="{ filterModel }">
          <MultiSelect
            filter
            display="chip"
            optionLabel="title"
            v-model="filterModel.value"
            :options="column.filterOptions || []"
            :placeholder="$t('Search by field')"
            class="w-full"
          >
            <template #option="slotProps">
              <div class="flex align-items-center">
                <span>{{ slotProps.option.title }}</span>
              </div>
            </template>

            <template #footer>
              <div class="py-2 px-3">
                <b>{{ filterModel.value ? filterModel.value.length : 0 }}</b> item{{
                  (filterModel.value ? filterModel.value.length : 0) > 1 ? 's' : ''
                }}
                selected.
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
    </DataTable>
  </div>
  <slot name="sidebar" />

  <slot name="modal" />
</template>

<style scoped>
::v-deep(.p-component-overlay) {
  background-color: transparent;
}

::v-deep(tr.p-datatable-emptymessage > td) {
  border: none !important;
}

::v-deep(tr.p-datatable-emptymessage:hover) {
  background: none !important;
}

::v-deep(.p-datatable-footer) {
  border: none;
}

::v-deep(button.p-paginator-page.p-paginator-element.p-link.p-highlight) {
  background: var(--surface-overlay);
  color: var(--text-color);
}

::v-deep(div.p-paginator-rpp-options) {
  height: auto;
}

::v-deep(div.p-paginator-rpp-options > .p-inputtext) {
  padding: 0.6rem 0.75rem;
}

::v-deep(.p-datatable .p-datatable-tbody > tr:not(.p-highlight):hover) {
  background: var(--surface-ground);
}

::v-deep(.p-datatable .p-datatable-tbody > tr:not(.p-highlight):focus) {
  background-color: var(--surface-ground);
}
</style>
