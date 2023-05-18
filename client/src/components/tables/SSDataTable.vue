<script setup>
import { ref, computed, onMounted } from 'vue';

import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { getObjField } from '@/service/ObjectMethods';
import { dateToStr, dateTimeToStr, byteToStr } from '@/service/DataFilters';

const { t } = useI18n();
const toast = useToast();

const props = defineProps({
  records: {
    type: Object,
    default: {}
  },
  columns: {
    type: Array,
    default: []
  },
  onUpdate: {
    type: Function
  },
  storageKey: {
    type: String,
    default: 'datatable-config'
  },
  exportFileName: {
    type: String,
    default: 'datatable-export'
  }
});

const emits = defineEmits(['toggleMenu', 'toggleModal', 'toggleSidebar']);

defineExpose({
  update: async () => {
    await onRecords();
  }
});

const params = ref({});
const loading = ref(false);

const refDataTable = ref();
const refMenuColumns = ref();

const records = ref([]);
const totalRecords = ref();
const offsetRecords = ref(0);
const recordsPerPage = ref(15);
const recordsPerPageOptions = ref([5, 10, 15, 20, 25, 50]);

const menuActions = ref([
  {
    label: t('Clear filters'),
    icon: 'pi pi-filter-slash',
    command: () => clearFilters()
  },
  {
    label: t('Create record'),
    icon: 'pi pi-plus-circle',
    command: () => emits('toggleModal', {})
  },
  {
    label: t('Update records'),
    icon: 'pi pi-sync',
    command: () => onRecords()
  }
]);

const menuReports = ref([
  {
    label: t('Export records'),
    icon: 'pi pi-file-export',
    command: () => exportCSV()
  },
  {
    label: t('Export all records'),
    icon: 'pi pi-file-export',
    command: () => {
      toast.add({
        severity: 'info',
        summary: t('HD Information'),
        detail: t('This functionality has not yet been implemented.'),
        life: 5000
      });
    }
  }
]);

const dataTableColumns = computed(() =>
  props.columns.map(({ header, column, sorter, filter, selectable, exportable, filtrable, sortable, frozen }) => {
    return {
      header,
      column,
      sorter,
      filter,
      selectable: selectable === undefined ? true : selectable,
      exportable: exportable === undefined ? false : exportable,
      filtrable: filtrable === undefined ? false : filtrable,
      sortable: sortable === undefined ? false : sortable,
      frozen: frozen === undefined ? false : frozen
    };
  })
);

const selectedColumns = computed(() => dataTableColumns.value.filter((column) => column.selectable));

const filters = computed(() => {
  return dataTableColumns.value
    .filter((column) => column.filtrable)
    .reduce((previousObject, currentObject) => {
      return Object.assign(previousObject, {
        [currentObject.filter.field]: {
          value: currentObject.filter.value,
          matchMode: currentObject.filter.matchMode
        }
      });
    }, {});
});

const onSelectedColumnsMenu = (event) => {
  refMenuColumns.value.toggle(event);
};

const onSelectedColumns = (value) => {
  props.columns.forEach((column) => {
    if (value.find((element) => element.field === column.field)) {
      column.selectable = true;
    } else {
      column.selectable = false;
    }
  });
};

const onOptionsMenu = (event, value) => {
  emits('toggleMenu', event, value);
};

const onRecords = async () => {
  try {
    loading.value = true;
    await props.onUpdate(params.value);
    const { docs, totalDocs, offset, limit } = props.records;
    records.value = docs;
    totalRecords.value = totalDocs;
    offsetRecords.value = Number(offset);
    recordsPerPage.value = limit;
  } catch (err) {
    records.value = [];
  } finally {
    loading.value = false;
  }
};

const exportCSV = () => {
  refDataTable.value.exportCSV();
};

const clearFilters = async () => {
  filters.value = {
    ...dataTableColumns.value
      .filter((column) => column.filtrable)
      .reduce((previousObject, currentObject) => {
        return Object.assign(previousObject, {
          [currentObject.filter.field]: {
            value: currentObject.filter.value,
            matchMode: currentObject.filter.matchMode
          }
        });
      }, {})
  };
  params.value.filters = filterConverter(filters.value);
  await onRecords();
};

const sortConverter = (value) => {
  const sortObject = {};
  value.forEach(({ field, order }) => {
    sortObject[field] = parseInt(order, 10);
  });
  return sortObject;
};

