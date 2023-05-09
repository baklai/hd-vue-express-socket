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

const menu = ref();

const items = ref([
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

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <Menu ref="menu" id="dbtables_menu" :model="items" :popup="true" />

  <Button
    text
    plain
    rounded
    aria-haspopup="true"
    aria-controls="dbtables_menu"
    icon="pi pi-database"
    iconClass="text-2xl"
    class="p-button-lg hover:text-color h-3rem w-3rem"
    v-tooltip.bottom="$t('DB Tables')"
    @click="toggle"
  />

  <DBСompany v-model:show="tableСompany" />
  <DBBranch v-model:show="tableBranch" />
  <DBEnterprise v-model:show="tableEnterprise" />
  <DBDepartment v-model:show="tableDepartment" />
  <DBLocation v-model:show="tableLocation" />
  <DBPosition v-model:show="tablePosition" />
</template>
