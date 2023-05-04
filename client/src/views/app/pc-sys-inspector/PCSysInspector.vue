<script setup>
import { onMounted, ref } from 'vue';
import { useStatistic } from '@/stores/restfullapi';
import { dateToStr } from '@/service/DataFilters';

const API = useStatistic();

const stats = ref({});
const currentDate = ref();
const statusChart = ref(null);

const basicOptions = ref({
  plugins: {
    legend: {
      labels: {
        color: '#495057'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff'
      },
      grid: {
        color: '#333333'
      }
    },
    y: {
      ticks: {
        color: '#ffffff'
      },
      grid: {
        color: '#333333'
      }
    }
  }
});

onMounted(async () => {
  stats.value = await API.inspector();
  currentDate.value = dateToStr(Date.now());

  statusChart.value = {
    labels: ['Ok', 'Users', 'Products', 'Shares'],
    datasets: [
      {
        type: 'pie',
        label: '# of Votes',
        backgroundColor: '#42A5F5',
        data: [
          stats.value.count - stats.value.share - stats.value.product - stats.value.useraccount,
          stats.value.useraccount,
          stats.value.product,
          stats.value.share
        ],
        backgroundColor: ['#4caf50', '#fb8c00', '#fb8c00', '#fb8c00']
      }
    ]
  };
});
</script>