const filterConverter = (value) => {
  const filterObject = {};
  for (const prop in value) {
    if (value[prop].value) {
      switch (value[prop].matchMode) {
        case 'startsWith':
          filterObject[prop] = { $regex: `^${value[prop].value}`, $options: 'i' };
          break;
        case 'contains':
          filterObject[prop] = { $regex: value[prop].value, $options: 'i' };
          break;
        case 'notContains':
          filterObject[prop] = { $not: { $regex: value[prop].value, $options: 'i' } };
          break;
        case 'endsWith':
          filterObject[prop] = { $regex: `${value[prop].value}$`, $options: 'i' };
          break;
        case 'equals':
          filterObject[prop] = { $regex: `^${value[prop].value}$`, $options: 'i' };
          break;
        case 'notEquals':
          filterObject[prop] = { $ne: value[prop].value };
          break;
        case 'in':
          filterObject[prop] = { $in: value[prop].value };
          break;
        case 'lt':
          filterObject[prop] = { $lt: value[prop].value };
          break;
        case 'lte':
          filterObject[prop] = { $lte: value[prop].value };
          break;
        case 'gt':
          filterObject[prop] = { $gt: value[prop].value };
          break;
        case 'gte':
          filterObject[prop] = { $gte: value[prop].value };
          break;
        case 'between':
          filterObject[prop] = { $gte: value[prop].value[0], $lte: value[prop].value[1] };
          break;
        case 'dateIs':
          filterObject[prop] = value[prop].value;
          break;
        case 'dateIsNot':
          filterObject[prop] = { $ne: value[prop].value };
          break;
        case 'dateBefore':
          filterObject[prop] = { $lt: value[prop].value };
          break;
        case 'dateAfter':
          filterObject[prop] = { $gt: value[prop].value };
          break;
        default:
          console.error('Sorry, we are out of ' + value[prop].matchMode + '.');
      }
    }
  }
  return filterObject;
};

const onPage = async (event) => {
  const { rows, first } = event;
  params.value.limit = rows;
  params.value.offset = first;
  await onRecords();
};

const onFilter = async (event) => {
  params.value.filters = filterConverter(event.filters);
  await onRecords();
};

const onSort = async (event) => {
  params.value.sort = sortConverter(event.multiSortMeta);
  await onRecords();
};

onMounted(async () => {
  loading.value = true;

  params.value = {
    offset: offsetRecords.value,
    limit: recordsPerPage.value,
    sortField: null,
    sortOrder: null,
    filters: filterConverter(filters.value)
  };
  await onRecords();
});
</script>

