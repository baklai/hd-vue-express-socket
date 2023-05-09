<script setup>
/**
 * Datatable columns options.
 *
 * @param {string} field The name field of column (required).
 * @param {string} fieldType The type of column field (default: "text" || text, date, datetime, byte, boolean, sidebar).
 * @param {string} fieldIcon The icon of column field.
 * @param {string} header The header text of column (default: "field").
 * @param {string} headerIcon The icon of column header.
 * @param {string} sortField The name sortable field of column (default: "field").
 * @param {object} filter The filter object (default: { value: null, matchMode: FilterMatchMode.CONTAINS }).
 * @param {string} filterField The name filtrable field of column (default: "field").
 * @param {boolean} filterMatchModes The filter match modes of column (default: "false").
 * @param {array} filterOptions The filtrable options of column (default: "null").
 * @param {string} filterOptionsKey The filtrable options of column (default: "id").
 * @param {string} filterOptionsValue The filtrable options of column (default: "id").
 * @param {string} filterOptionsLabel The filtrable options of column (default: "title").
 * @param {string} columnWidth The width of column (default: "150px").
 * @param {boolean} selectable The default selectable of column (default: true).
 * @param {boolean} exportable The exportable of column (default: false).
 * @param {boolean} filtrable The filtrable of column (default: false).
 * @param {boolean} sortable The sortable of column (default: false).
 * @param {boolean} frozen The fixed column (default: false).
 *
 */

import { ref, computed, reactive, onMounted } from 'vue';

import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { getObjField } from '@/service/ObjectMethods';
import { dateToStr, dateTimeToStr, byteFormat } from '@/service/DataFilters';

const { t } = useI18n();
const toast = useToast();

const props = defineProps({
  columns: {
    type: Array,
    default: []
  },
  storageKey: {
    type: String,
    default: 'datatable-config'
  },
  exportFileName: {
    type: String,
    default: 'datatable-export'
  },
  onRecords: {
    type: Function,
    default() {
      return { docs: [], totalDocs: 0, offset: 0, limit: 5 };
    }
  }
});

const $emit = defineEmits(['toggleMenu', 'toggleModal', 'toggleSidebar']);

const toggleMenu = (event, data) => {
  $emit('toggleMenu', event, data);
};

const toggleModal = (data) => {
  $emit('toggleModal', data);
};

const toggleSidebar = (data) => {
  $emit('toggleSidebar', data);
};

const params = ref({});
const loading = ref(false);

const refDataTable = ref();
const refMenuColumns = ref();

const records = ref([]);
const totalRecords = ref();
const offsetRecords = ref(0);
const recordsPerPage = ref(15);
const recordsPerPageOptions = ref([5, 10, 15, 25, 50]);

