<script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useEvent } from '@/stores/api/event';

import { dateTimeToStr } from '@/service/DataFilters';

const { t } = useI18n();
const toast = useToast();
const Event = useEvent();

const emits = defineEmits(['close']);

defineExpose({
  toggle: async ({ id }) => {
    try {
      if (id) record.value = await Event.findOne({ id });
      else record.value = Event.$reset();
      visible.value = true;
    } catch (err) {
      visible.value = false;
      record.value = Event.$reset();
      $validate.value.$reset();
      toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t(err.message), life: 3000 });
    }
  }
});

const visible = ref(false);

const refMenu = ref();
const options = ref([
  {
    label: t('Create record'),
    icon: 'pi pi-plus-circle',
    command: async () => await onCreateRecord()
  },
  {
    label: t('Save record'),
    icon: 'pi pi-save',
    command: async () => await onSaveRecord()
  },
  {
    label: t('Delete record'),
    icon: 'pi pi-trash',
    command: async () => await onRemoveRecord()
  }
]);

const record = ref({});
const $validate = useVuelidate(
  {
    title: { required },
    datetime: { required },
    description: { required }
  },
  record
);

const onClose = () => {
  visible.value = false;
  $validate.value.$reset();
  record.value = Event.$reset();
  emits('close', {});
};

const onCreateRecord = async () => {
  record.value = Event.$reset();
  $validate.value.$reset();
  toast.add({
    severity: 'success',
    summary: t('HD Information'),
    detail: t('Input new record'),
    life: 3000
  });
};

const onRemoveRecord = async () => {
  if (record.value?.id) {
    await Event.removeOne(record.value);
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

const onSaveRecord = async () => {
  const valid = await $validate.value.$validate();
  if (valid) {
    if (record.value?.id) {
      await Event.updateOne(record.value);
      toast.add({
        severity: 'success',
        summary: t('HD Information'),
        detail: t('Record is updated'),
        life: 3000
      });
    } else {
      await Event.createOne(record.value);
      toast.add({
        severity: 'success',
        summary: t('HD Information'),
        detail: t('Record is created'),
        life: 3000
      });
    }
    onClose();
  } else {
    toast.add({
      severity: 'warn',
      summary: t('HD Warning'),
      detail: t('Fill in all required fields'),
      life: 3000
    });
  }
};
</script>

<template>
  <Menu ref="refMenu" popup :model="options" />

  <Dialog
    modal
    closable
    :draggable="false"
    v-model:visible="visible"
    :style="{ width: '400px' }"
    class="p-fluid"
    @hide="onClose"
  >
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex align-items-center justify-content-center">
          <AppIcons name="calendar-events" :size="40" class="mr-2" />
          <div>
            <p class="text-lg font-bold line-height-2 mb-0">{{ $t('Calendar event') }}</p>
            <p class="text-base font-normal line-height-2 text-color-secondary mb-0">
              {{ record?.id ? $t('Edit current record') : $t('Create new record') }}
            </p>
          </div>
        </div>
        <div class="flex gap-2 align-items-center">
          <Button
            text
            plain
            rounded
            class="mx-2"
            icon="pi pi-ellipsis-v"
            v-tooltip.bottom="$t('Options menu')"
            @click="(event) => refMenu.toggle(event)"
          />
        </div>
      </div>
    </template>

    <form @submit.prevent="onSaveRecord">
      <div class="field">
        <label for="title" class="font-bold">{{ $t('Title event') }}</label>
        <InputText
          id="title"
          aria-describedby="title-help"
          v-model="record.title"
          :placeholder="$t('Title event')"
          :class="{ 'p-invalid': !!$validate.title.$errors.length }"
        />
        <small
          id="title-help"
          class="p-error"
          v-for="error in $validate.title.$errors"
          :key="error.$uid"
        >
          {{ $t(error.$message) }}
        </small>
      </div>

      <div class="field">
        <label for="datetime" class="font-bold">{{ $t('Datetime of event') }}</label>
        <Calendar
          id="datetime"
          showIcon
          showTime
          showButtonBar
          dateFormat="dd.mm.yy"
          hourFormat="24"
          aria-describedby="datetime-help"
          :modelValue="dateTimeToStr(record.datetime)"
          v-model="record.datetime"
          :placeholder="$t('Datetime of event')"
          :class="{ 'p-invalid': !!$validate.datetime.$errors.length }"
        />
        <small
          id="datetime-help"
          class="p-error"
          v-for="error in $validate.datetime.$errors"
          :key="error.$uid"
        >
          {{ $t(error.$message) }}
        </small>
      </div>

      <div class="field">
        <label for="description" class="font-bold">{{ $t('Description') }}</label>
        <Textarea
          rows="5"
          cols="12"
          id="description"
          aria-describedby="description-help"
          v-model="record.description"
          :placeholder="$t('Description')"
        />
        <small
          id="description-help"
          class="p-error"
          v-for="error in $validate.description.$errors"
          :key="error.$uid"
        >
          {{ $t(error.$message) }}
        </small>
      </div>
    </form>

    <template #footer>
      <Button text plain icon="pi pi-times" :label="$t('Cancel')" @click="onClose" />
      <Button text plain icon="pi pi-check" :label="$t('Save')" @click="onSaveRecord" />
    </template>
  </Dialog>
</template>

<style scoped>
::v-deep(.p-dropdown .p-dropdown-label.p-placeholder) {
  color: var(--surface-400);
}
::v-deep(.p-datatable .p-datatable-header) {
  background: transparent;
}

::v-deep(.p-datatable-thead) {
  display: none;
}
</style>
