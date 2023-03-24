<script setup>
import { ref, computed, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useСompany } from '@/stores/restfullapi';

const { t } = useI18n();
const toast = useToast();
const store = useСompany();

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
  ipaddress: { required },
  cidr: { required },
  unit: { required },
  internet: { required },
  email: { required },
  autoanswer: { required },
  mail: { required },
  date: { required },
  location: { required },
  company: { required },
  branch: { required },
  enterprise: { required },
  department: { required },
  fullname: { required },
  position: { required },
  phone: { required },
  comment: { required }
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
    toast.add({ severity: 'warn', detail: t('Records not found'), life: 3000 });
  }
};

const onCreateRecord = async () => {
  store.$reset();
  toast.add({ severity: 'success', detail: t('Input new record'), life: 3000 });
};

const onRemoveRecord = async () => {
  if (store?.record?.id) {
    await store.removeOne(store.record);
    store.$reset();
    await onRecords();
    toast.add({ severity: 'success', detail: t('Record is removed'), life: 3000 });
  } else {
    toast.add({ severity: 'warn', detail: t('Record not selected'), life: 3000 });
  }
};

const onUpdateRecords = async () => {
  store.$reset();
  await onRecords();
  toast.add({ severity: 'success', detail: t('Records is updated'), life: 3000 });
};

