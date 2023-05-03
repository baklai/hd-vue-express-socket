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

const props = defineProps({
  locations: {
    type: Array,
    default: []
  },
  units: {
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
    ipaddress: { required, ipAddress },
    cidr: { required },
    unit: { required },
    mail: { required },
    date: { required },
    location: { required },
    company: { required },
    branch: { required },
    enterprise: { required },
    department: { required },
    fullname: { required },
    position: { required },
    phone: { required }
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
          <AppIcons name="ip-address" :size="40" class="mr-2" />
          <div>
            <p class="text-lg font-bold line-height-2 mb-0">{{ $t('IP Address') }}</p>
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
            <label for="date" class="font-bold">{{ $t('Date create') }}</label>
            <Calendar
              id="date"
              showIcon
              showButtonBar
              dateFormat="dd.mm.yy"
              aria-describedby="date-help"
              v-model.trim="record.date"
              :placeholder="$t('Date create IP Address')"
              :class="{ 'p-invalid': !!$v.date.$errors.length }"
            />
            <small id="date-help" class="p-error" v-for="error in $v.date.$errors" :key="error.$uid">
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
            <label for="unit" class="font-bold">{{ $t('Unit') }}</label>
            <Dropdown
              filter
              autofocus
              showClear
              resetFilterOnHide
              dataKey="id"
              optionValue="id"
              optionLabel="title"
              id="unit"
              aria-describedby="unit-help"
              v-model="record.unit"
              :options="units"
              :filterPlaceholder="$t('Search')"
              :placeholder="$t('Client unit')"
              :class="{ 'p-invalid': !!$v.unit.$errors.length }"
            />
            <small id="unit-help" class="p-error" v-for="error in $v.unit.$errors" :key="error.$uid">
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
            <label for="ipaddress-sidr" class="font-bold">{{ $t('IP Address') }}</label>
            <div id="ipaddress-sidr" class="field">
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
              <div class="field">
                <Dropdown
                  id="cidr"
                  filter
                  autofocus
                  showClear
                  resetFilterOnHide
                  v-model="record.cidr"
                  :options="store.cidrs"
                  :optionLabel="(obj) => `${obj.mask}/${obj.value}`"
                  aria-describedby="cidr-help"
                  :filterPlaceholder="$t('Search')"
                  :placeholder="$t('Mask IP Address')"
                  :class="{ 'p-invalid': !!$v.unit.$errors.length }"
                />
                <small id="cidr-help" class="p-error" v-for="error in $v.unit.$errors" :key="error.$uid">
                  {{ $t(error.$message) }}
                </small>
              </div>
            </div>
          </div>

          <div class="field">
            <label for="internet" class="font-bold">{{ $t('Internet') }}</label>
            <div id="internet" class="field">
              <div class="field">
                <InputText
                  id="internet-mail"
                  v-model.trim="record.internet.mail"
                  :placeholder="$t('Internet mail number')"
                />
              </div>

              <div class="field">
                <Calendar
                  showIcon
                  showButtonBar
                  dateFormat="dd.mm.yy"
                  id="internet-date-open"
                  v-model.trim="record.internet.dateOpen"
                  :placeholder="$t('Date open internet')"
                />
              </div>

              <div class="field">
                <Calendar
                  showIcon
                  showButtonBar
                  dateFormat="dd.mm.yy"
                  id="internet-date-close"
                  v-model.trim="record.internet.dateClose"
                  :placeholder="$t('Date close internet')"
                />
              </div>

              <div class="field">
                <Textarea
                  rows="1"
                  cols="10"
                  id="internet-comment"
                  v-model.trim="record.internet.comment"
                  :placeholder="$t('Comment')"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="field col">
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
            </div>
          </div>

          <div class="field">
            <label for="autoanswer" class="font-bold">{{ $t('Autoanswer') }}</label>
            <InputText
              id="autoanswer"
              v-model.trim="record.autoanswer"
              :placeholder="$t('Client autoanswer')"
            />
          </div>

          <div class="field">
            <label for="comment" class="font-bold">{{ $t('Comment') }}</label>
            <Textarea
              rows="7"
              cols="10"
              id="comment"
              v-model.trim="record.comment"
              :placeholder="$t('Comment')"
            />
          </div>
        </div>

        <div class="field col px-3">
          <DataTable
            dataKey="id"
            editMode="row"
            :value="record.email"
            v-model:editingRows="editingEmails"
            @row-edit-save="
              (event) => {
                record.email[event.index] = event.newData;
              }
            "
            tableClass="editable-cells-table"
            tableStyle="min-width: 50rem"
            class="p-datatable-sm overflow-x-auto"
          >
            <template #header>
              <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <label for="email" class="font-bold">{{ $t('E-Mails') }}</label>
                <Button
                  text
                  plain
                  rounded
                  icon="pi pi-plus-circle"
                  iconClass="text-xl"
                  class="hover:text-color h-2rem w-2rem"
                  v-tooltip.bottom="$t('Create new record')"
                  @click="
                    record.email.push({
                      mail: '',
                      login: '',
                      fullname: '',
                      dateOpen: '',
                      dateClose: '',
                      comment: ''
                    })
                  "
                />
              </div>
            </template>

            <template #empty>
              <div class="flex justify-content-center">
                <p class="text-color-secondary font-italic">{{ $t('No records found') }}</p>
              </div>
            </template>

            <Column field="mail" :header="$t('Mail')" style="width: 15%">
              <template #editor="{ data, field }">
                <InputText v-model.trim="data[field]" :placeholder="$t('Mail number')" />
              </template>
            </Column>

            <Column field="login" :header="$t('Login')" style="width: 10%">
              <template #editor="{ data, field }">
                <InputText v-model.trim="data[field]" :placeholder="$t('Login')" />
              </template>
            </Column>

            <Column field="fullname" :header="$t('Fullname')" style="width: 20%">
              <template #editor="{ data, field }">
                <InputText v-model.trim="data[field]" :placeholder="$t('Fullname')" />
              </template>
            </Column>

            <Column field="dateOpen" :header="$t('Date open')" style="width: 15%">
              <template #editor="{ data, field }">
                <Calendar
                  showIcon
                  showButtonBar
                  dateFormat="dd.mm.yy"
                  v-model.trim="data[field]"
                  :placeholder="$t('Date open')"
                />
              </template>
            </Column>

            <Column field="dateClose" :header="$t('Date close')" style="width: 15%">
              <template #editor="{ data, field }">
                <Calendar
                  showIcon
                  showButtonBar
                  dateFormat="dd.mm.yy"
                  v-model.trim="data[field]"
                  :placeholder="$t('Date close')"
                />
              </template>
            </Column>

            <Column field="comment" :header="$t('Comment')" style="width: 15%">
              <template #editor="{ data, field }">
                <InputText v-model.trim="data[field]" :placeholder="$t('Comment')" />
              </template>
            </Column>

            <Column field="edit" :rowEditor="true" style="width: 10%" bodyStyle="text-align: center" />

            <Column field="delete" bodyStyle="text-align: center">
              <template #body="{ index }">
                <Button
                  text
                  plain
                  rounded
                  icon="pi pi-trash"
                  class="hover:text-color"
                  v-tooltip.bottom="$t('Delete record')"
                  @click="record.email.splice(index, 1)"
                />
              </template>
            </Column>
          </DataTable>
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
