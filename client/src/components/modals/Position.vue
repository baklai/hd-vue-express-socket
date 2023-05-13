<script setup>
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { usePosition } from '@/stores/api/position';

const { t } = useI18n();
const toast = useToast();
const Position = usePosition();

const emits = defineEmits(['close']);

defineExpose({
  toggle: async ({ id }) => {
    try {
      if (id) await Position.findOne({ id });
      else Position.$init();
      visible.value = true;
    } catch (err) {
      visible.value = false;
      Position.$init();
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

const record = computed(() => Position.record);
const $validate = useVuelidate({ title: { required } }, record);

const onClose = () => {
  visible.value = false;
  $validate.value.$reset();
  Position.$init();
  emits('close', {});
};

const onRecords = async () => {
  try {
    await Position.findAll({});
  } catch (err) {
    toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t('Records not updated'), life: 3000 });
  }
};

const onCreateRecord = async () => {
  Position.$init();
  $validate.value.$reset();
  toast.add({ severity: 'success', summary: t('HD Information'), detail: t('Input new record'), life: 3000 });
};

const onRemoveRecord = async () => {
  if (Position?.record?.id) {
    await Position.removeOne(Position.record);
    toast.add({ severity: 'success', summary: t('HD Information'), detail: t('Record is removed'), life: 3000 });
    Position.$init();
    await onRecords();
  } else {
    toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t('Record not selected'), life: 3000 });
  }
};

const onUpdateRecords = async () => {
  Position.$init();
  await onRecords();
  toast.add({ severity: 'success', summary: t('HD Information'), detail: t('Records is updated'), life: 3000 });
};

const onSaveRecord = async () => {
  const valid = await $validate.value.$validate();
  if (valid) {
    if (Position?.record?.id) {
      await Position.updateOne(Position.record);
      toast.add({ severity: 'success', summary: t('HD Information'), detail: t('Record is updated'), life: 3000 });
    } else {
      await Position.createOne(Position.record);
      toast.add({ severity: 'success', summary: t('HD Information'), detail: t('Record is created'), life: 3000 });
    }
    onClose();
  } else {
    toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t('Fill in all required fields'), life: 3000 });
  }
};
</script>

<template>
  <Menu ref="refMenu" popup :model="options" />

  <Dialog
    modal
    closable
    draggable
    class="p-fluid"
    v-model:visible="visible"
    :style="{ width: '480px' }"
    @hide="onClose"
  >
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-briefcase text-6xl mr-3"></i>
          <div>
            <p class="text-lg font-bold line-height-2 mb-0">{{ $t('Position') }}</p>
            <p class="text-base font-normal line-height-2 text-color-secondary mb-0">
              {{ Position?.record?.id ? $t('Edit current record') : $t('Create new record') }}
            </p>
            <small class="font-normal line-height-2 text-color-secondary">
              {{ t('Positions from database') }}
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
            @click="(event) => refMenu.toggle(event)"
          />
        </div>
      </div>
    </template>

    <div class="field">
      <Dropdown
        filter
        autofocus
        optionLabel="title"
        v-model="Position.record"
        :options="Position.records"
        :filterPlaceholder="$t('Search in list')"
        :placeholder="$t('Search in database')"
        class="w-full"
      />
    </div>

    <Divider type="solid" class="my-4" />

    <form @submit.prevent="onSaveRecord" class="p-fluid">
      <div class="field">
        <label for="title">{{ $t('Position name') }}</label>
        <InputText
          id="title"
          v-model.trim="Position.record.title"
          :placeholder="$t('Position name')"
          :class="{ 'p-invalid': !!$validate.title.$errors.length }"
        />
        <small class="p-error" v-for="error in $validate.title.$errors" :key="error.$uid">
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
