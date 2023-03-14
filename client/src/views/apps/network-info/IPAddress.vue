<script setup>
import { ref, onMounted, computed } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useToast } from 'primevue/usetoast';

import HostToolsMenu from '@/components/menus/HostToolsMenu.vue';

import IPAddress from '@/components/sidebar/IPAddress.vue';

import { useIPAddress } from '@/stores/restfullapi';

import { dateToStr } from '@/service/DataFilters';

const toast = useToast();
const useAPI = useIPAddress();

const params = ref({});
const loading = ref(false);

const record = ref(null);
const records = ref([]);
const totalRecords = ref();
const offsetRecord = ref(0);
const recordsPerPage = ref(15);
const recordsPerPageOptions = ref([5, 10, 15, 25, 50]);

const columns = ref([
  {
    field: 'location.title',
    header: 'Location',
    align: 'start',
    width: '180px',
    selectable: true,
    sortable: true,
    frozen: true
  },

  {
    field: 'unit.title',
    header: 'Unit',
    align: 'start',
    width: '150px',
    selectable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'ipaddress',
    header: 'IP Address',
    align: 'start',
    width: '120px',
    selectable: true,
    sortable: true,
    frozen: true
  },

  {
    field: 'company.title',
    header: 'Company',
    align: 'start',
    width: '200px',
    selectable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'branch.title',
    header: 'Branch',
    align: 'start',
    width: '200px',
    selectable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'enterprise.title',
    header: 'Enterprise',
    align: 'start',
    width: '200px',
    selectable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'department.title',
    header: 'Department',
    align: 'start',
    width: '200px',
    selectable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'fullname',
    header: 'Fullname',
    align: 'start',
    width: '200px',
    selectable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'position.title',
    header: 'Position',
    align: 'start',
    width: '200px',
    selectable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'phone',
    header: 'Phone',
    align: 'start',
    width: '150px',
    selectable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'autoanswer',
    header: 'Autoanswer',
    align: 'start',
    width: '150px',
    selectable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'mail',
    header: 'Mail',
    align: 'start',
    width: '200px',
    selectable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'date',
    header: 'Date',
    align: 'start',
    width: '200px',
    selectable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'internet',
    header: 'Internet',
    align: 'start',
    width: '150px',
    selectable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'email',
    header: 'E-mail',
    align: 'start',
    width: '150px',
    selectable: true,
    sortable: true,
    frozen: false
  },

  {
    field: 'comment',
    header: 'Comment',
    align: 'start',
    width: '300px',
    selectable: true,
    sortable: true,
    frozen: false
  }
]);

// const get = (from, ...selectors) =>
//   [...selectors].map((s) =>
//     s
//       .replace(/\[([^\[\]]*)\]/g, '.$1.')
//       .split('.')
//       .filter((t) => t !== '')
//       .reduce((prev, cur) => prev && prev[cur], from)
//   );

const selectedColumns = ref(columns.value.filter((column) => column.selectable));

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  locationFrom: { value: null, matchMode: FilterMatchMode.IN },
  unitFrom: { value: null, matchMode: FilterMatchMode.IN },
  locationTo: { value: null, matchMode: FilterMatchMode.IN },
  unitTo: { value: null, matchMode: FilterMatchMode.IN },
  level: { value: null, matchMode: FilterMatchMode.IN },
  type: { value: null, matchMode: FilterMatchMode.IN },
  speed: { value: null, matchMode: FilterMatchMode.IN },
  status: { value: null, matchMode: FilterMatchMode.IN },
  operator: { value: null, matchMode: FilterMatchMode.IN },
  composition: { value: null, matchMode: FilterMatchMode.IN }
});

const refMenuColumns = ref(null);

const refOptionMenu = ref();

const refSidebar = ref();

// const host = computed(() => {
//   return record.value;
// });

const menuRecord = ref([
  {
    label: 'New record',
    icon: 'pi pi-plus-circle',
    command: () => onRecordInfoMessage(record)
  },
  {
    label: 'Edit record',
    icon: 'pi pi-file-edit',
    command: () => onRecordInfoMessage(record)
  },
  {
    label: 'Delete record',
    icon: 'pi pi-times-circle',
    command: () => onRecordInfoMessage(record)
  }
]);

const menuActions = ref([
  {
    label: 'Clear filters',
    icon: 'pi pi-filter-slash',
    command: () => {}
  },
  {
    label: 'Update records',
    icon: 'pi pi-sync',
    command: () => {}
  },
  {
    label: 'Create record',
    icon: 'pi pi-plus-circle',
    command: () => {}
  }
]);

