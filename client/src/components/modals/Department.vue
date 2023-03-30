<script setup>
import { ref, computed, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useDepartment } from '@/stores/restfullapi';

const { t } = useI18n();
const toast = useToast();
const store = useDepartment();

const { record } = storeToRefs(store);

const props = defineProps(['show']);
const emit = defineEmits(['update:show']);

const show = computed({
  get() {
    return props.show;
  },
  set(value) {
    emit('update:show', value);
  }
});

const rules = {
  title: { required }
};

const menu = ref();
const records = ref([]);
const options = ref([
  {
    label: t('New record'),
    icon: 'pi pi-plus-circle',
    command: async () => await onCreateRecord()
  },
  {
    label: t('Delete record'),
    icon: 'pi pi-trash',
    command: async () => await onRemoveRecord()
  },
  {
    label: t('Update records'),
    icon: 'pi pi-sync',
    command: async () => await onUpdateRecords()
  }
]);

const $v = useVuelidate(rules, record);

const toggle = (event) => {
  menu.value.toggle(event);
};

const onRecords = async () => {
  try {
    records.value = await store.findAll();
  } catch (err) {
    toast.add({
      severity: 'warn',
      summary: t('HD Warning'),
      detail: t('Records not found'),
      life: 3000
    });
  }
};

const onCreateRecord = async () => {
  store.$reset();
  toast.add({
    severity: 'success',
    summary: t('HD Information'),
    detail: t('Input new record'),
    life: 3000
  });
};

const onRemoveRecord = async () => {
  if (store?.record?.id) {
    await store.removeOne(store.record);
    store.$reset();
    await onRecords();
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

const onUpdateRecords = async () => {
  store.$reset();
  await onRecords();
  toast.add({
    severity: 'success',
    summary: t('HD Information'),
    detail: t('Records is updated'),
    life: 3000
  });
};

const onSaveUpdaterRecord = async () => {
  const valid = await $v.value.$validate();
  if (valid) {
    if (store?.record?.id) {
      await store.updateOne(store.record);
      toast.add({
        severity: 'success',
        summary: t('HD Information'),
        detail: t('Record is updated'),
        life: 3000
      });
    } else {
      await store.createOne(store.record);
      toast.add({
        severity: 'success',
        summary: t('HD Information'),
        detail: t('Record is created'),
        life: 3000
      });
    }
    show.value = false;
  } else {
    toast.add({
      severity: 'warn',
      summary: t('HD Warning'),
      detail: t('Fill in all required fields'),
      life: 3000
    });
  }
};

watchEffect(async () => {
  if (show.value) {
    await onRecords();
  } else {
    store.$reset();
    $v.value.$reset();
  }
});
</script>

<template>
  <Menu ref="menu" popup :model="options" />

  <Dialog
    modal
    closable
    :draggable="false"
    v-model:visible="show"
    :style="{ width: '480px' }"
    class="p-fluid"
  >
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-building text-6xl mr-3"></i>
          <div>
            <p class="text-lg font-bold line-height-2 mb-0">{{ $t('Department') }}</p>
            <p class="text-base font-normal line-height-2 text-color-secondary mb-0">
              {{ store?.record?.id ? $t('Edit current record') : $t('Create new record') }}
            </p>
            <small class="font-normal line-height-2 text-color-secondary">
              {{ t('Departments from database') }}
            </small>
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
            @click="toggle"
          />
        </div>
      </div>
    </template>

    <div class="field">
      <Dropdown
        filter
        autofocus
        optionLabel="title"
        v-model="store.record"
        :options="records"
        :filterPlaceholder="$t('Search in list')"
        :placeholder="$t('Search in database')"
        class="w-full"
      />
    </div>

    <Divider type="solid" class="my-4" />

    <form @submit.prevent="onSaveUpdaterRecord" class="p-fluid">
      <div class="field">
        <label for="title">{{ $t('Department name') }}</label>
        <InputText
          id="title"
          v-model.trim="record.title"
          :placeholder="$t('Department name')"
          :class="{ 'p-invalid': !!$v.title.$errors.length }"
        />

        <small class="p-error" v-for="error in $v.title.$errors" :key="error.$uid">
          {{ $t(error.$message) }}
        </small>
      </div>

      <div class="field">
        <label for="address">{{ $t('Department address') }}</label>
        <InputText
          id="address"
          v-model.trim="record.address"
          :placeholder="$t('Department address')"
        />
      </div>

      <div class="field">
        <label for="comment">{{ $t('Department comment') }}</label>
        <Textarea
          rows="5"
          id="comment"
          class="min-w-full"
          v-model.trim="record.comment"
          :placeholder="$t('Department comment')"
        />
      </div>
    </form>

    <template #footer>
      <Button text plain icon="pi pi-times" :label="$t('Cancel')" @click="show = !show" />
      <Button text plain icon="pi pi-check" :label="$t('Save')" @click="onSaveUpdaterRecord" />
    </template>
  </Dialog>
</template>
