<script setup>
import { dateToStr } from '@/service/DataFilters';

defineProps({
  record: {
    type: Object,
    default: {},
    required: true
  },
  internet: {
    type: Boolean,
    default: true
  },
  email: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <div class="flex align-items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="40"
      height="40"
      class="text-color-secondary mr-2"
    >
      <path
        fill="currentColor"
        d="M19 5V19H5V5H19M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M9 7H7V17H9V7M15 7H11V17H13V13H15C16.1 13 17 12.1 17 11V9C17 7.9 16.1 7 15 7M15 11H13V9H15V11Z"
      />
    </svg>
    <div>
      <p class="text-lg mb-0">IP {{ record?.ipaddress }}</p>
      <p class="text-base font-normal">{{ $t('Date open') }} : {{ dateToStr(record?.date) }}</p>
    </div>
  </div>
  <table>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Location') }} :</td>
      <td>{{ record?.location?.title || '-' }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Unit') }} :</td>
      <td>{{ record?.unit?.title || '-' }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('IP Address') }} :</td>
      <td>{{ record?.ipaddress }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Mask') }} :</td>
      <td>{{ record?.mask }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Gateway') }} :</td>
      <td>{{ record?.gateway }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('№ Mail') }} :</td>
      <td>{{ record?.mail }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Company') }} :</td>
      <td>{{ record?.company?.title || '-' }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Branch') }} :</td>
      <td>{{ record?.branch?.title || '-' }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Enterprise') }} :</td>
      <td>{{ record?.enterprise?.title || '-' }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Department') }} :</td>
      <td>{{ record?.department?.title || '-' }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Fullname') }} :</td>
      <td>{{ record?.fullname }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Position') }} :</td>
      <td>{{ record?.position?.title || '-' }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Phone') }} :</td>
      <td>{{ record?.phone }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Autoanswer') }} :</td>
      <td>{{ record?.autoanswer }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Date open') }} :</td>
      <td>{{ dateToStr(record?.date) }}</td>
    </tr>
    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Comment') }} :</td>
      <td>{{ record?.comment }}</td>
    </tr>

    <tr>
      <td class="font-weight-bold" width="50%">{{ $t('Internet') }} :</td>
      <td>
        <i :class="record?.status?.internet ? 'pi pi-check font-bold text-green-500' : 'pi pi-ban'" />
      </td>
    </tr>

    <tr>
      <td class="font-weight-bold" width="40%">{{ $t('E-mail') }} :</td>
      <td>
        <i :class="record?.status?.email ? 'pi pi-check font-bold text-green-500' : 'pi pi-ban'" />
      </td>
    </tr>
  </table>

  <div v-if="internet">
    <h5>{{ $t('Internet') }}</h5>
    <table>
      <tr>
        <td class="font-weight-bold" width="40%">{{ $t('№ Mail') }} :</td>
        <td>{{ record?.internet?.mail }}</td>
      </tr>
      <tr>
        <td class="font-weight-bold" width="40%">{{ $t('Date open') }} :</td>
        <td>{{ dateToStr(record?.internet?.dateOpen) }}</td>
      </tr>
      <tr>
        <td class="font-weight-bold" width="40%">{{ $t('Date close') }} :</td>
        <td>{{ dateToStr(record?.internet?.dateClose) }}</td>
      </tr>
      <tr>
        <td class="font-weight-bold" width="40%">{{ $t('Comment') }} :</td>
        <td>{{ record?.internet?.comment }}</td>
      </tr>
    </table>
  </div>

  <div v-if="email">
    <h5>{{ $t('E-mail') }}</h5>
    <table v-for="email in record?.email" :key="email?.login">
      <tr>
        <td class="font-weight-bold" width="40%">{{ $t('Login') }} :</td>
        <td>{{ email?.login }}</td>
      </tr>
      <tr>
        <td class="font-weight-bold" width="40%">{{ $t('Fullname') }} :</td>
        <td>{{ email?.fullname }}</td>
      </tr>
      <tr>
        <td class="font-weight-bold" width="40%">{{ $t('№ Mail') }} :</td>
        <td>{{ email?.mail }}</td>
      </tr>
      <tr>
        <td class="font-weight-bold" width="40%">{{ $t('Date open') }} :</td>
        <td>{{ dateToStr(email?.dateOpen) }}</td>
      </tr>
      <tr>
        <td class="font-weight-bold" width="40%">{{ $t('Date close') }} :</td>
        <td>{{ dateToStr(email?.dateClose) }}</td>
      </tr>
      <tr>
        <td class="font-weight-bold" width="40%">{{ $t('Comment') }} :</td>
        <td>{{ email?.comment }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border: 15px solid transparent;
  border-top: 5px solid transparent;
  border-collapse: collapse;
}

td,
th {
  font-size: 14px;
  border-bottom: 1px solid var(--surface-border);
}

th {
  font-weight: bold;
  text-align: left;
  background: transparent;
  text-transform: uppercase;
  padding: 5px;
}

td {
  padding: 3px;
}
</style>