<template>
  <div className="col-12">
    <div class="flex align-content-center mb-4">
      <div class="flex align-items-center justify-content-center mr-2">
        <AppIcons :name="$route?.name" :size="42" />
      </div>
      <div>
        <h5 class="text-sm text-color-secondary m-0">
          {{ $t($route?.meta?.title) }}
        </h5>
        <h3 class="m-0">{{ $t($route?.meta?.description) }}</h3>
      </div>
    </div>

    <div class="grid w-full">
      <div class="col-12 lg:col-6 xl:col-4">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">
                {{ $t('Total number of reports') }}
              </span>
              <div class="text-900 font-medium text-xl">{{ stats?.count || '-' }}</div>
            </div>
            <div
              class="flex align-items-center justify-content-center bg-green-100 border-round w-3rem h-3rem p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>monitor-cellphone</title>
                <path
                  d="M23,11H18A1,1 0 0,0 17,12V21A1,1 0 0,0 18,22H23A1,1 0 0,0 24,21V12A1,1 0 0,0 23,11M23,20H18V13H23V20M20,2H2C0.89,2 0,2.89 0,4V16A2,2 0 0,0 2,18H9V20H7V22H15V20H13V18H15V16H2V4H20V9H22V4C22,2.89 21.1,2 20,2Z"
                />
              </svg>
            </div>
          </div>
          <span class="text-green-500 font-medium mr-2">{{ $t('Actual on') }}</span>
          <span class="text-500">{{ currentDate }}</span>
        </div>
      </div>

      <div class="col-12 lg:col-6 xl:col-4">
        <div class="card mb-0 border-green-500">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">
                {{ $t('Total number of success') }}
              </span>
              <div class="text-900 font-medium text-xl">
                {{ stats?.count - stats?.share - stats?.product - stats?.useraccount || '-' }}
              </div>
            </div>
            <div
              class="flex align-items-center justify-content-center bg-green-500 border-round w-3rem h-3rem p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>check-outline</title>
                <path
                  d="M19.78,2.2L24,6.42L8.44,22L0,13.55L4.22,9.33L8.44,13.55L19.78,2.2M19.78,5L8.44,16.36L4.22,12.19L2.81,13.55L8.44,19.17L21.19,6.42L19.78,5Z"
                />
              </svg>
            </div>
          </div>
          <span class="text-green-500 font-medium mr-2">{{ $t('Actual on') }}</span>
          <span class="text-500">{{ currentDate }}</span>
        </div>
      </div>

      <div class="col-12 lg:col-6 xl:col-4">
        <div class="card mb-0 border-orange-500">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">
                {{ $t('Total number of warnings') }}
              </span>
              <div class="text-900 font-medium text-xl">
                {{ stats?.share + stats?.product + stats?.useraccount || '-' }}
              </div>
            </div>
            <div
              class="flex align-items-center justify-content-center bg-orange-500 border-round w-3rem h-3rem p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>alert-octagon-outline</title>
                <path
                  d="M8.27,3L3,8.27V15.73L8.27,21H15.73C17.5,19.24 21,15.73 21,15.73V8.27L15.73,3M9.1,5H14.9L19,9.1V14.9L14.9,19H9.1L5,14.9V9.1M11,15H13V17H11V15M11,7H13V13H11V7"
                />
              </svg>
            </div>
          </div>
          <span class="text-green-500 font-medium mr-2">{{ $t('Actual on') }}</span>
          <span class="text-500">{{ currentDate }}</span>
        </div>
      </div>

      <div class="col-12 lg:col-6 xl:col-4">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">{{ $t('Administrator rights') }}</span>
              <div class="text-900 font-medium text-xl">{{ stats?.useraccount || '-' }}</div>
            </div>
            <div
              class="flex align-items-center justify-content-center bg-orange-300 border-round w-3rem h-3rem p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>account-key-outline</title>
                <path
                  d="M5.8 10C5.4 8.8 4.3 8 3 8C1.3 8 0 9.3 0 11S1.3 14 3 14C4.3 14 5.4 13.2 5.8 12H7V14H9V12H11V10H5.8M3 12C2.4 12 2 11.6 2 11S2.4 10 3 10 4 10.4 4 11 3.6 12 3 12M16 4C13.8 4 12 5.8 12 8S13.8 12 16 12 20 10.2 20 8 18.2 4 16 4M16 10.1C14.8 10.1 13.9 9.2 13.9 8C13.9 6.8 14.8 5.9 16 5.9C17.2 5.9 18.1 6.8 18.1 8S17.2 10.1 16 10.1M16 13C13.3 13 8 14.3 8 17V20H24V17C24 14.3 18.7 13 16 13M22.1 18.1H9.9V17C9.9 16.4 13 14.9 16 14.9C19 14.9 22.1 16.4 22.1 17V18.1Z"
                />
              </svg>
            </div>
          </div>
          <span class="text-green-500 font-medium mr-2">{{ $t('Actual on') }}</span>
          <span class="text-500">{{ currentDate }}</span>
        </div>
      </div>

      <div class="col-12 lg:col-6 xl:col-4">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">{{ $t('Unwanted software') }}</span>
              <div class="text-900 font-medium text-xl">{{ stats?.product || '-' }}</div>
            </div>
            <div
              class="flex align-items-center justify-content-center bg-orange-300 border-round w-3rem h-3rem p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>microsoft</title>
                <path d="M2,3H11V12H2V3M11,22H2V13H11V22M21,3V12H12V3H21M21,22H12V13H21V22Z" />
              </svg>
            </div>
          </div>
          <span class="text-green-500 font-medium mr-2">{{ $t('Actual on') }}</span>
          <span class="text-500">{{ currentDate }}</span>
        </div>
      </div>

      <div class="col-12 lg:col-6 xl:col-4">
        <div class="card mb-0">
          <div class="flex justify-content-between mb-3">
            <div>
              <span class="block text-500 font-medium mb-3">{{ $t('Shared resources') }}</span>
              <div class="text-900 font-medium text-xl">{{ stats?.share || '-' }}</div>
            </div>
            <div
              class="flex align-items-center justify-content-center bg-orange-300 border-round w-3rem h-3rem p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>folder-network-outline</title>
                <path
                  d="M15 20C15 19.45 14.55 19 14 19H13V17H19C20.11 17 21 16.11 21 15V7C21 5.9 20.11 5 19 5H13L11 3H5C3.9 3 3 3.9 3 5V15C3 16.11 3.9 17 5 17H11V19H10C9.45 19 9 19.45 9 20H2V22H9C9 22.55 9.45 23 10 23H14C14.55 23 15 22.55 15 22H22V20H15M5 15V7H19V15H5Z"
                />
              </svg>
            </div>
          </div>
          <span class="text-green-500 font-medium mr-2">{{ $t('Actual on') }}</span>
          <span class="text-500">{{ currentDate }}</span>
        </div>
      </div>

      <div class="col-12 xl:col-6">
        <div class="card">
          <div class="flex justify-content-between align-items-center mb-5">
            <div class="flex justify-content-start gap-2 align-items-center">
              <i class="pi pi-history mr-2" style="font-size: 1.5rem"></i>
              <h5 class="my-0">{{ $t('Report date') }}</h5>
            </div>

            <div>
              <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" />
            </div>
          </div>

          <ul class="list-none p-0 m-0 overflow-auto" style="height: 255px">
            <li
              v-for="(item, index) of stats.days"
              :key="index"
              class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
            >
              <div>
                <span class="text-900 font-medium mr-2 mb-1 md:mb-0">
                  {{ Math.round(item.days) }} {{ $t('days') }} :
                </span>
                <div class="mt-1 text-600">{{ $t('comment') }}</div>
              </div>
              <div class="mt-2 md:mt-0 flex align-items-center">
                <div
                  class="surface-300 border-round overflow-hidden w-12rem lg:w-6rem mr-4"
                  style="height: 8px"
                >
                  <div class="bg-yellow-300 h-full" :style="`width: 50px`"></div>
                </div>
                <span class="text-yellow-500 font-medium w-6rem"> {{ item.count }} {{ $t('reports') }} </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="col-12 xl:col-6">
        <div class="card">
          <h5>{{ $t('PC Statuses') }}</h5>
          <Chart type="pie" :data="statusChart" :options="basicOptions" />
        </div>
      </div>
    </div>
  </div>
</template>