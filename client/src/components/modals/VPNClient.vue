<script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, ipAddress } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

import { dateToStr } from '@/service/DataFilters';

import { useVPNAddress } from '@/stores/api/vpn';
import { useIPAddress } from '@/stores/api/ipaddress';
import { useСompany } from '@/stores/api/company';
import { useBranch } from '@/stores/api/branch';
import { useLocation } from '@/stores/api/location';
import { useDepartment } from '@/stores/api/department';
import { useEnterprise } from '@/stores/api/enterprise';
import { usePosition } from '@/stores/api/position';
import { useUnit } from '@/stores/api/unit';

const { t } = useI18n();
const toast = useToast();

const VPNAddress = useVPNAddress();

const IPAddress = useIPAddress();
const Сompany = useСompany();
const Branch = useBranch();
const Department = useDepartment();
const Enterprise = useEnterprise();
const Position = usePosition();
const Location = useLocation();
const Unit = useUnit();

const emits = defineEmits(['close']);

defineExpose({
  toggle: async ({ id }) => {
    try {
      if (id) record.value = await VPNAddress.findOne({ id, populate: false });
      else record.value = VPNAddress.$reset();

      const [company, branch, department, enterprise, position, location, unit] =
        await Promise.allSettled([
          Сompany.findAll({}),
          Branch.findAll({}),
          Department.findAll({}),
          Enterprise.findAll({}),
          Position.findAll({}),
          Location.findAll({}),
          Unit.findAll({})
        ]);
      companies.value = company.value;
      branches.value = branch.value;
      departments.value = department.value;
      enterprises.value = enterprise.value;
      positions.value = position.value;
      locations.value = location.value;
      units.value = unit.value;

      visible.value = true;
    } catch (err) {
      visible.value = false;
      record.value = VPNAddress.$reset();
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

const companies = ref([]);
const branches = ref([]);
const departments = ref([]);
const enterprises = ref([]);
const positions = ref([]);
const locations = ref([]);
const units = ref([]);

const $validate = useVuelidate(
  {
    vpn: { required, ipAddress },
    login: { required },
    ipaddress: { ipAddress },
    unit: { required },
    mail: { required },
    dateOpen: { required },
    location: { required },
    company: { required },
    branch: { required },
    enterprise: { required },
    department: { required },
    fullname: { required },
    position: { required },
    phone: { required },
    service: { required }
  },
  record
);

const onClose = () => {
  visible.value = false;
  $validate.value.$reset();
  record.value = VPNAddress.$reset();
  emits('close', {});
};

const findOneIPAddress = async () => {
  const validIPAddress = await $validate.value.ipaddress.$validate();
  try {
    if (record.value?.ipaddress && validIPAddress) {
      const currentIP = await IPAddress.findOne({
        ipaddress: record.value.ipaddress,
        populate: false
      });
      if (currentIP?.ipaddress) {
        record.value.ipaddress = currentIP?.ipaddress || null;
        record.value.location = currentIP?.location || null;
        record.value.fullname = currentIP?.fullname || null;
        record.value.phone = currentIP?.phone || null;
        record.value.position = currentIP?.position || null;
        record.value.company = currentIP?.company || null;
        record.value.branch = currentIP?.branch || null;
        record.value.enterprise = currentIP?.enterprise || null;
        record.value.department = currentIP?.department || null;
      } else {
        toast.add({
          severity: 'warn',
          summary: t('HD Warning'),
          detail: t('IP Address not found'),
          life: 3000
        });
      }
    } else {
      toast.add({
        severity: 'warn',
        summary: t('HD Warning'),
        detail: t('IP Address not entered'),
        life: 3000
      });
    }
  } catch (err) {
    toast.add({ severity: 'warn', summary: t('HD Warning'), detail: t(err.message), life: 3000 });
  }
};

const onCreateRecord = async () => {
  record.value = VPNAddress.$reset();
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
    await VPNAddress.removeOne(record.value);
    $validate.value.$reset();
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
      await VPNAddress.updateOne(record.value);
      toast.add({
        severity: 'success',
        summary: t('HD Information'),
        detail: t('Record is updated'),
        life: 3000
      });
    } else {
      await VPNAddress.createOne(record.value);
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
    :style="{ width: '800px' }"
    class="p-fluid"
    @hide="onClose"
  >
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex align-items-center justify-content-center">
          <AppIcons name="network-vpn-clients" :size="42" class="mr-2" />
          <div>
            <p class="text-lg font-bold line-height-2 mb-0">{{ $t('Network VPN Client') }}</p>
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
      <div class="formgrid grid">
        <div class="field col">
          <div class="field">
            <label for="date-open" class="font-bold">{{ $t('Date opened') }}</label>
            <Calendar
              id="date-open"
              showIcon
              showButtonBar
              dateFormat="dd.mm.yy"
              aria-describedby="date-open-help"
              :modelValue="record?.dateOpen ? dateToStr(record.dateOpen) : record.dateOpen"
              v-model.trim="record.dateOpen"
              :placeholder="$t('Date opened')"
              :class="{ 'p-invalid': !!$validate.dateOpen.$errors.length }"
            />
            <small
              id="date-open-help"
              class="p-error"
              v-for="error in $validate.dateOpen.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="date-close" class="font-bold">{{ $t('Date closed') }}</label>
            <Calendar
              id="date-close"
              showIcon
              showButtonBar
              dateFormat="dd.mm.yy"
              aria-describedby="date-close-help"
              :modelValue="record?.dateClose ? dateToStr(record.dateClose) : record.dateClose"
              v-model.trim="record.dateClose"
              :placeholder="$t('Date closed')"
            />
          </div>

          <div class="field">
            <label for="mail" class="font-bold">{{ $t('Mail number') }}</label>
            <InputText
              id="mail"
              aria-describedby="mail-help"
              v-model.trim="record.mail"
              :placeholder="$t('Mail number')"
              :class="{ 'p-invalid': !!$validate.mail.$errors.length }"
            />
            <small
              id="mail-help"
              class="p-error"
              v-for="error in $validate.mail.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </small>
          </div>

          <Divider />

          <div class="field">
            <label for="vpn" class="font-bold">{{ $t('VPN IP Address') }}</label>
            <InputText
              id="vpn"
              aria-describedby="vpn-help"
              v-model.trim="record.vpn"
              :placeholder="$t('VPN IP Address')"
              :class="{ 'p-invalid': !!$validate.vpn.$errors.length }"
            />
            <small
              id="vpn-help"
              class="p-error"
              v-for="error in $validate.vpn.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="login" class="font-bold">{{ $t('VPN Login') }}</label>
            <InputText
              id="login"
              aria-describedby="login-help"
              v-model.trim="record.login"
              :placeholder="$t('VPN Login')"
              :class="{ 'p-invalid': !!$validate.login.$errors.length }"
            />
            <small
              id="login-help"
              class="p-error"
              v-for="error in $validate.login.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="service" class="font-bold">{{ $t('VPN Services') }}</label>
            <InputText
              id="service"
              aria-describedby="service-help"
              v-model.trim="record.service"
              :placeholder="$t('VPN Services')"
              :class="{ 'p-invalid': !!$validate.service.$errors.length }"
            />
            <small
              id="service-help"
              class="p-error"
              v-for="error in $validate.service.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </small>
          </div>

          <Divider />

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
              :class="{ 'p-invalid': !!$validate.unit.$errors.length }"
            />
            <small
              id="unit-help"
              class="p-error"
              v-for="error in $validate.unit.$errors"
              :key="error.$uid"
            >
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
              :class="{ 'p-invalid': !!$validate.location.$errors.length }"
            />
            <small
              id="location-help"
              class="p-error"
              v-for="error in $validate.location.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </small>
          </div>
        </div>

        <div class="field col">
          <div class="field">
            <label for="ipaddress" class="font-bold">{{ $t('IP Address') }}</label>
            <div class="field" id="ipaddress">
              <span class="p-input-icon-right">
                <i
                  class="pi pi-search cursor-pointer"
                  v-tooltip.bottom="$t('Check IP Address')"
                  @click.prevent="findOneIPAddress"
                />
                <InputText
                  aria-describedby="ipaddress-help"
                  v-model.trim="record.ipaddress"
                  :placeholder="$t('Client IP Address')"
                  :class="{ 'p-invalid': !!$validate.ipaddress.$errors.length }"
                  @keypress.prevent.enter="findOneIPAddress"
                />
              </span>
              <small
                id="ipaddress-help"
                class="p-error"
                v-for="error in $validate.ipaddress.$errors"
                :key="error.$uid"
              >
                {{ $t(error.$message) }}
              </small>
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
                  :class="{ 'p-invalid': !!$validate.company.$errors.length }"
                />
                <small
                  id="company-help"
                  class="p-error"
                  v-for="error in $validate.company.$errors"
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
                  :class="{ 'p-invalid': !!$validate.branch.$errors.length }"
                />
                <small
                  id="branch-help"
                  class="p-error"
                  v-for="error in $validate.branch.$errors"
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
                  id="enterprise"
                  aria-describedby="enterprise-help"
                  dataKey="id"
                  optionValue="id"
                  optionLabel="title"
                  v-model="record.enterprise"
                  :options="enterprises"
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
                  v-model="record.department"
                  :options="departments"
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
            <label for="client-info" class="font-bold">{{ $t('Client info') }}</label>
            <div id="client-info" class="field">
              <div class="field">
                <InputText
                  id="fullname"
                  aria-describedby="fullname-help"
                  v-model.trim="record.fullname"
                  :placeholder="$t('Client fullname')"
                  :class="{ 'p-invalid': !!$validate.fullname.$errors.length }"
                />
                <small
                  id="fullname-help"
                  class="p-error"
                  v-for="error in $validate.fullname.$errors"
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
                />
              </div>

              <div class="field">
                <InputText
                  id="phone"
                  v-model.trim="record.phone"
                  aria-describedby="phone-help"
                  :placeholder="$t('Client phone')"
                  :class="{ 'p-invalid': !!$validate.phone.$errors.length }"
                />
                <small
                  id="phone-help"
                  class="p-error"
                  v-for="error in $validate.phone.$errors"
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
              rows="7"
              cols="10"
              id="comment"
              class="outline-none"
              v-model.trim="record.comment"
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
