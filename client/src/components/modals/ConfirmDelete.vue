<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

const { t } = useI18n();
const toast = useToast();

const props = defineProps({
  onDelete: {
    type: Function,
    default() {
      throw new Error('Remove method not installed');
    }
  }
});

defineExpose({
  toggle: (data) => {
    record.value = data;
    visible.value = true;
  }
});

const visible = ref(false);
const record = ref();

const confirmOk = async () => {
  try {
    await props.onDelete(record.value);
    toast.add({
      severity: 'success',
      summary: t('HD Information'),
      detail: t('Record deletion completed successfully'),
      life: 3000
    });
  } catch (err) {
    toast.add({ severity: 'error', summary: t('HD Error'), detail: t('Record deletion failed'), life: 3000 });
  } finally {
    visible.value = false;
  }
};

const confirmCancel = () => {
  visible.value = false;
  toast.add({
    severity: 'info',
    summary: t('HD Information'),
    detail: t('Record deletion not confirmed'),
    life: 3000
  });
};
</script>

<template>
  <div>
    <Dialog modal :header="$t('Confirm delete record')" :style="{ width: '350px' }" v-model:visible="visible">
      <div class="flex align-items-center justify-content-start confirmation-content">
        <i class="pi pi-exclamation-triangle text-yellow-500 mr-3" style="font-size: 2rem" />
        <span> {{ $t('Are you sure you want to delete this record') }}? </span>
      </div>
      <template #footer>
        <Button text :label="$t('Yes')" icon="pi pi-check" @click="confirmOk" />
        <Button text :label="$t('No')" icon="pi pi-times" @click="confirmCancel" />
      </template>
    </Dialog>
  </div>
</template>
