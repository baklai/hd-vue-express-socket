<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const emits = defineEmits({
  view: ({ id }) => {
    if (id) return true;
    return false;
  },
  create: null,
  edit: ({ id }) => {
    if (id) return true;
    return false;
  },
  delete: ({ id }) => {
    if (id) return true;
    return false;
  }
});

defineExpose({
  toggle: (event, data) => {
    record.value = data;
    refMenu.value.toggle(event);
  }
});

const record = ref({});

const refMenu = ref();
const options = ref([
  {
    label: t('View record'),
    icon: 'pi pi-eye',
    command: () => emits('view', record.value)
  },
  {
    label: t('Create record'),
    icon: 'pi pi-plus-circle',
    command: () => emits('create', {})
  },
  {
    label: t('Edit record'),
    icon: 'pi pi-file-edit',
    command: () => emits('edit', record.value)
  },
  {
    label: t('Delete record'),
    icon: 'pi pi-trash',
    command: () => emits('delete', record.value)
  }
]);
</script>

<template>
  <Menu ref="refMenu" popup :model="options" />
</template>
