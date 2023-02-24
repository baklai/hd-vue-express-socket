<script setup>
import { ref, onMounted, computed } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useToast } from 'primevue/usetoast';

import { useIPAddress } from '@/stores/restfullapi';

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

const toast = useToast();

const useAPI = useIPAddress();

const params = ref({});
const loading = ref(false);

const records = ref([]);
const totalRecords = ref();
const offsetRecord = ref(0);
const recordsPerPage = ref(10);
const recordsPerPageOptions = ref([5, 10, 15, 25, 50]);

const selectedRecord = ref();

const isSidebar = ref(false);

const columns = ref([
  { field: 'location.title', header: 'Location', align: 'start', width: '180px', selectable: true, sortable: true, frozen: true },

  { field: 'unit.title', header: 'Unit', align: 'start', width: '150px', selectable: true, sortable: true, frozen: false },

  { field: 'ipaddress', header: 'IP Address', align: 'start', width: '120px', selectable: true, sortable: true, frozen: true },

  { field: 'company.title', header: 'Company', align: 'start', width: '200px', selectable: true, sortable: true, frozen: false },

  { field: 'branch.title', header: 'Branch', align: 'start', width: '200px', selectable: true, sortable: true, frozen: false },

  { field: 'enterprise.title', header: 'Enterprise', align: 'start', width: '200px', selectable: true, sortable: true, frozen: false },

  { field: 'department.title', header: 'Department', align: 'start', width: '200px', selectable: true, sortable: true, frozen: false },

  { field: 'fullname', header: 'Fullname', align: 'start', width: '200px', selectable: true, sortable: true, frozen: false },

  { field: 'position.title', header: 'Position', align: 'start', width: '200px', selectable: true, sortable: true, frozen: false },

  { field: 'phone', header: 'Phone', align: 'start', width: '150px', selectable: true, sortable: true, frozen: false },

  { field: 'autoanswer', header: 'Autoanswer', align: 'start', width: '150px', selectable: true, sortable: true, frozen: false },

  { field: 'mail', header: 'Mail', align: 'start', width: '200px', selectable: true, sortable: true, frozen: false },

  { field: 'date', header: 'Date', align: 'start', width: '200px', selectable: true, sortable: true, frozen: false },

  { field: 'internet', header: 'Internet', align: 'start', width: '150px', selectable: true, sortable: true, frozen: false },

  { field: 'email', header: 'E-mail', align: 'start', width: '150px', selectable: true, sortable: true, frozen: false },

  { field: 'comment', header: 'Comment', align: 'start', width: '300px', selectable: true, sortable: true, frozen: false }
]);

const get = (from, ...selectors) =>
  [...selectors].map((s) =>
    s
      .replace(/\[([^\[\]]*)\]/g, '.$1.')
      .split('.')
      .filter((t) => t !== '')
      .reduce((prev, cur) => prev && prev[cur], from)
  );

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

const refContextMenu = ref();

const host = computed(() => {
  return selectedRecord.value;
});

const menuRecord = ref([
  { label: 'ICMP Ping', icon: 'pi pi-fw pi-search', command: () => onPing(selectedRecord) },
  { label: 'RDP Connect', icon: 'pi pi-fw pi-times', command: () => getRDPClient(selectedRecord) },
  { label: 'VNC Connect', icon: 'pi pi-fw pi-search', command: () => getVNCClient(selectedRecord) },
  { label: 'IP to clipboard', icon: 'pi pi-fw pi-times', command: () => copyIPtoClipboard(selectedRecord) },
  { separator: true },
  { label: 'View', icon: 'pi pi-fw pi-search', command: () => onRecordInfoMessage(selectedRecord) },
  { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => onRecordInfoMessage(selectedRecord) },
  { label: 'View', icon: 'pi pi-fw pi-search', command: () => onRecordInfoMessage(selectedRecord) },
  { label: 'Delete', icon: 'pi pi-fw pi-times', command: () => onRecordInfoMessage(selectedRecord) }
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

const onRecordContextMenu = (event) => {
  refContextMenu.value.show(event.originalEvent);
};

const onRecordOptionMenu = (event, record) => {
  selectedRecord.value = { ...record };
  refContextMenu.value.show(event);
};

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

const copyIPtoClipboard = (record) => {
  navigator.clipboard.writeText(record.value.id);
  toast.add({ severity: 'info', summary: 'Copied to clipboard', detail: `IP ${record.value.id} copied to clipboard`, life: 3000 });
};

const getRDPClient = async (host) => {
  console.log(host);
  const file = await this.$store.dispatch('api/tool/getRDP', host);
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `RDP_${host}.rdp`);
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
  // this.$toast.success(this.$t('RDP File created'));
  link.click();
};

const getVNCClient = async (host) => {
  console.log(host);
  const file = await this.$store.dispatch('api/tool/getVNC', host);
  const url = window.URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `VNC_${host}.vnc`);
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
  //  this.$toast.success(this.$t('VNC File created'));
  link.click();
};

