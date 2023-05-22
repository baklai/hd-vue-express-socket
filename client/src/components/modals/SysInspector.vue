<script setup>
import html2pdf from 'html2pdf.js';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useInspector } from '@/stores/api/inspector';
import { useIPAddress } from '@/stores/api/ipaddress';
import { byteToStr, strToDate, dateToStr, dateTimeToStr } from '@/service/DataFilters';

import IPTable from '@/components/tables/IPTable.vue';

const { t } = useI18n();
const toast = useToast();
const Inspector = useInspector();
const IPAddress = useIPAddress();

const emits = defineEmits(['close']);

defineExpose({
  toggle: async ({ id }) => {
    try {
      record.value = await Inspector.findOne({ id });
      recordIP.value = await IPAddress.findOne({ ipaddress: record.value.host, populate: true });
      visible.value = true;
    } catch (err) {
      visible.value = false;
      record.value = await Inspector.$reset();
      recordIP.value = await IPAddress.$reset();
      toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t(err.message), life: 3000 });
    }
  }
});

const visible = ref(false);

const record = ref({});
const recordIP = ref({});

const refMenu = ref();
const options = ref([
  {
    label: t('Save record'),
    icon: 'pi pi-save',
    command: async () => onSaveReport()
  },
  {
    label: t('Delete record'),
    icon: 'pi pi-trash',
    command: async () => await onRemoveRecord()
  }
]);

const onClose = () => {
  visible.value = false;
  record.value = Inspector.$reset();
  recordIP.value = IPAddress.$reset();
  emits('close', {});
};

const onRemoveRecord = async () => {
  if (record.value?.id) {
    await Inspector.removeOne(record.value);
    visible.value = false;
    toast.add({
      severity: 'success',
      summary: t('HD Information'),
      detail: t('Record is removed'),
      life: 3000
    });
    onClose();
  } else {
    toast.add({
      severity: 'warn',
      summary: t('HD Warning'),
      detail: t('Record not selected'),
      life: 3000
    });
  }
};

const onSaveReport = () => {
  try {
    const element = document.querySelector('#report');
    const options = {
      margin: 1,
      filename: `SYSINSPECTOR_${record.value.host} (${new Date(
        record.value.updatedAt
      ).toLocaleDateString()}).pdf`,
      jsPDF: {
        format: 'a4',
        compress: true,
        floatPrecision: 16,
        orientation: 'portrait'
      }
    };
    html2pdf().set(options).from(element).save();

    toast.add({
      severity: 'success',
      summary: t('HD Information'),
      detail: t('Report created successfully'),
      life: 3000
    });
  } catch (err) {
    toast.add({
      severity: 'warn',
      summary: t('HD Warning'),
      detail: t('An unexpected error has occurred'),
      life: 3000
    });
  }
};

