<script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, ipAddress } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useRequest } from '@/stores/restfullapi';

const { t } = useI18n();
const toast = useToast();
const store = useRequest();

const visible = ref(false);
const record = ref({});

const props = defineProps({
  users: {
    type: Array,
    default: []
  },
  locations: {
    type: Array,
    default: []
  },
  companies: {
    type: Array,
    default: []
  },
  branches: {
    type: Array,
    default: []
  },
  enterprises: {
    type: Array,
    default: []
  },
  departments: {
    type: Array,
    default: []
  },
  positions: {
    type: Array,
    default: []
  }
});

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
    fullname: { required },
    phone: { required },
    position: { required },
    ipaddress: { required, ipAddress },
    mail: { required },
    location: { required },
    company: { required },
    branch: { required },
    enterprise: { required },
    department: { required },
    request: { required },
    // workerOpen: { required },
    // workerClose: { required },
    closed: { required },
    comment: { required },
    conclusion: { required }
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

const value = ref('off');
</script>

<template>
  <Menu ref="refMenu" popup :model="options" />

  <Dialog
    modal
    :closable="false"
    :draggable="false"
    :visible="visible"
    :style="{ width: '800px' }"
    class="p-fluid"
  >
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex align-items-center justify-content-center">
          <AppIcons name="operational-journal" :size="40" class="mr-2" />
          <div>
            <p class="text-lg font-bold line-height-2 mb-0">{{ $t('Operational request') }}</p>
            <p class="text-base font-normal line-height-2 text-color-secondary mb-0">
              {{ record?.id ? $t('Edit current record') : $t('Create new record') }}
              <!-- {{ $t('Status request') }} : -->
              <!-- {{ record?.closed ? $t('Request closed') : $t('Request opened') }} -->
            </p>
          </div>
        </div>
        <div class="flex gap-2 align-items-center">
          <SelectButton v-model="value" :options="['Off', 'On']" aria-labelledby="basic" />

          <ToggleButton
            :v-model="record?.closed ? true : false"
            :onLabel="$t('Request closed')"
            :offLabel="$t('Request opened')"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            class="w-15rem"
          />

          <Button
            text
            plain
            rounded
            class="mx-1"
            icon="pi pi-ellipsis-v"
            v-tooltip.bottom="$t('Options menu')"
            @click="toggleMenu"
          />
          <Button
            text
            plain
            rounded
            class="mx-1"
            icon="pi pi-times"
            v-tooltip.bottom="$t('Close')"
            @click="onClose"
          />
        </div>
      </div>
    </template>

    <form @submit.prevent="onSaveOrUpdate">
      <div class="formgrid grid">
        <div class="field col">
          <div class="field">
            <label for="request" class="font-bold">{{ $t('Client request') }}</label>
            <Textarea
              rows="7"
              cols="10"
              id="request"
              aria-describedby="request-help"
              v-model.trim="record.request"
              :placeholder="$t('Client request')"
            />
            <small id="request-help" class="p-error" v-for="error in $v.request.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="mail" class="font-bold">{{ $t('Mail number') }}</label>
            <InputText
              id="mail"
              aria-describedby="mail-help"
              v-model.trim="record.mail"
              :placeholder="$t('Client mail number')"
              :class="{ 'p-invalid': !!$v.mail.$errors.length }"
            />
            <small id="mail-help" class="p-error" v-for="error in $v.mail.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="location" class="font-bold">{{ $t('Location') }}</label>
            <Dropdown
              filter
              autofocus
              showClear
              resetFilterOnHide
              id="location"
              aria-describedby="location-help"
              dataKey="id"
              optionValue="id"
              optionLabel="title"
              v-model="record.location"
              :options="locations"
              :filterPlaceholder="$t('Search')"
              :placeholder="$t('Client location')"
              :class="{ 'p-invalid': !!$v.location.$errors.length }"
            />
            <small id="location-help" class="p-error" v-for="error in $v.location.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="ipaddress" class="font-bold">{{ $t('IP Address') }}</label>
            <div class="formgroup-inline">
              <div class="field">
                <InputText
                  id="ipaddress"
                  aria-describedby="ipaddress-help"
                  v-model.trim="record.ipaddress"
                  :placeholder="$t('Client IP Address')"
                  :class="{ 'p-invalid': !!$v.ipaddress.$errors.length }"
                />
                <small
                  id="ipaddress-help"
                  class="p-error"
                  v-for="error in $v.ipaddress.$errors"
                  :key="error.$uid"
                >
                  {{ $t(error.$message) }}
                </small>
              </div>
              <Button icon="pi pi-search" aria-label="Search" />
            </div>
          </div>

          <div class="field">
            <label for="conclusion" class="font-bold">{{ $t('Conclusion for request') }}</label>
            <Textarea
              rows="6"
              cols="10"
              id="conclusion"
              aria-describedby="conclusion-help"
              v-model.trim="record.conclusion"
              :placeholder="$t('Conclusion')"
            />
            <small
              id="conclusion-help"
              class="p-error"
              v-for="error in $v.conclusion.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </small>
          </div>
        </div>

        <div class="field col">
          <div class="field">
            <label for="client-info" class="font-bold">{{ $t('Client info') }}</label>
            <div id="client-info" class="field">
              <div class="field">
                <InputText
                  id="fullname"
                  aria-describedby="fullname-help"
                  v-model.trim="record.fullname"
                  :placeholder="$t('Client fullname')"
                  :class="{ 'p-invalid': !!$v.fullname.$errors.length }"
                />
                <small
                  id="fullname-help"
                  class="p-error"
                  v-for="error in $v.fullname.$errors"
                  :key="error.$uid"
                >
                  {{ $t(error.$message) }}
                </small>
              </div>

              <div class="field">
                <InputText
                  id="phone"
                  v-model.trim="record.phone"
                  aria-describedby="phone-help"
                  :placeholder="$t('Client phone')"
                  :class="{ 'p-invalid': !!$v.phone.$errors.length }"
                />
                <small id="phone-help" class="p-error" v-for="error in $v.phone.$errors" :key="error.$uid">
                  {{ $t(error.$message) }}
                </small>
              </div>

              <div class="field">
                <Dropdown
                  filter
                  autofocus
                  showClear
                  resetFilterOnHide
                  id="position"
                  dataKey="id"
                  optionValue="id"
                  optionLabel="title"
                  aria-describedby="position-help"
                  v-model="record.position"
                  :options="positions"
                  :filterPlaceholder="$t('Search')"
                  :placeholder="$t('Client position')"
                  :class="{ 'p-invalid': !!$v.position.$errors.length }"
                />
                <small
                  id="position-help"
                  class="p-error"
                  v-for="error in $v.position.$errors"
                  :key="error.$uid"
                >
                  {{ $t(error.$message) }}
                </small>
              </div>
            </div>
          </div>

          <div class="field">
            <label for="client-company" class="font-bold">{{ $t('Company') }}</label>
            <div id="client-company" class="field">
              <div class="field">
                <Dropdown
                  filter
                  autofocus
                  showClear
                  resetFilterOnHide
                  id="company"
                  aria-describedby="company-help"
                  dataKey="id"
                  optionValue="id"
                  optionLabel="title"
                  v-model="record.company"
                  :options="companies"
                  :filterPlaceholder="$t('Search')"
                  :placeholder="$t('Client company')"
                  :class="{ 'p-invalid': !!$v.company.$errors.length }"
                />
                <small
                  id="company-help"
                  class="p-error"
                  v-for="error in $v.company.$errors"
                  :key="error.$uid"
                >
                  {{ $t(error.$message) }}
                </small>
              </div>

              <div class="field">
                <Dropdown
                  filter
                  autofocus
                  showClear
                  resetFilterOnHide
                  id="branch"
                  aria-describedby="branch-help"
                  dataKey="id"
                  optionValue="id"
                  optionLabel="title"
                  v-model="record.branch"
                  :options="branches"
                  :filterPlaceholder="$t('Search')"
                  :placeholder="$t('Client branch')"
                  :class="{ 'p-invalid': !!$v.branch.$errors.length }"
                />
                <small id="branch-help" class="p-error" v-for="error in $v.branch.$errors" :key="error.$uid">
                  {{ $t(error.$message) }}
                </small>
              </div>

              <div class="field">
                <Dropdown
                  filter
                  autofocus
                  showClear
                  resetFilterOnHide
                  id="enterprise"
                  aria-describedby="enterprise-help"
                  dataKey="id"
                  optionValue="id"
                  optionLabel="title"
                  v-model="record.enterprise"
                  :options="enterprises"
                  :filterPlaceholder="$t('Search')"
                  :placeholder="$t('Client enterprise')"
                  :class="{ 'p-invalid': !!$v.enterprise.$errors.length }"
                />
                <small
                  id="enterprise-help"
                  class="p-error"
                  v-for="error in $v.enterprise.$errors"
                  :key="error.$uid"
                >
                  {{ $t(error.$message) }}
                </small>
              </div>

              <div class="field">
                <Dropdown
                  filter
                  autofocus
                  showClear
                  resetFilterOnHide
                  id="department"
                  aria-describedby="department-help"
                  dataKey="id"
                  optionValue="id"
                  optionLabel="title"
                  v-model="record.department"
                  :options="departments"
                  :filterPlaceholder="$t('Search')"
                  :placeholder="$t('Client department')"
                  :class="{ 'p-invalid': !!$v.department.$errors.length }"
                />
                <small
                  id="department-help"
                  class="p-error"
                  v-for="error in $v.department.$errors"
                  :key="error.$uid"
                >
                  {{ $t(error.$message) }}
                </small>
              </div>
            </div>
          </div>

          <div class="field">
            <label for="comment" class="font-bold">{{ $t('Comment') }}</label>
            <Textarea
              rows="3"
              cols="10"
              id="comment"
              v-model.trim="record.comment"
              :placeholder="$t('Comment')"
            />
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
