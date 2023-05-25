<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import DBUnsoftware from '@/components/modals/UnSoftware.vue';
import DBExaccount from '@/components/modals/ExAccount.vue';

const { t } = useI18n();

const refModalUnsoftware = ref();
const refModalExaccount = ref();

const refMenu = ref();

const items = ref([
  {
    label: t('Unwanted software'),
    items: [
      {
        label: t('Unwanted software'),
        icon: 'pi pi-microsoft',
        command: () => refModalUnsoftware.value.toggle({})
      }
    ]
  },
  {
    label: t('Exception accounts'),
    items: [
      {
        label: t('Exception accounts'),
        icon: 'pi pi-microsoft',
        command: () => refModalExaccount.value.toggle({})
      }
    ]
  }
]);
</script>

<template>
  <Menu ref="refMenu" id="dbtables_menu" :model="items" :popup="true" />

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
    @click="(event) => refMenu.toggle(event)"
  />

  <DBUnsoftware ref="refModalUnsoftware" @close="() => true" />
  <DBExaccount ref="refModalExaccount" @close="() => true" />
</template>