const memorySum = (value) => {
  const summa = value.reduce(
    (accumulator, { Capacity }) => Number(accumulator) + Number(Capacity),
    0
  );
  const index = Math.floor(Math.log(summa) / Math.log(1024));
  return (
    (summa / Math.pow(1024, index)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GiB', 'TB'][index]
  );
};

const diskSum = (value) => {
  const summa = value.reduce((accumulator, { Size }) => Number(accumulator) + Number(Size), 0);
  const index = Math.floor(Math.log(summa) / Math.log(1024));
  return (
    (summa / Math.pow(1024, index)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GiB', 'TB'][index]
  );
};
</script>

<template>
  <Menu ref="refMenu" popup :model="options" />

  <Dialog
    modal
    closable
    dismissableMask
    :draggable="false"
    v-model:visible="visible"
    :style="{ width: '860px' }"
    class="p-fluid"
    @hide="onClose"
  >
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex align-items-center justify-content-center">
          <AppIcons name="pc-sys-inspector" :size="40" class="mr-2" />
          <div>
            <p class="text-lg font-bold line-height-2 mb-0">
              {{ record?.os ? record?.os?.CSName : record?.host }}
            </p>
            <p class="text-base font-normal line-height-2 text-color-secondary mb-0">
              {{ $t('Report host') }}: {{ record?.host || '-' }}
            </p>
            <p class="text-base font-normal line-height-2 text-color-secondary mb-0">
              {{ $t('Report date') }}: {{ dateTimeToStr(record?.updatedAt) }}
            </p>
          </div>
        </div>
        <div class="flex gap-2 align-items-center">
          <Button
            text
            plain
            rounded
            icon="pi pi-ellipsis-v"
            class="mx-2"
            v-tooltip.bottom="$t('Options menu')"
            @click="(event) => refMenu.toggle(event)"
          />
        </div>
      </div>
    </template>

    <template #default>
      <div id="report">
        <div class="grid my-2 mx-2">
          <div class="col-12 md:col" v-if="recordIP?.ipaddress">
            <div class="flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                height="40"
                class="text-color mr-2"
              >
                <path
                  fill="currentColor"
                  d="M19 5V19H5V5H19M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M9 7H7V17H9V7M15 7H11V17H13V13H15C16.1 13 17 12.1 17 11V9C17 7.9 16.1 7 15 7M15 11H13V9H15V11Z"
                />
              </svg>
              <div>
                <p class="text-lg font-medium mb-0">IP {{ recordIP?.ipaddress || '-' }}</p>
                <p class="text-base font-normal">
                  {{ $t('Date open') }} : {{ dateToStr(recordIP?.date) }}
                </p>
              </div>
            </div>
            <IPTable :record="recordIP" :internet="false" :email="false" />
          </div>
          <Divider layout="vertical" class="hidden md:flex" v-if="recordIP?.ipaddress" />
          <div class="col-12 md:col">
            <div class="flex align-items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="40"
                height="40"
                class="text-color mr-2"
              >
                <path
                  fill="currentColor"
                  d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z"
                />
              </svg>
              <div>
                <p class="text-base font-normal mb-0">
                  {{ record?.os ? record?.os?.Caption : '-' }}
                </p>
                <p class="text-base font-normal mb-0">
                  {{ record?.os ? record?.os?.OSArchitecture : '-' }}
                  {{ record?.os ? record?.os?.Version : '-' }}
                </p>
              </div>
            </div>

            <div class="flex justify-content-between mb-4">
              <div class="flex justify-content-cente w-4">
                <div class="flex flex-column card-container">
                  <div class="flex align-items-center justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="40"
                      height="40"
                      class="text-color"
                    >
                      <path
                        fill="currentColor"
                        d="M17,17H7V7H17M21,11V9H19V7C19,5.89 18.1,5 17,5H15V3H13V5H11V3H9V5H7C5.89,5 5,5.89 5,7V9H3V11H5V13H3V15H5V17A2,2 0 0,0 7,19H9V21H11V19H13V21H15V19H17A2,2 0 0,0 19,17V15H21V13H19V11M13,13H11V11H13M15,9H9V15H15V9Z"
                      />
                    </svg>
                  </div>
                  <div class="flex align-items-center justify-content-center">
                    <p>{{ $t('CPU') }}</p>
                  </div>
                  <div class="flex align-items-center justify-content-center text-center">
                    <span>
                      {{ record?.cpu?.Name || '-' }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex justify-content-center w-4">
                <div class="flex flex-column">
                  <div class="flex align-items-center justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="40"
                      height="40"
                    >
                      <path
                        fill="currentColor"
                        d="M2 7H4.5V17H3V8.5H2M22 7V16H14V17H7V16H6V7M10 9H8V12H10M13 9H11V12H13M20 9H15V14H20V9Z"
                      />
                    </svg>
                  </div>
                  <div class="flex align-items-center justify-content-center">
                    <p>{{ $t('RAM') }}</p>
                  </div>
                  <div class="flex align-items-center justify-content-center text-center">
                    <span>
                      {{ memorySum(record?.memorychip) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex justify-content-center w-4">
                <div class="flex flex-column card-container">
                  <div class="flex align-items-center justify-content-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="40"
                      height="40"
                      class="text-color"
                    >
                      <path
                        fill="currentColor"
                        d="M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M12,4A6,6 0 0,0 6,10C6,13.31 8.69,16 12.1,16L11.22,13.77C10.95,13.29 11.11,12.68 11.59,12.4L12.45,11.9C12.93,11.63 13.54,11.79 13.82,12.27L15.74,14.69C17.12,13.59 18,11.9 18,10A6,6 0 0,0 12,4M12,9A1,1 0 0,1 13,10A1,1 0 0,1 12,11A1,1 0 0,1 11,10A1,1 0 0,1 12,9M7,18A1,1 0 0,0 6,19A1,1 0 0,0 7,20A1,1 0 0,0 8,19A1,1 0 0,0 7,18M12.09,13.27L14.58,19.58L17.17,18.08L12.95,12.77L12.09,13.27Z"
                      />
                    </svg>
                  </div>
                  <div class="flex align-items-center justify-content-center">
                    <p>{{ $t('HDD') }}</p>
                  </div>
                  <div class="flex align-items-center justify-content-center text-center">
                    <span>
                      {{ diskSum(record?.diskdrive) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <table class="mb-4">
              <tr>
                <td class="font-medium" width="40%">{{ $t('OS Type') }}</td>
                <td>{{ $t('Microsoft Windows') }}</td>
              </tr>
              <tr>
                <td class="font-medium" width="40%">{{ $t('OS Version') }}</td>
                <td>{{ record?.os?.Version || '-' }}</td>
              </tr>
              <tr>
                <td class="font-medium" width="40%">{{ $t('OS Name') }}</td>
                <td>{{ record?.os?.Caption || '-' }}</td>
              </tr>
              <tr>
                <td class="font-medium" width="40%">{{ $t('OS Platform') }}</td>
                <td>{{ record?.os?.OSArchitecture || '-' }}</td>
              </tr>
            </table>

            <table>
              <tr>
                <td class="font-medium" width="40%">{{ $t('PC Name') }}</td>
                <td>{{ record?.os ? record?.os?.CSName : record?.host }}</td>
              </tr>
              <tr>
                <td class="font-medium" width="40%">{{ $t('IP Address') }}</td>
                <td>{{ record?.host || '-' }}</td>
              </tr>
              <tr>
                <td class="font-medium" width="40%">{{ $t('Report date') }}</td>
                <td>{{ dateTimeToStr(record?.updatedAt) }}</td>
              </tr>
            </table>
          </div>
        </div>

        <div class="my-2 mx-2">
          <div class="flex align-items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              class="text-color mr-2"
            >
              <path
                fill="currentColor"
                d="M17,17H7V7H17M21,11V9H19V7C19,5.89 18.1,5 17,5H15V3H13V5H11V3H9V5H7C5.89,5 5,5.89 5,7V9H3V11H5V13H3V15H5V17A2,2 0 0,0 7,19H9V21H11V19H13V21H15V19H17A2,2 0 0,0 19,17V15H21V13H19V11M13,13H11V11H13M15,9H9V15H15V9Z"
              />
            </svg>
            <div>
              <p class="text-base font-bold mb-0">{{ $t('CPU') }}</p>
              <p class="text-base font-normal mb-0">
                {{ $t('Central processing unit') }}
              </p>
            </div>
          </div>
          <table>
            <tr>
              <td class="font-weight-bold">
                {{ $t('Description') }}
              </td>
              <td>{{ record?.cpu?.Name || '-' }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('Clock frequency') }}
              </td>
              <td>{{ record?.cpu?.CurrentClockSpeed || '-' }} MHz</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('Number of cores') }}
              </td>
              <td>{{ record?.cpu?.NumberOfCores || '-' }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('Number of logical cores') }}
              </td>
              <td>{{ record?.cpu?.NumberOfLogicalProcessors || '-' }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('Type of architecture') }}
              </td>
              <td>{{ record?.cpu?.Architecture || '-' }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('Manufacturer') }}
              </td>
              <td>{{ record?.cpu?.Manufacturer || '-' }}</td>
            </tr>
          </table>
        </div>

        <div class="my-2 mx-2">
          <div class="flex align-items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              class="text-color mr-2"
            >
              <path
                fill="currentColor"
                d="M2 7H4.5V17H3V8.5H2M22 7V16H14V17H7V16H6V7M10 9H8V12H10M13 9H11V12H13M20 9H15V14H20V9Z"
              />
            </svg>
            <div>
              <p class="text-base font-bold mb-0">{{ $t('RAM') }}</p>
              <p class="text-base font-normal mb-0">
                {{ $t('Random access memory') }}
              </p>
            </div>
          </div>
          <table
            v-for="(memorychip, index) in record?.memorychip || []"
            :key="`memorychip_${index}`"
          >
            <tr>
              <td class="font-weight-bold">
                {{ $t('Capacity') }}
              </td>
              <td>{{ byteToStr(memorychip?.Capacity) }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('Clock frequency') }}
              </td>
              <td>{{ memorychip?.Speed || '-' }} MHz</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('Manufacturer') }}
              </td>
              <td>{{ memorychip?.Manufacturer || '-' }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('Description') }}
              </td>
              <td>{{ memorychip?.Description || '-' }}</td>
            </tr>
          </table>
        </div>

        <div class="my-2 mx-2">
          <div class="flex align-items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              class="text-color mr-2"
            >
              <path
                fill="currentColor"
                d="M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M12,4A6,6 0 0,0 6,10C6,13.31 8.69,16 12.1,16L11.22,13.77C10.95,13.29 11.11,12.68 11.59,12.4L12.45,11.9C12.93,11.63 13.54,11.79 13.82,12.27L15.74,14.69C17.12,13.59 18,11.9 18,10A6,6 0 0,0 12,4M12,9A1,1 0 0,1 13,10A1,1 0 0,1 12,11A1,1 0 0,1 11,10A1,1 0 0,1 12,9M7,18A1,1 0 0,0 6,19A1,1 0 0,0 7,20A1,1 0 0,0 8,19A1,1 0 0,0 7,18M12.09,13.27L14.58,19.58L17.17,18.08L12.95,12.77L12.09,13.27Z"
              />
            </svg>
            <div>
              <p class="text-base font-bold mb-0">{{ $t('HDD') }}</p>
              <p class="text-base font-normal mb-0">
                {{ $t('Number of harddisk') }} :
                {{ record?.diskdrive?.length || '-' }}
              </p>
            </div>
          </div>
          <table v-for="(diskdrive, index) in record?.diskdrive || []" :key="`diskdrive_${index}`">
            <tr>
              <td class="font-weight-bold">
                {{ $t('Type') }}
              </td>
              <td>{{ diskdrive?.Description || '-' }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('Description') }}
              </td>
              <td>{{ diskdrive?.Caption || '-' }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('Capacity') }}
              </td>
              <td>{{ byteToStr(diskdrive?.Size) }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('Serial number') }}
              </td>
              <td>{{ diskdrive?.SerialNumber || '-' }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                {{ $t('Manufacturer') }}
              </td>
              <td>{{ diskdrive?.Manufacturer || '-' }}</td>
            </tr>
          </table>
        </div>

        <div class="my-2 mx-2">
          <div class="flex align-items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              class="text-color mr-2"
            >
              <path
                fill="currentColor"
                d="M18,3H6V7H18M19,12A1,1 0 0,1 18,11A1,1 0 0,1 19,10A1,1 0 0,1 20,11A1,1 0 0,1 19,12M16,19H8V14H16M19,8H5A3,3 0 0,0 2,11V17H6V21H18V17H22V11A3,3 0 0,0 19,8Z"
              />
            </svg>
            <div>
              <p class="text-base font-bold mb-0">{{ $t('Printers') }}</p>
              <p class="text-base font-normal mb-0">
                {{ $t('Number of printers') }} :
                {{ record?.printer?.length || '-' }}
              </p>
            </div>
          </div>

          <table>
            <tr v-for="(printer, index) in record?.printer || []" :key="`printer_${index}`">
              <td class="font-weight-bold">
                {{ $t('Name') }}
              </td>
              <td>{{ printer?.Name || '-' }}</td>
            </tr>
          </table>
        </div>

        <div class="my-2 mx-2">
          <div class="flex align-items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              class="text-color mr-2"
            >
              <path
                fill="currentColor"
                d="M13.07 10.41A5 5 0 0 0 13.07 4.59A3.39 3.39 0 0 1 15 4A3.5 3.5 0 0 1 15 11A3.39 3.39 0 0 1 13.07 10.41M5.5 7.5A3.5 3.5 0 1 1 9 11A3.5 3.5 0 0 1 5.5 7.5M7.5 7.5A1.5 1.5 0 1 0 9 6A1.5 1.5 0 0 0 7.5 7.5M16 17V19H2V17S2 13 9 13 16 17 16 17M14 17C13.86 16.22 12.67 15 9 15S4.07 16.31 4 17M15.95 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13Z"
              />
            </svg>
            <div>
              <p class="text-base font-bold mb-0">{{ $t('Local users') }}</p>
              <p class="text-base font-normal mb-0">
                {{ $t('Number of users') }} :
                {{ record?.useraccount?.length || '-' }}
              </p>
              <p class="text-base font-normal mb-0">
                <i class="pi pi-bookmark-fill text-orange-500" />
                {{ $t('Account have administrator rights') }}
              </p>
            </div>
          </div>
          <table>
            <tr>
              <th></th>
              <th>{{ $t('Name') }}</th>
              <th>{{ $t('Description') }}</th>
              <th>{{ $t('Status') }}</th>
            </tr>
            <tr v-for="(user, index) in record?.useraccount || []" :key="`user_${index}`">
              <td>
                <i
                  class="pi pi-bookmark-fill text-orange-500"
                  v-if="record?.useradmin?.includes(user.Name)"
                />
              </td>
              <td>{{ user?.Name || '-' }}</td>
              <td width="50%">{{ user?.Description || '-' }}</td>
              <td>
                <Chip
                  class="surface-hover"
                  :label="user?.Disabled ? $t('Off') : $t('On')"
                  :class="
                    user?.Disabled
                      ? 'text-color-secondary'
                      : 'text-green-500 border-green-500 font-bold'
                  "
                />
              </td>
            </tr>
          </table>
        </div>

        <div class="my-2 mx-2">
          <div class="flex align-items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              class="text-color mr-2"
            >
              <path
                fill="currentColor"
                d="M16,20H20V16H16M16,14H20V10H16M10,8H14V4H10M16,8H20V4H16M10,14H14V10H10M4,14H8V10H4M4,20H8V16H4M10,20H14V16H10M4,8H8V4H4V8Z"
              />
            </svg>
            <div>
              <p class="text-base font-bold mb-0">{{ $t('Installed apps') }}</p>
              <p class="text-base font-normal mb-0">
                {{ $t('Number of applications') }} :
                {{ record?.product?.length || '-' }}
              </p>
              <p class="text-base font-normal mb-0">
                <i class="pi pi-bookmark-fill text-orange-500" />
                {{ $t('Unwanted software') }}
              </p>
            </div>
          </div>
          <table>
            <tr>
              <th></th>
              <th class="text-uppercase">{{ $t('Name') }}</th>
              <th class="text-uppercase">{{ $t('Publisher') }}</th>
              <th class="text-uppercase">{{ $t('Version') }}</th>
              <th class="text-uppercase">
                {{ $t('Install date') }}
              </th>
            </tr>
            <tr v-for="(product, index) in record?.product || []" :key="`product_${index}`">
              <td>
                <i
                  class="pi pi-bookmark-fill text-orange-500"
                  v-if="product?.Name === 'software'"
                />
              </td>
              <td width="50%">{{ product?.Name || '-' }}</td>
              <td>{{ product?.Vendor || '-' }}</td>
              <td>{{ product?.Version || '-' }}</td>
              <td>{{ strToDate(product?.InstallDate) }}</td>
            </tr>
          </table>
        </div>

        <div class="my-2 mx-2">
          <div class="flex align-items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="40"
              height="40"
              class="text-color mr-2"
            >
              <path
                fill="currentColor"
                d="M19,17H11V16C11,14.67 13.67,14 15,14C16.33,14 19,14.67 19,16M15,9A2,2 0 0,1 17,11A2,2 0 0,1 15,13A2,2 0 0,1 13,11C13,9.89 13.9,9 15,9M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z"
              />
            </svg>
            <div>
              <p class="text-base font-bold mb-0">{{ $t('Shared resources') }}</p>
              <p class="text-base font-normal mb-0">
                {{ $t('Number of resources') }} :
                {{ record?.share?.length || '-' }}
              </p>
              <p class="text-base font-normal mb-0">
                <i class="pi pi-bookmark-fill text-orange-500" />
                {{ $t('Shared resources') }}
              </p>
            </div>
          </div>
          <table>
            <tr>
              <th></th>
              <th>{{ $t('Name') }}</th>
              <th>{{ $t('Path') }}</th>
              <th>{{ $t('Description') }}</th>
            </tr>
            <tr v-for="(share, index) in record?.share || []" :key="`share_${index}`">
              <td>
                <i class="pi pi-bookmark-fill text-orange-500" v-if="share?.Type === 0" />
              </td>
              <td>{{ share?.Name || '-' }}</td>
              <td width="50%">{{ share?.Path || '-' }}</td>
              <td>{{ share?.Description || '-' }}</td>
            </tr>
          </table>
        </div>
      </div>
      <ScrollTop target="parent" :threshold="400" behavior="smooth" />
    </template>

    <template #footer>
      <Button text plain icon="pi pi-times" :label="$t('Close')" @click="onClose" />
      <Button text plain icon="pi pi-check" :label="$t('Save')" @click="onSaveReport" />
    </template>
  </Dialog>
</template>

<style scoped>
.p-scrolltop.p-link {
  background: var(--primary-color);
}

table {
  width: 100%;
  border: 15px solid transparent;
  border-top: 5px solid transparent;
  border-collapse: collapse;
}

th {
  font-size: 14px;
  font-weight: bold;
  padding: 5px;
  border: none;
  text-align: left;
  background: transparent;
  text-transform: uppercase;
}

td {
  font-size: 12px;
  padding: 3px;
  border: none;
}

td,
th {
  border-bottom: 1px solid var(--surface-100);
}
</style>
