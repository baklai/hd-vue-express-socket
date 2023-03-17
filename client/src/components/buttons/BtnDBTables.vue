<script setup>
import { ref } from 'vue';

import DBСompany from '@/components/modals/Сompany.vue';
import DBBranch from '@/components/modals/Branch.vue';
import DBEnterprise from '@/components/modals/Enterprise.vue';
import DBDepartment from '@/components/modals/Department.vue';
import DBLocation from '@/components/modals/Location.vue';
import DBPosition from '@/components/modals/Position.vue';

const tableСompany = ref(false);
const tableBranch = ref(false);
const tableEnterprise = ref(false);
const tableDepartment = ref(false);
const tableLocation = ref(false);
const tablePosition = ref(false);

const menuDTables = ref([
  {
    label: 'Company',
    icon: 'pi pi-building',
    command: () => (tableСompany.value = true)
  },
  {
    label: 'Branch',
    icon: 'pi pi-building',
    command: () => (tableBranch.value = true)
  },
  {
    label: 'Enterprise',
    icon: 'pi pi-building',
    command: () => (tableEnterprise.value = true)
  },
  {
    label: 'Department',
    icon: 'pi pi-building',
    command: () => (tableDepartment.value = true)
  },
  {
    label: 'Location',
    icon: 'pi pi-map-marker',
    command: () => (tableLocation.value = true)
  },
  {
    label: 'Position',
    icon: 'pi pi-star',
    command: () => (tablePosition.value = true)
  }
]);
</script>

<template>
  <DBСompany v-model:show="tableСompany" />
  <DBBranch v-model:show="tableBranch" />
  <DBEnterprise v-model:show="tableEnterprise" />
  <DBDepartment v-model:show="tableDepartment" />
  <DBLocation v-model:show="tableLocation" />
  <DBPosition v-model:show="tablePosition" />

  <SplitButton
    icon="pi pi-database"
    :model="menuDTables"
    :label="$t('DB Tables')"
    class="p-button-outlined sm:w-max w-full"
    :buttonProps="{ class: 'text-color-secondary' }"
    :menuButtonProps="{ class: 'text-color-secondary' }"
  />
</template>