const menuActions = ref([
  {
    label: t('Clear filters'),
    icon: 'pi pi-filter-slash',
    command: () => clearFilters()
  },
  {
    label: t('Create record'),
    icon: 'pi pi-plus-circle',
    command: () => toggleModal({})
  },
  {
    label: t('Update records'),
    icon: 'pi pi-sync',
    command: () => getDataRecords()
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

const dataTableColumns = computed(() => [
  ...props.columns.map(
    ({
      field,
      fieldType,
      fieldIcon,
      header,
      headerIcon,
      sortField,
      filter,
      filterField,
      filterMatchModes,
      filterOptions,
      filterOptionsKey,
      filterOptionsValue,
      filterOptionsLabel,
      columnWidth,
      selectable,
      exportable,
      filtrable,
      sortable,
      frozen
    }) => {
      return {
        field,
        fieldType: fieldType === undefined ? 'text' : fieldType,
        fieldIcon: fieldIcon === undefined ? false : fieldIcon,
        header: header === undefined ? t(field) : t(header),
        headerIcon: headerIcon === undefined ? false : headerIcon,
        sortField: sortField === undefined ? field : sortField,
        filter:
          filter === undefined
            ? { value: null, matchMode: filterOptions === undefined ? 'contains' : 'in' }
            : filter,
        filterField: filterField === undefined ? field : filterField,
        filterMatchModes: filterMatchModes === undefined ? false : filterMatchModes,
        filterOptions: filterOptions === undefined ? [] : filterOptions,
        filterOptionsKey: filterOptionsKey === undefined ? 'id' : filterOptionsKey,
        filterOptionsValue: filterOptionsValue === undefined ? 'id' : filterOptionsValue,
        filterOptionsLabel: filterOptionsLabel === undefined ? 'title' : filterOptionsLabel,
        columnWidth: columnWidth === undefined ? '10rem' : columnWidth,
        selectable: selectable === undefined ? true : selectable,
        exportable: exportable === undefined ? false : exportable,
        filtrable: filtrable === undefined ? false : filtrable,
        sortable: sortable === undefined ? false : sortable,
        frozen: frozen === undefined ? false : frozen
      };
    }
  )
]);

const selectedColumns = computed(() => dataTableColumns.value.filter((column) => column.selectable));

const filters = ref({
  ...dataTableColumns.value
    .filter((column) => column.filtrable)
    .reduce((previousObject, currentObject) => {
      return Object.assign(previousObject, {
        [currentObject.filterField]: currentObject.filter
      });
    }, {})
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

const getDataRecords = async () => {
  try {
    loading.value = true;
    const { docs, totalDocs, offset, limit } = await props.onRecords(params.value);
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
          console.log('Sorry, we are out of ' + value[prop].matchMode + '.');
      }
    }
  }
  return filterObject;
};

const clearFilters = async () => {
  filters.value = {
    ...dataTableColumns.value
      .filter((column) => column.filtrable)
      .reduce((previousObject, currentObject) => {
        return Object.assign(previousObject, {
          [currentObject.filterField]: currentObject.filter
        });
      }, {})
  };
  params.value.filters = filterConverter(filters.value);
  await getDataRecords();
};

const onPage = async (event) => {
  const { rows, first } = event;
  params.value.limit = rows;
  params.value.offset = first;
  await getDataRecords();
};

const onFilter = async (event) => {
  params.value.filters = filterConverter(event.filters);
  console.log(params.value.filters);
  await getDataRecords();
};

const onSort = async (event) => {
  params.value.sort = sortConverter(event.multiSortMeta);
  console.log(params.value.sort);
  await getDataRecords();
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
  await getDataRecords();
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
        default:
          'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
      }"
    >
      <template #paginatorstart>
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
                @click="toggleModal({})"
              />

              <Button
                text
                plain
                rounded
                icon="pi pi-sync"
                iconClass="text-2xl"
                class="p-button-lg hover:text-color h-3rem w-3rem"
                v-tooltip.bottom="$t('Update records')"
                @click="getDataRecords"
              />

              <slot name="dbbutton" />

              <Button
                text
                plain
                rounded
                icon="pi pi-cog"
                iconClass="text-2xl"
                class="p-button-lg hover:text-color h-3rem w-3rem"
                v-tooltip.bottom="$t('Columns options')"
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
          v-if="!loading"
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

      <Column frozen field="options" class="max-w-3rem">
        <template #header>
          <Button
            text
            plain
            rounded
            icon="pi pi-cog"
            class="font-bold hover:text-color"
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
            @click="toggleMenu($event, data)"
          />
        </template>
      </Column>

      <Column
        v-for="item of selectedColumns"
        :key="item.field"
        :field="item.field"
        :sortable="item.sortable"
        :frozen="item.frozen"
        :filterField="item.filterField"
        :showFilterMatchModes="item.filterMatchModes"
        :style="{ minWidth: item.columnWidth }"
        headerClass="text-center uppercase"
        class="white-space-nowrap overflow-hidden text-overflow-ellipsis"
      >
        <template #header>
          <i :class="item.headerIcon" class="mr-2" v-if="item.headerIcon" />
          <span>{{ item.header }}</span>
        </template>

        <template #body="{ data, field }">
          <i :class="item.fieldIcon" class="mr-2" v-if="item.fieldIcon" />

          <span v-if="item?.fieldType === 'text'">
            {{ getObjField(data, field) }}
          </span>
          <span v-else-if="item?.fieldType === 'date'">
            {{ dateToStr(getObjField(data, field)) }}
          </span>
          <span v-else-if="item?.fieldType === 'datetime'">
            {{ dateTimeToStr(getObjField(data, field)) }}
          </span>
          <span v-else-if="item?.fieldType === 'byte'">
            {{ byteFormat(getObjField(data, field)) }}
          </span>
          <span v-else-if="item?.fieldType === 'boolean'">
            {{ dateToStr(getObjField(data, field)) }}
          </span>
          <span
            v-else-if="item?.fieldType === 'sidebar'"
            class="font-bold text-primary cursor-pointer"
            @click="toggleSidebar(data)"
          >
            {{ getObjField(data, field) }}
          </span>
        </template>

        <template #filter="{ filterModel }" v-if="item?.filtrable">
          <Listbox
            filter
            multiple
            class="w-full w-20rem"
            listStyle="height: 20rem"
            v-model="filterModel.value"
            :dataKey="item.filterOptionsKey"
            :optionValue="item.filterOptionsValue"
            :optionLabel="item.filterOptionsLabel"
            :options="item.filterOptions"
            :filterPlaceholder="$t('Search in list')"
            v-if="item?.filter?.matchMode === 'in'"
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

::v-deep(.p-column-filter-menu) {
  margin-left: 0.5rem;
}
</style>