<template>
  <Menu popup ref="refMenuColumns" class="p-menu-list p-reset w-18rem p-2">
    <template #start>
      <MultiSelect
        optionLabel="header"
        :options="dataTableColumns"
        :modelValue="selectedColumns"
        :placeholder="$t('Select columns')"
        @update:modelValue="onSelectedColumns"
        class="p-multiselect-trigger"
      />
    </template>
  </Menu>

  <!-- 
     :stateKey="storageKey"
      stateStorage="local" -->
  <div class="flex w-full overflow-x-auto">
    <DataTable
      lazy
      rowHover
      paginator
      scrollable
      removableSort
      resizableColumns
      alwaysShowPaginator
      ref="refDataTable"
      dataKey="id"
      csvSeparator=";"
      sortMode="multiple"
      scrollHeight="flex"
      filterDisplay="menu"
      responsiveLayout="scroll"
      columnResizeMode="expand"
      style="height: calc(100vh - 13rem)"
      class="p-datatable-sm min-w-full overflow-x-auto"
      :currentPageReportTemplate="$t('Showing {first} to {last} of {totalRecords} records')"
      :value="records"
      :loading="loading"
      v-model:filters="filters"
      :exportFilename="exportFileName"
      @filter="onFilter"
      @sort="onSort"
      @page="onPage"
      :pageLinkSize="1"
      :first="offsetRecords"
      :rows="recordsPerPage"
      :totalRecords="totalRecords"
      :rowsPerPageOptions="recordsPerPageOptions"
      :paginatorTemplate="{
        '640px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        '960px': 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        '1300px': 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        default: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
      }"
    >
      <template #paginatorstart>
        <div class="flex flex-wrap gap-4 align-items-center justify-content-evenly xl:justify-content-between p-2">
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
          </div>
        </div>
      </template>

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

          <div class="flex flex-wrap gap-2 align-items-center justify-content-between sm:w-max w-full">
            <span class="p-input-icon-left p-input-icon-right sm:w-max w-full">
              <i class="pi pi-search" />
              <InputText :placeholder="$t('Search in table')" class="sm:w-max w-full" />
              <i class="pi pi-times cursor-pointer hover:text-color" />
            </span>

            <div class="flex gap-2 sm:w-max w-full justify-content-between">
              <Button
                text
                plain
                rounded
                icon="pi pi-filter-slash"
                iconClass="text-2xl"
                class="p-button-lg hover:text-color h-3rem w-3rem"
                v-tooltip.bottom="$t('Clear filters')"
                @click="clearFilters"
              />

              <Button
                text
                plain
                rounded
                icon="pi pi-plus-circle"
                iconClass="text-2xl"
                class="p-button-lg hover:text-color h-3rem w-3rem"
                v-tooltip.bottom="$t('Create record')"
                @click="emits('toggleModal', {})"
              />

              <Button
                text
                plain
                rounded
                icon="pi pi-sync"
                iconClass="text-2xl"
                class="p-button-lg hover:text-color h-3rem w-3rem"
                v-tooltip.bottom="$t('Update records')"
                @click="onRecords"
              />

              <slot name="dbbutton" />

              <Button
                text
                plain
                rounded
                icon="pi pi-cog"
                iconClass="text-2xl"
                class="p-button-lg hover:text-color h-3rem w-3rem"
                v-tooltip.bottom="$t('Columns option')"
                @click="onSelectedColumnsMenu"
              />
            </div>
          </div>
        </div>
      </template>

      <template #loading>
        <i class="pi pi-spin pi-spinner text-4xl mr-4"></i>
        <span> {{ $t('Loading records data. Please wait') }}.</span>
      </template>

      <template #empty>
        <div
          v-if="!loading && records"
          class="flex flex-column justify-content-center p-datatable-loading-overlay p-component-overlay z-0"
        >
          <i class="pi pi-filter-slash text-color-secondary" style="font-size: 4rem"></i>
          <h5>{{ $t('No records found') }}</h5>
          <p>{{ $t('Try changing the search terms in the filter') }}</p>
          <Button
            icon="pi pi-filter-slash"
            iconClass="text-sm"
            class="p-button-lg"
            :label="$t('Clear filters')"
            @click="clearFilters"
          />
        </div>
      </template>

      <Column frozen field="options" class="w-3rem">
        <template #header>
          <Button
            text
            plain
            rounded
            icon="pi pi-cog"
            class="font-bold hover:text-color"
            v-tooltip.bottom="$t('Columns option')"
            @click="onSelectedColumnsMenu"
          />
        </template>
        <template #body="{ data }">
          <div>
            <Button
              text
              plain
              rounded
              icon="pi pi-ellipsis-v"
              class="hover:text-color"
              v-tooltip.bottom="$t('Optional menu')"
              @click="onOptionsMenu($event, data)"
            />
          </div>
        </template>
      </Column>

      <Column
        v-for="{ header, column, filter, sortable, filtrable, frozen } of selectedColumns"
        :key="column.field"
        :field="column.field"
        :sortable="sortable"
        :frozen="frozen"
        :filterField="filter?.field || column.field"
        :showFilterMatchModes="false"
        :style="{ minWidth: header?.width || '15rem' }"
        headerClass="text-center uppercase"
        class="max-w-20rem"
      >
        <template #header>
          <span class="mx-2">
            <i :class="header.icon" class="mr-2" v-if="header?.icon" />
            {{ header?.text }}
          </span>
        </template>

        <template #body="{ data, field }">
          <div class="white-space-nowrap overflow-hidden text-overflow-ellipsis px-2">
            <component
              v-if="column?.render"
              :is="column?.render(getObjField(data, field))"
              @click="column?.action(data) || false"
            />
          </div>
        </template>

        <template #filter="{ filterModel }" v-if="filtrable">
          <Listbox
            filter
            multiple
            class="w-full w-20rem"
            listStyle="height: 20rem"
            v-model="filterModel.value"
            :dataKey="filter.options.key"
            :optionValue="filter.options.value"
            :optionLabel="filter.options.label"
            :options="filter.options.records"
            :filterPlaceholder="$t('Search in list')"
            v-if="filter?.matchMode === 'in'"
          >
            <template #option="{ option }">
              <div class="flex align-items-center">
                <Checkbox :value="option.id" :modelValue="filterModel.value" class="mr-2" />
                <label>{{ option.title }}</label>
              </div>
            </template>
          </Listbox>

          <InputText
            v-else
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            :placeholder="$t('Search by column')"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
::v-deep(.p-component-overlay) {
  background-color: transparent;
}

::v-deep(tr.p-datatable-emptymessage > td) {
  border: none;
}

::v-deep(tr.p-datatable-emptymessage:hover) {
  background: none !important;
}

::v-deep(.p-datatable-footer) {
  border: none;
}

::v-deep(.p-paginator) {
  padding: 0.6rem 0rem;
}

::v-deep(.p-column-filter-menu-button.p-column-filter-menu-button-active) {
  background: transparent;
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

::v-deep(.p-datatable.p-datatable-sm .p-datatable-tbody > tr > td) {
  padding: 0.3rem 0.3rem;
}

::v-deep(.p-column-filter-menu) {
  margin-left: 0.5rem;
}
</style>