const onSaveUpdaterRecord = async () => {
  const valid = await $v.value.$validate();
  if (valid) {
    if (store?.record?.id) {
      await store.updateOne(store.record);
      toast.add({ severity: 'success', detail: t('Record is updated'), life: 3000 });
    } else {
      await store.createOne(store.record);
      toast.add({ severity: 'success', detail: t('Record is created'), life: 3000 });
    }
    show.value = false;
  } else {
    toast.add({ severity: 'warn', detail: t('Fill in all required fields'), life: 3000 });
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
    :style="{ width: '900px' }"
    class="p-fluid"
  >
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-sitemap text-6xl mr-3"></i>
          <div>
            <p class="text-lg font-bold line-height-2 mb-0">{{ $t('IP Address') }}</p>
            <p class="text-base font-normal line-height-2 text-color-secondary mb-0">
              {{ store?.record?.id ? $t('Edit current record') : $t('Create new record') }}
            </p>
            <small class="font-normal line-height-2 text-color-secondary">
              {{ t('IP Address from database') }}
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

    <form @submit.prevent="onSaveUpdaterRecord" class="p-fluid">
      <div class="field">
        <label for="date">{{ $t('Date create') }}</label>
        <Calendar
          id="date"
          v-model.trim="record.date"
          :placeholder="$t('Date create IP Address')"
          :class="{ 'p-invalid': !!$v.date.$errors.length }"
        />
        <small class="p-error" v-for="error in $v.date.$errors" :key="error.$uid">
          {{ $t(error.$message) }}
        </small>
      </div>

      <div class="field">
        <label for="mail">{{ $t('Mail number') }}</label>
        <InputText
          id="mail"
          v-model.trim="record.mail"
          :placeholder="$t('Client mail number')"
          :class="{ 'p-invalid': !!$v.mail.$errors.length }"
        />
        <small class="p-error" v-for="error in $v.mail.$errors" :key="error.$uid">
          {{ $t(error.$message) }}
        </small>
      </div>

      <div class="field">
        <label for="ipaddress">{{ $t('IP Address') }}</label>
        <InputText
          id="ipaddress"
          v-model.trim="record.ipaddress"
          :placeholder="$t('Client IP Address')"
          :class="{ 'p-invalid': !!$v.ipaddress.$errors.length }"
        />
        <small class="p-error" v-for="error in $v.ipaddress.$errors" :key="error.$uid">
          {{ $t(error.$message) }}
        </small>
      </div>

      <div class="field">
        <label for="unit">{{ $t('Unit') }}</label>
        <Dropdown
          filter
          autofocus
          id="unit"
          optionLabel="title"
          v-model="record.unit"
          :options="records"
          :filterPlaceholder="$t('Search in list')"
          :placeholder="$t('Client unit')"
          class="w-full"
          :class="{ 'p-invalid': !!$v.unit.$errors.length }"
        />
        <small class="p-error" v-for="error in $v.unit.$errors" :key="error.$uid">
          {{ $t(error.$message) }}
        </small>
      </div>

      <div class="field">
        <label for="location">{{ $t('Location') }}</label>
        <Dropdown
          filter
          autofocus
          id="location"
          optionLabel="title"
          v-model="record.location"
          :options="records"
          :filterPlaceholder="$t('Search in list')"
          :placeholder="$t('Client location')"
          class="w-full"
          :class="{ 'p-invalid': !!$v.location.$errors.length }"
        />
        <small class="p-error" v-for="error in $v.location.$errors" :key="error.$uid">
          {{ $t(error.$message) }}
        </small>
      </div>

      <div class="field">
        <Fieldset>
          <template #legend :style="`background: red`">
            <div class="flex align-items-center">
              <span class="pi pi-building mr-2"></span>
              <span class="font-bold text-lg">{{ $t('Company') }}</span>
            </div>
          </template>
          <Dropdown
            filter
            autofocus
            id="company"
            optionLabel="title"
            v-model="record.company"
            :options="records"
            :filterPlaceholder="$t('Search in list')"
            :placeholder="$t('Client company')"
            class="w-full"
            :class="{ 'p-invalid': !!$v.company.$errors.length }"
          />
          <small class="p-error" v-for="error in $v.company.$errors" :key="error.$uid">
            {{ $t(error.$message) }}
          </small>

          <Dropdown
            filter
            autofocus
            id="branch"
            optionLabel="title"
            v-model="record.branch"
            :options="records"
            :filterPlaceholder="$t('Search in list')"
            :placeholder="$t('Client branch')"
            class="w-full mt-2"
            :class="{ 'p-invalid': !!$v.branch.$errors.length }"
          />
          <small class="p-error" v-for="error in $v.branch.$errors" :key="error.$uid">
            {{ $t(error.$message) }}
          </small>

          <Dropdown
            filter
            autofocus
            id="enterprise"
            optionLabel="title"
            v-model="record.enterprise"
            :options="records"
            :filterPlaceholder="$t('Search in list')"
            :placeholder="$t('Client enterprise')"
            class="w-full mt-2"
            :class="{ 'p-invalid': !!$v.enterprise.$errors.length }"
          />
          <small class="p-error" v-for="error in $v.enterprise.$errors" :key="error.$uid">
            {{ $t(error.$message) }}
          </small>

          <Dropdown
            filter
            autofocus
            id="department"
            optionLabel="title"
            v-model="record.department"
            :options="records"
            :filterPlaceholder="$t('Search in list')"
            :placeholder="$t('Client department')"
            class="w-full mt-2"
            :class="{ 'p-invalid': !!$v.department.$errors.length }"
          />
          <small class="p-error" v-for="error in $v.department.$errors" :key="error.$uid">
            {{ $t(error.$message) }}
          </small>
        </Fieldset>
      </div>

      <div class="field">
        <Fieldset>
          <template #legend>
            <div class="flex align-items-center">
              <span class="pi pi-user mr-2"></span>
              <span class="font-bold text-lg">{{ $t('Client info') }}</span>
            </div>
          </template>

          <InputText
            id="fullname"
            v-model.trim="record.fullname"
            :placeholder="$t('Client fullname')"
            :class="{ 'p-invalid': !!$v.fullname.$errors.length }"
          />
          <small class="p-error" v-for="error in $v.fullname.$errors" :key="error.$uid">
            {{ $t(error.$message) }}
          </small>

          <Dropdown
            filter
            autofocus
            id="position"
            optionLabel="title"
            v-model="record.position"
            :options="records"
            :filterPlaceholder="$t('Search in list')"
            :placeholder="$t('Client position')"
            class="w-full mt-2"
            :class="{ 'p-invalid': !!$v.position.$errors.length }"
          />
          <small class="p-error" v-for="error in $v.position.$errors" :key="error.$uid">
            {{ $t(error.$message) }}
          </small>

          <InputText
            id="phone"
            v-model.trim="record.phone"
            :placeholder="$t('Client phone')"
            class="w-full mt-2"
            :class="{ 'p-invalid': !!$v.phone.$errors.length }"
          />
          <small class="p-error" v-for="error in $v.phone.$errors" :key="error.$uid">
            {{ $t(error.$message) }}
          </small>
        </Fieldset>
      </div>

      <div class="field">
        <label for="autoanswer">{{ $t('Autoanswer') }}</label>
        <InputText
          id="autoanswer"
          v-model.trim="record.autoanswer"
          :placeholder="$t('Client autoanswer')"
          :class="{ 'p-invalid': !!$v.autoanswer.$errors.length }"
        />
        <small class="p-error" v-for="error in $v.autoanswer.$errors" :key="error.$uid">
          {{ $t(error.$message) }}
        </small>
      </div>
    </form>

    <template #footer>
      <Button text plain icon="pi pi-times" :label="$t('Cancel')" @click="show = !show" />
      <Button text plain icon="pi pi-check" :label="$t('Save')" @click="onSaveUpdaterRecord" />
    </template>
  </Dialog>
</template>

<style scoped>
::v-deep(.p-fieldset-legend) {
  background: transparent;
}

::v-deep(.p-fieldset) {
  background: transparent;
}
</style>
