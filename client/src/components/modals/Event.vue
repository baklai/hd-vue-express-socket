<script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, ipAddress } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useIPAddress } from '@/stores/restfullapi';

const { t } = useI18n();
const toast = useToast();
const store = useIPAddress();

const visible = ref(false);
const record = ref({});

defineExpose({
  toggle: async ({ id }) => {
    try {
      if (id) record.value = await store.findOne({ id, populate: false });
      else record.value = store.$init();
      visible.value = true;
    } catch (err) {
      visible.value = false;
      $v.value.$reset();
      toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t(err.message), life: 3000 });
    }
  }
});

const refMenu = ref();

const options = ref([
  {
    label: t('New record'),
    icon: 'pi pi-plus-circle',
    command: async () => await onCreateRecord()
  },
  {
    label: t('Save record'),
    icon: 'pi pi-save',
    command: async () => await onSaveOrUpdate()
  },
  {
    label: t('Delete record'),
    icon: 'pi pi-trash',
    command: async () => await onRemoveRecord()
  }
]);

const editingEmails = ref([]);

const $v = useVuelidate(
  {
    title: { required },
    date: { required },
    href: { required },
    comment: { required }
  },
  record
);

const toggleMenu = (event) => {
  refMenu.value.toggle(event);
};

const onClose = () => {
  visible.value = false;
  $v.value.$reset();
};

const onRecord = async (id) => {
  try {
    record.value = await store.findOne({ id, populate: false });
  } catch (err) {
    toast.add({
      severity: 'warn',
      summary: t('HD Warning'),
      detail: t('Record not found'),
      life: 3000
    });
  }
};

const onCreateRecord = async () => {
  record.value = store.$init();
  toast.add({
    severity: 'success',
    summary: t('HD Information'),
    detail: t('Input new record'),
    life: 3000
  });
};

const onRemoveRecord = async () => {
  if (record.value?.id) {
    await store.removeOne(record.value);
    visible.value = false;
    $v.value.$reset();
    toast.add({
      severity: 'success',
      summary: t('HD Information'),
      detail: t('Record is removed'),
      life: 3000
    });
  } else {
    toast.add({
      severity: 'warn',
      summary: t('HD Warning'),
      detail: t('Record not selected'),
      life: 3000
    });
  }
};

const onSaveOrUpdate = async () => {
  console.log(record.value);
  const valid = await $v.value.$validate();
  if (valid) {
    if (record.value?.id) {
      await store.updateOne(record.value);
      toast.add({
        severity: 'success',
        summary: t('HD Information'),
        detail: t('Record is updated'),
        life: 3000
      });
    } else {
      await store.createOne(record.value);
      toast.add({
        severity: 'success',
        summary: t('HD Information'),
        detail: t('Record is created'),
        life: 3000
      });
    }
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

  <Dialog modal :closable="false" :draggable="false" :visible="visible" :style="{ width: '800px' }" class="p-fluid">
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
            class="mx-1"
            icon="pi pi-ellipsis-v"
            v-tooltip.bottom="$t('Options menu')"
            @click="toggleMenu"
          />
          <Button text plain rounded class="mx-1" icon="pi pi-times" v-tooltip.bottom="$t('Close')" @click="onClose" />
        </div>
      </div>
    </template>

    <form @submit.prevent="onSaveOrUpdate">
      <div class="field">
        <label for="title" class="font-bold">{{ $t('Title event') }}</label>
        <InputText
          id="title"
          aria-describedby="title-help"
          v-model.trim="record.name"
          :placeholder="$t('Title event')"
          :class="{ 'p-invalid': !!$v.title.$errors.length }"
        />
        <small id="title-help" class="p-error" v-for="error in $v.title.$errors" :key="error.$uid">
          {{ $t(error.$message) }}
        </small>
      </div>

      <div class="field">
        <label for="date" class="font-bold">{{ $t('Date of event') }}</label>
        <Calendar
          id="date"
          showIcon
          showButtonBar
          dateFormat="dd.mm.yy"
          aria-describedby="date-help"
          v-model.trim="record.date"
          :placeholder="$t('Date of event')"
          :class="{ 'p-invalid': !!$v.date.$errors.length }"
        />
        <small id="date-help" class="p-error" v-for="error in $v.date.$errors" :key="error.$uid">
          {{ $t(error.$message) }}
        </small>
      </div>

      <div class="field">
        <label for="href" class="font-bold">{{ $t('Event url') }}</label>
        <InputText
          id="href"
          aria-describedby="href-help"
          v-model.trim="record.name"
          :placeholder="$t('Event url')"
          :class="{ 'p-invalid': !!$v.href.$errors.length }"
        />
        <small id="href-help" class="p-error" v-for="error in $v.href.$errors" :key="error.$uid">
          {{ $t(error.$message) }}
        </small>
      </div>

      <div class="field">
        <label for="comment" class="font-bold">{{ $t('Comment') }}</label>
        <Textarea
          rows="5"
          cols="12"
          id="comment"
          aria-describedby="comment-help"
          v-model.trim="record.comment.comment"
          :placeholder="$t('Comment')"
        />

        <small id="comment-help" class="p-error" v-for="error in $v.comment.$errors" :key="error.$uid">
          {{ $t(error.$message) }}
        </small>
      </div>
    </form>

    <template #footer>
      <Button text plain icon="pi pi-times" :label="$t('Cancel')" @click="onClose" />
      <Button text plain icon="pi pi-check" :label="$t('Save')" @click="onSaveOrUpdate" />
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