const menuReports = ref([
  {
    label: 'Export records',
    icon: 'pi pi-file-export',
    command: () => {}
  },
  {
    label: 'Export all records',
    icon: 'pi pi-file-export',
    command: () => {}
  }
]);

const menuDTables = ref([
  {
    label: 'Company',
    icon: 'pi pi-table',
    command: () => {}
  },
  {
    label: 'Branch',
    icon: 'pi pi-table',
    command: () => {}
  },
  {
    label: 'Enterprise',
    icon: 'pi pi-table',
    command: () => {}
  },
  {
    label: 'Department',
    icon: 'pi pi-table',
    command: () => {}
  },
  {
    label: 'Location',
    icon: 'pi pi-table',
    command: () => {}
  },
  {
    label: 'Position',
    icon: 'pi pi-table',
    command: () => {}
  }
]);

onMounted(async () => {
  loading.value = true;
  params.value = {
    offset: offsetRecord.value,
    limit: recordsPerPage.value,
    sortField: null,
    sortOrder: null,
    filters: filters.value
  };
  await getDataRecords();
});

// const onRecordContextMenu = (event) => {
//   refOptionMenu.value.show(event.originalEvent);
// };

const onRecordOptionMenu = (event, record) => {
  record.value = { ...record };
  isSidebar.value = true;
};

// const onRecordColumn = (event, record) => {
//   record.value = { ...record };
//   refOptionMenu.value.show(event);
// };

const onRecordInfoMessage = (record) => {
  toast.add({ severity: 'info', summary: 'Product Selected', detail: record.value.id, life: 3000 });
};

const onSelectedColumnsMenu = (event) => {
  refMenuColumns.value.toggle(event);
};

const onSelectedColumns = (value) => {
  selectedColumns.value = columns.value.filter((column) => value.includes(column));
};

const getDataRecords = async () => {
  try {
    loading.value = true;
    const { docs, total, offset, limit } = await useAPI.findAll(params.value);
    records.value = docs;
    totalRecords.value = total;
    offsetRecord.value = Number(offset);
    recordsPerPage.value = limit;
  } catch (err) {
    console.log(err);
    records.value = [];
  } finally {
    loading.value = false;
  }
};

const onPageRecords = async (event) => {
  const { rows, first } = event;
  params.value.limit = rows;
  params.value.offset = first;
  await getDataRecords();
};

const toggleOptionMenu = (event, host) => {
  refOptionMenu.value.toggle(event, host);
};

const toggleSidebar = (data) => {
  refSidebar.value.toggle(data);
};
</script>