const onPing = async (host) => {
  console.log(host);
  try {
    if (this.IPv4.test(host)) {
      toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
      //    this.$toast.info(this.$t('Ping run'));
      const ping = await this.$store.dispatch('api/tool/getOPING', host);
      if (ping) {
        this.$toast.show('<pre>' + ping.output + '</pre>', {
          duration: 10000
        });
      }
    } else {
      toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
      //  this.$toast.error(this.$t('Enter correct target for ping'));
    }
  } catch (err) {
    toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
    // this.$toast.error(this.$t('Ping error'));
  }
};

const showMessage = () => {
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
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

  <ContextMenu :model="menuRecord" ref="refContextMenu" />

  <div class="col-12">
    <div class="card h-full">
      <div class="flex">
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
          class="p-datatable-sm transition-all transition-duration-500"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
          style="height: calc(100vh - 14rem)"
          :style="isSidebar ? 'width: calc(100% - 350px)' : 'width: calc(100%)'"
          :value="records"
          :loading="loading"
          :globalFilterFields="['locationFrom', 'locationTo']"
          v-model:contextMenuSelection="selectedRecord"
          @rowContextmenu="onRecordContextMenu"
          v-model:filters="filters"
        >
          <template #header>
            <div class="flex flex-wrap gap-4 mb-2 align-items-center justify-content-between">
              <div class="flex flex-wrap gap-2 align-items-center">
                <i class="pi pi-arrow-right-arrow-left mr-3 hidden sm:block" style="font-size: 2rem"></i>
                <div>
                  <h3 class="text-color m-0">Network IP Address</h3>
                  <p class="text-color-secondary">Network IP Address of the technical support department</p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 align-items-center justify-content-between sm:w-max w-full">
                <span class="p-input-icon-left p-input-icon-right sm:w-max w-full">
                  <i class="pi pi-search" />
                  <InputText v-model="filters['global'].value" placeholder="Search in table" class="sm:w-max w-full" />
                  <i class="pi pi-times cursor-pointer hover:text-color" v-show="filters['global'].value" />
                </span>

                <div class="flex gap-2 sm:w-max w-full justify-content-between">
                  <Button
                    type="button"
                    icon="pi pi-arrow-right-arrow-left"
                    class="p-button-lg p-button-rounded p-button-text text-color-secondary hover:text-color h-3rem w-3rem"
                    @click="isSidebar = !isSidebar"
                    v-tooltip.bottom="'Show/hide sidebar'"
                  />

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
            <div class="flex flex-wrap gap-4 align-items-center justify-content-evenly xl:justify-content-between p-2 mt-4">
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
                    '960px': 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                    '1300px': 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                    default: 'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
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
            <div v-if="!loading" class="flex flex-column justify-content-center p-datatable-loading-overlay p-component-overlay">
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

            <template #body="slotProps">
              <Button
                type="button"
                icon="pi pi-ellipsis-v"
                iconClass="text-xl"
                class="p-button-rounded p-button-text p-button-icon text-color-secondary hover:text-color"
                v-tooltip.bottom="'Current record'"
                @click="onRecordOptionMenu($event, slotProps.data)"
              />
            </template>

            <template #loading>
              <div class="flex align-items-center" :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }">
                <Skeleton width="60%" height="1rem" />
              </div>
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
              <span class="font-bold text-primary cursor-pointer"> {{ data[column.field] }}</span>
            </template>

            <template #filter="{ filterModel }">
              <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by field" />
            </template>
          </Column>
        </DataTable>

        <Divider layout="vertical" v-if="isSidebar" class="border-left-1 border-100" />

        <Card style="height: calc(100vh - 14rem)" class="sticky w-auto overflow-y-auto" :class="!isSidebar && 'hidden'">
          <template #header> dfghfgh </template>
          <template #title> Advanced Card </template>
          <template #content>
            <table>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Location' }} :</td>
                <td>'-'</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Unit' }} :</td>
                <td>fghdfgh</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'IP Address' }} :</td>
                <td>dfghdfgh</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Mask' }} :</td>
                <td>dfghdfhg</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Gateway' }} :</td>
                <td>ertyerty</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ '№ Mail' }} :</td>
                <td>cbncvbncvnb</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Company' }} :</td>
                <td>asdfasfdasf</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Branch' }} :</td>
                <td>qwerqwerqwer</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Enterprise' }} :</td>
                <td>sdfgsdfgsdfg sdfgs</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Department' }} :</td>
                <td>qwerqwerqwerqer</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Fullname' }} :</td>
                <td>qwerqwersdfasfd</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Position' }} :</td>
                <td>asdfasfasfd</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Phone' }} :</td>
                <td>hjklhjklhjkl</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Autoanswer' }} :</td>
                <td>jhklhjklhjkl</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Date open' }} :</td>
                <td>jhklhjklhjkl</td>
              </tr>
              <tr>
                <td class="font-weight-bold" width="50%">{{ 'Comment' }} :</td>
                <td>hjklhjlhjklhjkl/td></td>
              </tr>
            </table>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro architecto vero illum assumenda sunt aperiam facere. Dicta id doloremque
            consequuntur expedita. Omnis enim similique nam quia eveniet velit blanditiis assumenda! Fugiat quisquam fugit nisi. In omnis eligendi
            odio dolores, corporis iusto est numquam impedit, necessitatibus eius possimus. Nesciunt praesentium a
          </template>
          <template #footer>
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: 0.5em" />
          </template>
        </Card>
      </div>
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
</style>
