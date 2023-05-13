<script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, ipAddress } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

import { useTicket } from '@/stores/api/ticket';
import { useСompany } from '@/stores/api/company';
import { useBranch } from '@/stores/api/branch';
import { useLocation } from '@/stores/api/location';
import { useDepartment } from '@/stores/api/department';
import { useEnterprise } from '@/stores/api/enterprise';
import { usePosition } from '@/stores/api/position';

const { t } = useI18n();
const toast = useToast();

const Ticket = useTicket();
const Company = useСompany();
const Branch = useBranch();
const Department = useDepartment();
const Enterprise = useEnterprise();
const Position = usePosition();
const Location = useLocation();

const emits = defineEmits(['close']);

defineExpose({
  toggle: async ({ id }) => {
    try {
      if (id) await Ticket.findOne({ id, populate: false });
      else Ticket.$init();
      await Promise.allSettled([
        Сompany.findAll({}),
        Branch.findAll({}),
        Department.findAll({}),
        Enterprise.findAll({}),
        Position.findAll({}),
        Location.findAll({})
      ]);
      visible.value = true;
    } catch (err) {
      visible.value = false;
      Ticket.$init();
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

const record = computed(() => Ticket.record);
const $validate = useVuelidate(
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

const onClose = () => {
  visible.value = false;
  $validate.value.$reset();
  Ticket.$init();
  emits('close', {});
};

const onCreateRecord = async () => {
  Ticket.$init();
  $validate.value.$reset();
  toast.add({ severity: 'success', summary: t('HD Information'), detail: t('Input new record'), life: 3000 });
};

const onRemoveRecord = async () => {
  if (Ticket?.record?.id) {
    await Ticket.removeOne(record.value);
    toast.add({ severity: 'success', summary: t('HD Information'), detail: t('Record is removed'), life: 3000 });
    onClose();
  } else {
    toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t('Record not selected'), life: 3000 });
  }
};

const onSaveRecord = async () => {
  const valid = await $validate.value.$validate();
  if (valid) {
    if (Ticket?.record?.id) {
      await Ticket.updateOne(record.value);
      toast.add({ severity: 'success', summary: t('HD Information'), detail: t('Record is updated'), life: 3000 });
    } else {
      await Ticket.createOne(record.value);
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
    :draggable="false"
    v-model:visible="visible"
    :style="{ width: '800px' }"
    class="p-fluid"
    @hide="onClose"
  >
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex align-items-center justify-content-center">
          <AppIcons name="operational-journal" :size="40" class="mr-2" />
          <div>
            <p class="text-lg font-bold line-height-2 mb-0">{{ $t('Operational request') }}</p>
            <p class="text-base font-normal line-height-2 text-color-secondary mb-0">
              {{ Ticket?.record?.id ? $t('Edit current record') : $t('Create new record') }}
              <!-- {{ $t('Status request') }} : -->
              <!-- {{ Ticket?.record?.closed ? $t('Request closed') : $t('Request opened') }} -->
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
      <div class="formgrid grid">
        <div class="field col">
          <div class="field">
            <label for="request" class="font-bold">{{ $t('Client request') }}</label>
            <Textarea
              rows="7"
              cols="10"
              id="request"
              aria-describedby="request-help"
              v-model.trim="Ticket.record.request"
              :placeholder="$t('Client request')"
            />
            <small id="request-help" class="p-error" v-for="error in $validate.request.$errors" :key="error.$uid">
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="mail" class="font-bold">{{ $t('Mail number') }}</label>
            <InputText
              id="mail"
              aria-describedby="mail-help"
              v-model.trim="Ticket.record.mail"
              :placeholder="$t('Client mail number')"
              :class="{ 'p-invalid': !!$validate.mail.$errors.length }"
            />
            <small id="mail-help" class="p-error" v-for="error in $validate.mail.$errors" :key="error.$uid">
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
              v-model="Ticket.record.location"
              :options="Location.records"
              :filterPlaceholder="$t('Search')"
              :placeholder="$t('Client location')"
              :class="{ 'p-invalid': !!$validate.location.$errors.length }"
            />
            <small id="location-help" class="p-error" v-for="error in $validate.location.$errors" :key="error.$uid">
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
                  v-model.trim="Ticket.record.ipaddress"
                  :placeholder="$t('Client IP Address')"
                  :class="{ 'p-invalid': !!$validate.ipaddress.$errors.length }"
                />
                <small
                  id="ipaddress-help"
                  class="p-error"
                  v-for="error in $validate.ipaddress.$errors"
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
              v-model.trim="Ticket.record.conclusion"
              :placeholder="$t('Conclusion')"
            />
            <small id="conclusion-help" class="p-error" v-for="error in $validate.conclusion.$errors" :key="error.$uid">
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
                  v-model.trim="Ticket.record.fullname"
                  :placeholder="$t('Client fullname')"
                  :class="{ 'p-invalid': !!$validate.fullname.$errors.length }"
                />
                <small id="fullname-help" class="p-error" v-for="error in $validate.fullname.$errors" :key="error.$uid">
                  {{ $t(error.$message) }}
                </small>
              </div>

              <div class="field">
                <InputText
                  id="phone"
                  v-model.trim="Ticket.record.phone"
                  aria-describedby="phone-help"
                  :placeholder="$t('Client phone')"
                  :class="{ 'p-invalid': !!$validate.phone.$errors.length }"
                />
                <small id="phone-help" class="p-error" v-for="error in $validate.phone.$errors" :key="error.$uid">
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
                  v-model="Ticket.record.position"
                  :options="Position.records"
                  :filterPlaceholder="$t('Search')"
                  :placeholder="$t('Client position')"
                  :class="{ 'p-invalid': !!$validate.position.$errors.length }"
                />
                <small id="position-help" class="p-error" v-for="error in $validate.position.$errors" :key="error.$uid">
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
                  v-model="Ticket.record.company"
                  :options="Company.records"
                  :filterPlaceholder="$t('Search')"
                  :placeholder="$t('Client company')"
                  :class="{ 'p-invalid': !!$validate.company.$errors.length }"
                />
                <small id="company-help" class="p-error" v-for="error in $validate.company.$errors" :key="error.$uid">
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
                  v-model="Ticket.record.branch"
                  :options="Branch.records"
                  :filterPlaceholder="$t('Search')"
                  :placeholder="$t('Client branch')"
                  :class="{ 'p-invalid': !!$validate.branch.$errors.length }"
                />
                <small id="branch-help" class="p-error" v-for="error in $validate.branch.$errors" :key="error.$uid">
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
                  v-model="Ticket.record.enterprise"
                  :options="Enterprise.records"
                  :filterPlaceholder="$t('Search')"
                  :placeholder="$t('Client enterprise')"
                  :class="{ 'p-invalid': !!$validate.enterprise.$errors.length }"
                />
                <small
                  id="enterprise-help"
                  class="p-error"
                  v-for="error in $validate.enterprise.$errors"
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
                  v-model="Ticket.record.department"
                  :options="Department.records"
                  :filterPlaceholder="$t('Search')"
                  :placeholder="$t('Client department')"
                  :class="{ 'p-invalid': !!$validate.department.$errors.length }"
                />
                <small
                  id="department-help"
                  class="p-error"
                  v-for="error in $validate.department.$errors"
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
              v-model.trim="Ticket.record.comment"
              :placeholder="$t('Comment')"
            />
          </div>
        </div>
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