<template>
  <Menu ref="refMenuColumns" :popup="true" class="w-18rem p-2">
    <template #start>
      <MultiSelect
        :modelValue="selectedColumns"
        :options="columns"
        optionLabel="header"
        @update:modelValue="onSelectedColumns"
        placeholder="Select columns"
        class="p-multiselect-trigger"
      />
    </template>
  </Menu>

  <HostToolsMenu ref="refOptionMenu" :items="menuRecord" />

  <div class="col-12">
    <div class="card flex h-full">
      <div class="w-full overflow-x-auto">
        <DataTable
          lazy
          rowHover
          scrollable
          removableSort
          resizableColumns
          dataKey="id"
          scrollHeight="flex"
          filterDisplay="menu"
          responsiveLayout="scroll"
          columnResizeMode="expand"
          stateStorage="local"
          class="p-datatable-sm overflow-x-auto"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
          style="height: calc(100vh - 13rem)"
          :value="records"
          :loading="loading"
          :globalFilterFields="['locationFrom', 'locationTo']"
          v-model:filters="filters"
        >
          <!-- v-model:contextMenuSelection="record"
          @rowContextmenu="onRecordContextMenu" -->

          <template #header>
            <div class="flex flex-wrap gap-4 mb-2 align-items-center justify-content-between">
              <div class="flex flex-wrap gap-2 align-items-center">
                <i class="pi pi-sitemap text-6xl mr-3 hidden sm:block"></i>
                <div>
                  <h3 class="text-color m-0">Network IP Address</h3>
                  <p class="text-color-secondary">
                    Network IP Address of the technical support department
                  </p>
                </div>
              </div>

              <div
                class="flex flex-wrap gap-2 align-items-center justify-content-between sm:w-max w-full"
              >
                <span class="p-input-icon-left p-input-icon-right sm:w-max w-full">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="filters['global'].value"
                    placeholder="Search in table"
                    class="sm:w-max w-full"
                  />
                  <i
                    class="pi pi-times cursor-pointer hover:text-color"
                    v-show="filters['global'].value"
                  />
                </span>

                <div class="flex gap-2 sm:w-max w-full justify-content-between">
                  <Button
                    type="button"
                    icon="pi pi-filter-slash"
                    class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-3rem w-3rem"
                    v-tooltip.bottom="'Clear filters'"
                  />

                  <Button
                    type="button"
                    icon="pi pi-plus-circle"
                    iconClass="text-2xl"
                    class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-3rem w-3rem"
                    v-tooltip.bottom="'Create record'"
                  />

                  <Button
                    @click="getDataRecords"
                    type="button"
                    icon="pi pi-sync"
                    iconClass="text-2xl"
                    class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-3rem w-3rem"
                    v-tooltip.bottom="'Update records'"
                  />

                  <Button
                    @click="onSelectedColumnsMenu"
                    type="button"
                    icon="pi pi-cog"
                    iconClass="text-2xl"
                    class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-3rem w-3rem"
                    aria-haspopup="true"
                    aria-controls="overlay_menu"
                    v-tooltip.bottom="'Columns options'"
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
                  label="Actions"
                  icon="pi pi-sliders-h"
                  :model="menuActions"
                  class="p-button-outlined sm:w-max w-full"
                  :buttonProps="{ class: 'text-color-secondary' }"
                  :menuButtonProps="{ class: 'text-color-secondary' }"
                />
                <SplitButton
                  label="Reports"
                  icon="pi pi-save"
                  :model="menuReports"
                  class="p-button-outlined sm:w-max w-full"
                  :buttonProps="{ class: 'text-color-secondary' }"
                  :menuButtonProps="{ class: 'text-color-secondary' }"
                />
                <SplitButton
                  label="DB Tables"
                  icon="pi pi-database"
                  :model="menuDTables"
                  class="p-button-outlined sm:w-max w-full"
                  :buttonProps="{ class: 'text-color-secondary' }"
                  :menuButtonProps="{ class: 'text-color-secondary' }"
                />
              </div>
              <div class="flex flex-wrap gap-2 align-items-center justify-content-evenly">
                <Paginator
                  :pageLinkSize="1"
                  :alwaysShow="true"
                  :first="offsetRecord"
                  :rows="recordsPerPage"
                  :totalRecords="totalRecords"
                  :rowsPerPageOptions="recordsPerPageOptions"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                  :template="{
                    '640px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                    '960px':
                      'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                    '1300px':
                      'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                    default:
                      'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                  }"
                  @page="onPageRecords"
                />
              </div>
            </div>
          </template>

          <template #loading>
            <i class="pi pi-spin pi-spinner mr-4" style="font-size: 2rem"></i>
            <span>Loading records data. Please wait.</span>
          </template>

          <template #empty>
            <div
              v-if="!loading"
              class="flex flex-column justify-content-center p-datatable-loading-overlay p-component-overlay"
            >
              <i class="pi pi-filter-slash" style="font-size: 4rem"></i>
              <h5>No records found</h5>
              <p>Try changing the search terms in the filter</p>
              <Button label="Clear filters" class="p-button-lg" />
            </div>
          </template>

          <Column frozen style="max-width: 3rem">
            <template #header>
              <Button
                type="button"
                icon="pi pi-cog"
                class="p-button-rounded p-button-text p-button-icon text-color-secondary"
                @click="onSelectedColumnsMenu"
              />
            </template>
            <template #body="{ data }">
              <Button
                type="button"
                icon="pi pi-ellipsis-v"
                iconClass="text-xl"
                class="p-button-rounded p-button-text p-button-icon text-color-secondary hover:text-color"
                v-tooltip.bottom="'Optional menu'"
                @click="toggleOptionMenu($event, data?.ipaddress)"
              />
            </template>
          </Column>

          <Column
            v-for="column of selectedColumns"
            :field="column.field"
            :sortable="column.sortable"
            :frozen="column.frozen"
            headerClass="text-center uppercase"
            :style="`min-width: ${column.width}`"
          >
            <template #header>
              <span>{{ column.header }}</span>
            </template>

            <template #body="{ data }" v-if="column.field === 'ipaddress'">
              <span class="font-bold text-primary cursor-pointer" @click="toggleSidebar(data)">
                {{ data[column.field] }}
              </span>
            </template>

            <template #body="{ data }" v-if="column.field === 'date'">
              {{ dateToStr(data[column.field]) }}
            </template>

            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by field"
              />
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- <Divider layout="vertical" class="border-left-1 border-100" /> -->

      <IPAddress ref="refSidebar" />
    </div>
  </div>
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

::v-deep(.p-datatable.p-datatable-hoverable-rows .p-datatable-tbody > tr:not(.p-highlight):hover) {
  background: var(--surface-ground);
}
</style>
