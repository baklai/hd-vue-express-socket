<script setup>
import { ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, requiredIf } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useScope } from '@/stores/appscope';
import { useUser } from '@/stores/api/user';

const { t } = useI18n();
const toast = useToast();

const Scope = useScope();
const User = useUser();

const emits = defineEmits(['close']);

defineExpose({
  toggle: async ({ id }) => {
    try {
      if (id) record.value = await User.findOne({ id });
      else record.value = User.$reset();
      visible.value = true;
    } catch (err) {
      visible.value = false;
      record.value = User.$reset();
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

const editingScopes = ref([]);

const record = ref({});

const $validate = useVuelidate(
  {
    login: { required },
    // password: {
    //   required: requiredIf(() => (record?.value?.id ? false : true))
    // },
    name: { required },
    email: { required },
    phone: { required },
    isActive: { required },
    isAdmin: { required }
  },
  record
);

const onClose = () => {
  visible.value = false;
  $validate.value.$reset();
  record.value = User.$reset();
  emits('close', {});
};

const onCreateRecord = async () => {
  record.value = User.$reset();
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
    await User.removeOne(record.value);
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
    if (record?.value?.id) {
      await User.updateOne(record.value);
      toast.add({
        severity: 'success',
        summary: t('HD Information'),
        detail: t('Record is updated'),
        life: 3000
      });
    } else {
      await User.createOne(record.value);
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

const scopeTabs = ref(
  Array.from({ length: 10 }, (_, i) => ({ title: `Scope ${i + 1}`, content: 'Scope content' }))
);
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
          <AppIcons name="core-users" :size="40" class="mr-2" />
          <div>
            <p class="text-lg font-bold line-height-2 mb-0">{{ $t('User account') }}</p>
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
        <div class="field col-12 xl:col-4">
          <div class="field">
            <label for="login" class="font-bold">{{ $t('User login') }}</label>
            <InputText
              id="login"
              aria-describedby="login-help"
              v-model.trim="record.login"
              :placeholder="$t('User login')"
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
            <label for="password" class="block text-900 text-xl font-medium">
              {{ $t('User password') }}
            </label>
            <Password
              toggleMask
              id="password"
              aria-describedby="password-help"
              v-model.trim="record.password"
              :placeholder="$t('User password')"
              :promptLabel="$t('Choose a password')"
              :weakLabel="$t('Too simple')"
              :mediumLabel="$t('Average complexity')"
              :strongLabel="$t('Complex password')"
            >
              <template #header>
                <h6>{{ $t('Pick a password') }}</h6>
              </template>
              <template #footer>
                <Divider />
                <p class="mt-2">{{ $t('Suggestions') }}</p>
                <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                  <li>{{ $t('At least one lowercase') }}</li>
                  <li>{{ $t('At least one uppercase') }}</li>
                  <li>{{ $t('At least one numeric') }}</li>
                  <li>{{ $t('Minimum 6 characters') }}</li>
                </ul>
              </template>
            </Password>
          </div>

          <div class="field">
            <label for="name" class="font-bold">{{ $t('User name') }}</label>
            <InputText
              id="name"
              aria-describedby="name-help"
              v-model.trim="record.name"
              :placeholder="$t('User name')"
              :class="{ 'p-invalid': !!$validate.name.$errors.length }"
            />
            <small
              id="name-help"
              class="p-error"
              v-for="error in $validate.name.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="email" class="font-bold">{{ $t('User email') }}</label>
            <InputText
              id="email"
              aria-describedby="email-help"
              v-model.trim="record.email"
              :placeholder="$t('User email')"
              :class="{ 'p-invalid': !!$validate.email.$errors.length }"
            />
            <small
              id="email-help"
              class="p-error"
              v-for="error in $validate.email.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="phone" class="font-bold">{{ $t('User phone') }}</label>
            <InputText
              id="phone"
              aria-describedby="phone-help"
              v-model.trim="record.phone"
              :placeholder="$t('User phone')"
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

          <div class="field">
            <label for="isActive" class="font-bold">{{ $t('Activated account') }}</label>
            <br />
            <InputSwitch
              id="isActive"
              aria-describedby="isActive-help"
              v-model="record.isActive"
              :class="{ 'p-invalid': !!$validate.isActive.$errors.length }"
            />

            <small
              id="isActive-help"
              class="p-error"
              v-for="error in $validate.isActive.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="isAdmin" class="font-bold">{{ $t('Admin account') }}</label>
            <br />
            <InputSwitch
              id="isAdmin"
              aria-describedby="isAdmin-help"
              v-model="record.isAdmin"
              :class="{ 'p-invalid': !!$validate.isAdmin.$errors.length }"
            />
            <small
              id="isAdmin-help"
              class="p-error"
              v-for="error in $validate.isAdmin.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </small>
          </div>
        </div>

        <div class="field col-12 xl:col-8">
          <TabView :scrollable="true" class="tabview-custom h-30rem overflow-y-auto">
            <TabPanel v-for="(tab, index) in Scope.scopeGroups" :key="`tab-${index}`">
              <template #header>
                <div class="w-max">
                  <i class="pi pi-cog mr-2"></i>
                  <span>{{ tab.name }}</span>
                </div>
              </template>
              <p>{{ tab.items }}</p>
            </TabPanel>
          </TabView>
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
::v-deep(.p-input-icon-right > svg) {
  right: 0.5rem !important;
  cursor: pointer;
}
</style>
