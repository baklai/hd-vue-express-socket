<script setup>
import { ref, onMounted } from 'vue';

import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { dateToStr } from '@/service/DataFilters';
import { getObjField } from '@/service/ObjectMethods';
import { sortConverter } from '@/service/SortConverter';

import BtnDBTables from '@/components/buttons/BtnDBTables.vue';

const props = defineProps({
  store: {
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
  },
  stateKey: {
    type: String,
    default: 'datatable-config'
  },
  exportFileName: {
    type: String,
    default: 'datatable-export'
  }
});

const $emit = defineEmits(['toggleMenu', 'toggleModal', 'toggleSidebar']);

const { t } = useI18n();
const toast = useToast();

const filters = ref();
const params = ref({});
const loading = ref(false);

const refDataTable = ref();

const records = ref([]);
const totalRecords = ref();
const offsetRecords = ref(0);
const recordsPerPage = ref(15);
const recordsPerPageOptions = ref([5, 10, 15, 25, 50]);

const selectedColumns = ref(props.columns.filter((column) => column.selectable));

const refMenuColumns = ref(null);

const menuActions = ref([
  {
    label: t('Clear filters'),
    icon: 'pi pi-filter-slash',
    command: () => initFilters()
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

onMounted(async () => {
  initFilters();
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

const initFilters = () => {
  filters.value = {
    ...props.columns
      .filter((column) => column.filter)
      .reduce((previousObject, currentObject) => {
        return Object.assign(previousObject, {
          [currentObject.filterField]: currentObject.filter
        });
      }, {})
  };
};

const onSelectedColumnsMenu = (event) => {
  refMenuColumns.value.toggle(event);
};

const onSelectedColumns = (value) => {
  selectedColumns.value = props.columns.filter((column) => value.includes(column));
};

const getDataRecords = async () => {
  try {
    loading.value = true;
    const { docs, total, offset, limit } = await props.store.findAll(params.value);
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

const toggleMenu = (event, data) => {
  $emit('toggleMenu', event, data);
};

const toggleModal = (data) => {
  $emit('toggleModal', data);
};

const toggleSidebar = (data) => {
  $emit('toggleSidebar', data);
};

const exportCSV = () => {
  refDataTable.value.exportCSV();
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
  await getDataRecords();
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
        :options="columns"
        :modelValue="selectedColumns"
        :placeholder="$t('Select columns')"
        @update:modelValue="onSelectedColumns"
        class="p-multiselect-trigger"
      />
    </template>
  </Menu>

  <div class="flex w-full overflow-x-auto">
    <DataTable
      lazy
      rowHover
      scrollable
      removableSort
      resizableColumns
      ref="refDataTable"
      dataKey="id"
      sortMode="multiple"
      scrollHeight="flex"
      :stateKey="stateKey"
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
      csvSeparator=";"
      :exportFilename="exportFileName"
      @filter="onFilter"
      @sort="onSort"
      paginator
      :pageLinkSize="1"
      alwaysShowPaginator
      :first="offsetRecords"
      :rows="recordsPerPage"
      :totalRecords="totalRecords"
      :rowsPerPageOptions="recordsPerPageOptions"
      :paginatorTemplate="{
        '640px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        '960px': 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        '1300px':
          'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        default:
          'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
      }"
      @page="onPagination"
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

            <BtnDBTables v-if="tables" />
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

          <div
            class="flex flex-wrap gap-2 align-items-center justify-content-between sm:w-max w-full"
          >
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
                @click="initFilters"
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
          class="flex flex-column justify-content-center p-datatable-loading-overlay p-component-overlay"
        >
          <i class="pi pi-filter-slash text-color-secondary" style="font-size: 4rem"></i>
          <h5>{{ $t('No records found') }}</h5>
          <p>{{ $t('Try changing the search terms in the filter') }}</p>
          <Button
            icon="pi pi-filter-slash"
            iconClass="text-sm"
            class="p-button-lg"
            :label="$t('Clear filters')"
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
        v-for="column of selectedColumns"
        :field="column.field"
        :sortable="column.sortable || false"
        :frozen="column.frozen || false"
        headerClass="text-center uppercase"
        :style="`min-width: ${column.width}`"
        :key="column.field"
        :filterField="column.filterField"
        :showFilterMatchModes="column.showFilterMatchModes || false"
        class="white-space-nowrap overflow-hidden text-overflow-ellipsis"
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
            v-else-if="column.type === 'sidebar'"
            class="font-bold text-primary cursor-pointer"
            @click="toggleSidebar(data)"
          >
            {{ getObjField(data, column.field) }}
          </span>
        </template>

        <template #filter="{ filterModel }">
          <Listbox
            filter
            multiple
            dataKey="id"
            optionLabel="title"
            optionValue="id"
            :autoOptionFocus="false"
            v-model="filterModel.value"
            listStyle="height:250px"
            :options="column.filterOptions || []"
            :filterPlaceholder="$t('Search in list')"
            class="w-full md:w-20rem"
          >
            <template #option="slotProps">
              <div class="flex align-items-center">
                <Checkbox :value="slotProps.option"></Checkbox>

                <div>{{ slotProps.option.title }}</div>
              </div>
            </template>
            <!-- <template #item="{ option }">
              <div>
                <Checkbox v-model="checkedItems" :value="option" binary="true"></Checkbox>
                <label>{{ option }}</label>
              </div>
            </template> -->
          </Listbox>
          <!-- 
          <MultiSelect
            filter
            showToggleAll
            resetFilterOnHide
            dataKey="id"
            display="comma"
            optionValue="id"
            optionLabel="title"
            optionMode="listbox"
            v-model="filterModel.value"
            :maxSelectedLabels="3"
            :options="column.filterOptions || []"
            :placeholder="$t('Search in column')"
            :filterPlaceholder="$t('Search in list')"
            :emptyFilterMessage="$t('No results found')"
            :emptyMessage="$t('No results found')"
            :emptySelectionMessage="$t('No selected item')"
            :filterMessage="$t('{0} results are available')"
            :selectedItemsLabel="$t('{0} items selected')"
            :selectionMessage="$t('{0} items selected')"
            class="w-full md:w-30rem"
          >
            <template #option="slotProps">
              <div class="flex align-items-center">
                <span>{{ slotProps.option.title }}</span>
              </div>
            </template>

            <template #footer>
              <div class="py-2 px-3">
                <b>{{ filterModel.value ? filterModel.value.length : 0 }}</b>
                item{{ (filterModel.value ? filterModel.value.length : 0) > 1 ? 's' : '' }}
                selected.
              </div>
            </template>
          </MultiSelect> -->
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
