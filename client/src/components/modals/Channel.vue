<script setup>
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useChannel } from '@/stores/api/channel';

const { t } = useI18n();
const toast = useToast();
const Channel = useChannel();

const visible = ref(false);
const record = ref({});

defineExpose({
  toggle: async ({ id }) => {
    try {
      if (id) await Channel.findOne({ id });
      else Channel.$init();
      visible.value = true;
    } catch (err) {
      visible.value = false;
      Channel.$init();
      $validate.value.$reset();
      toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t(err.message), life: 3000 });
    }
  }
});

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
    command: async () => await onSaveOrUpdate()
  },
  {
    label: t('Delete record'),
    icon: 'pi pi-trash',
    command: async () => await onRemoveRecord()
  }
]);

const $v = useVuelidate(
  {
    locationFrom: { required },
    unitFrom: { required },
    locationTo: { required },
    unitTo: { required },
    level: { required },
    type: { required },
    speed: { required },
    status: { required },
    operator: { required },
    composition: { required }
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
    record.value = await Channel.findOne({ id });
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
  record.value = Channel.$init();
  toast.add({
    severity: 'success',
    summary: t('HD Information'),
    detail: t('Input new record'),
    life: 3000
  });
};

const onRemoveRecord = async () => {
  if (record.value?.id) {
    await Channel.removeOne(record.value);
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
      await Channel.updateOne(record.value);
      toast.add({
        severity: 'success',
        summary: t('HD Information'),
        detail: t('Record is updated'),
        life: 3000
      });
    } else {
      await Channel.createOne(record.value);
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

  <Dialog modal :closable="false" :draggable="false" :visible="visible" :style="{ width: '600px' }" class="p-fluid">
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex align-items-center justify-content-center">
          <AppIcons name="network-channels" :size="40" class="mr-2" />
          <div>
            <p class="text-lg font-bold line-height-2 mb-0">{{ $t('Network channel') }}</p>
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
      <div class="formgrid grid">
        <div class="field col">
          <div class="field">
            <label for="locationFrom" class="font-bold">{{ $t('Location start') }}</label>
            <InputText
              id="locationFrom"
              aria-describedby="locationFrom-help"
              v-model.trim="record.locationFrom"
              :placeholder="$t('Location start')"
              :class="{ 'p-invalid': !!$v.locationFrom.$errors.length }"
            />
            <small id="locationFrom-help" class="p-error" v-for="error in $v.locationFrom.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="unitFrom" class="font-bold">{{ $t('Unit start') }}</label>
            <InputText
              id="unitFrom"
              aria-describedby="unitFrom-help"
              v-model.trim="record.unitFrom"
              :placeholder="$t('Unit start')"
              :class="{ 'p-invalid': !!$v.unitFrom.$errors.length }"
            />
            <small id="unitFrom-help" class="p-error" v-for="error in $v.unitFrom.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>
        </div>

        <div class="field col">
          <div class="field">
            <label for="locationTo" class="font-bold">{{ $t('Location end') }}</label>
            <InputText
              id="locationTo"
              aria-describedby="locationTo-help"
              v-model.trim="record.locationTo"
              :placeholder="$t('Location end')"
              :class="{ 'p-invalid': !!$v.locationTo.$errors.length }"
            />
            <small id="locationTo-help" class="p-error" v-for="error in $v.locationTo.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="unitTo" class="font-bold">{{ $t('Unit end') }}</label>
            <InputText
              id="unitTo"
              aria-describedby="unitTo-help"
              v-model.trim="record.unitTo"
              :placeholder="$t('Unit end')"
              :class="{ 'p-invalid': !!$v.unitTo.$errors.length }"
            />
            <small id="unitTo-help" class="p-error" v-for="error in $v.unitTo.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>
        </div>

        <div class="field col-12">
          <div class="field">
            <label for="level" class="font-bold">{{ $t('Level') }}</label>
            <InputText
              id="level"
              aria-describedby="level-help"
              v-model.trim="record.level"
              :placeholder="$t('Level')"
              :class="{ 'p-invalid': !!$v.level.$errors.length }"
            />
            <small id="level-help" class="p-error" v-for="error in $v.level.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="type" class="font-bold">{{ $t('Type') }}</label>
            <InputText
              id="type"
              aria-describedby="type-help"
              v-model.trim="record.type"
              :placeholder="$t('Type')"
              :class="{ 'p-invalid': !!$v.type.$errors.length }"
            />
            <small id="type-help" class="p-error" v-for="error in $v.type.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="speed" class="font-bold">{{ $t('Speed') }}</label>
            <InputText
              id="speed"
              aria-describedby="speed-help"
              v-model.trim="record.speed"
              :placeholder="$t('Speed')"
              :class="{ 'p-invalid': !!$v.speed.$errors.length }"
            />
            <small id="speed-help" class="p-error" v-for="error in $v.speed.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="status" class="font-bold">{{ $t('Status') }}</label>
            <InputText
              id="status"
              aria-describedby="status-help"
              v-model.trim="record.status"
              :placeholder="$t('Status')"
              :class="{ 'p-invalid': !!$v.status.$errors.length }"
            />
            <small id="status-help" class="p-error" v-for="error in $v.status.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="operator" class="font-bold">{{ $t('Operator') }}</label>
            <InputText
              id="operator"
              aria-describedby="operator-help"
              v-model.trim="record.operator"
              :placeholder="$t('Operator')"
              :class="{ 'p-invalid': !!$v.operator.$errors.length }"
            />
            <small id="operator-help" class="p-error" v-for="error in $v.operator.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="composition" class="font-bold">{{ $t('Composition') }}</label>
            <Textarea
              rows="5"
              cols="10"
              id="composition"
              aria-describedby="composition-help"
              v-model.trim="record.composition"
              :placeholder="$t('Composition')"
              :class="{ 'p-invalid': !!$v.composition.$errors.length }"
            />
            <small id="composition-help" class="p-error" v-for="error in $v.composition.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>
        </div>
      </div>
    </form>

    <template #footer>
      <Button text plain icon="pi pi-times" :label="$t('Cancel')" @click="onClose" />
      <Button text plain icon="pi pi-check" :label="$t('Save')" @click="onSaveOrUpdate" />
    </template>
  </Dialog>
</template>

<style scoped></style>
