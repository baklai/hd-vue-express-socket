<script setup>
import { ref, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, ipAddress } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useUser } from '@/stores/api/user';

const { t } = useI18n();
const toast = useToast();
const User = useUser();

const emits = defineEmits(['close']);

defineExpose({
  toggle: async ({ id }) => {
    try {
      if (id) record.value = await User.findOne({ id });
      else record.value = User.$reset();
      records.value = await User.findAll({});
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
const records = ref([]);
const $validate = useVuelidate(
  {
    login: { required },
    password: { required },
    name: { required },
    email: { required },
    phone: { required },
    isActive: { required },
    isAdmin: { required },
    scope: { required }
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

const tabs = ref([
  { title: 'Title 1', content: 'Content 1' },
  { title: 'Title 2', content: 'Content 2' },
  { title: 'Title 3', content: 'Content 3' }
]);

const scrollableTabs = ref(
  Array.from({ length: 10 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }))
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
        <div class="field col-4">
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

          <div class="field my-2">
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
              :class="{ 'p-invalid': !!$validate.password.$errors.length }"
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
            <small
              id="password-help"
              class="p-error"
              v-for="error in $validate.password.$errors"
              :key="error.$uid"
            >
              {{ $t(error.$message) }}
            </small>
          </div>

          <div class="field">
            <label for="isActive" class="font-bold">{{ $t('Activated account') }}</label>
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

        <div class="field col-8">
          <TabView :scrollable="true" class="tabview-custom h-30rem overflow-y-auto">
            <TabPanel v-for="tab in scrollableTabs" :key="tab.title" class="">
              <template #header>
                <div class="w-10rem">
                  <i class="pi pi-cog mr-2"></i>
                  <span>{{ tab.title }}</span>
                </div>
              </template>
              <p>{{ tab.content }}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Est vitae et labore nobis dolorum quia temporibus, non a totam
                explicabo perferendis, numquam inventore unde tenetur quam, vero reiciendis officiis
                sequi itaque ex. Dolorem expedita nostrum sequi, cumque illo voluptatem quo
                quibusdam non assumenda cupiditate. Soluta, rem velit quam ipsum veniam saepe
                delectus id fugit cumque aliquam vero et unde sequi architecto voluptatem sapiente
                odio officia. Distinctio, quibusdam placeat esse, repellendus ea deleniti nam labore
                doloribus vero optio consequatur beatae accusamus eius molestias neque maxime rerum
                facere architecto nobis? Vel ad neque, dicta sint, ullam libero eligendi repellat
                rerum sed officiis, quo ea enim error sit voluptatem eum. Nesciunt aliquid officia
                dolor quod, voluptatibus, aut voluptas facere reiciendis libero exercitationem
                necessitatibus non ullam sapiente temporibus iste minima ad, odit atque modi ducimus
                adipisci veniam consequuntur fuga? Beatae, pariatur? Fuga, aut? Autem laborum iusto
                expedita saepe animi ab modi iste, culpa, repellat dolor repudiandae? Iure officia
                nisi obcaecati et odio temporibus placeat laborum aspernatur culpa, illo ad,
                deleniti sunt doloribus perferendis sit. Minima blanditiis quam laboriosam obcaecati
                consequatur. Nemo nam animi culpa doloremque architecto voluptatibus enim similique.
                Non error corporis, expedita ratione ex alias culpa quos iusto totam explicabo
                eligendi ad consequatur autem nulla consectetur minus neque modi provident ea
                numquam et eaque aliquid. Vitae, quod repudiandae! Beatae voluptatem libero nulla?
                Fuga totam nulla nesciunt quod reiciendis esse consectetur est, dolores fugiat porro
                blanditiis iure amet, quos, rem neque dolorem nobis. Corporis explicabo non est, cum
                animi ea repudiandae quod ipsa. Repudiandae, voluptatum fugiat nesciunt odit iusto
                aspernatur consequuntur tenetur facere, beatae enim magnam! Pariatur minima, sed
                enim eveniet ratione itaque modi hic omnis? Adipisci unde, blanditiis velit esse
                ipsum quod, recusandae quaerat doloremque repellat excepturi vitae autem soluta quos
                vero, optio iure consequuntur perspiciatis temporibus tempora at! Nemo minima
                asperiores laboriosam omnis et repellendus maiores animi obcaecati quae assumenda,
                sequi aspernatur ea adipisci, similique quaerat voluptate culpa veritatis sit earum
                reprehenderit quisquam fugiat. Doloribus at ad totam amet, illum perferendis
                temporibus corporis, tempore pariatur incidunt eos harum praesentium optio deserunt
                quo aperiam maiores officia placeat! Quasi rem libero natus tempore consequatur
                praesentium! Voluptatum aspernatur soluta quae, quidem repellendus commodi expedita
                deleniti quam corrupti consequatur maxime voluptates inventore, facilis at
                doloremque quis natus totam, accusamus dicta vero esse magnam! Molestiae,
                distinctio. Modi quisquam iusto aspernatur! Dolor aliquid nihil quos cumque porro
                reiciendis consequatur veniam eligendi modi ducimus magni officia perspiciatis qui,
                nam delectus? Mollitia dicta dignissimos molestias cumque, eligendi non voluptas
                minima fugiat doloribus minus, optio, ab asperiores hic id perspiciatis? Totam quia
                voluptatum, voluptas saepe ea libero eaque at. Voluptate magnam iste voluptatibus.
                Autem voluptates veritatis modi deleniti aut provident quidem et qui? Ratione
                incidunt atque animi doloremque ex. Veritatis exercitationem quo quae, omnis officia
                consequuntur assumenda at odio impedit rem, dignissimos facilis ad sapiente
                voluptatem sequi ut nemo aut dolor nulla quas voluptatum aliquid natus inventore
                laborum. Architecto nulla, temporibus eveniet voluptas nostrum fugit perferendis
                voluptates harum nemo enim quidem perspiciatis quis? Blanditiis, reprehenderit
                excepturi iure corporis dicta numquam et.
              </p>
            </TabPanel>
          </TabView>

          <!-- <DataTable
            dataKey="id"
            editMode="row"
            :value="record.scope"
            v-model:editingRows="editingScopes"
            @row-edit-save="
              (event) => {
                record.scope[event.index] = event.newData;
              }
            "
            tableClass="editable-cells-table"
            tableStyle="min-width: 30rem"
            class="p-datatable-sm overflow-x-auto"
          >
            <template #header>
              <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <label for="email" class="font-bold">{{ $t('Scope list') }}</label>
                <Button
                  text
                  plain
                  rounded
                  icon="pi pi-plus-circle"
                  iconClass="text-xl"
                  class="hover:text-color h-2rem w-2rem"
                  v-tooltip.bottom="$t('Create new scope')"
                  @click="record.scope.push({ scope: '', comment: '' })"
                />
              </div>
            </template>

            <template #empty>
              <div class="flex justify-content-center">
                <p class="text-color-secondary font-italic">{{ $t('No records found') }}</p>
              </div>
            </template>

            <Column field="scope" :header="$t('Scope key')" style="width: 40%">
              <template #editor="{ data, field }">
                <InputText v-model.trim="data[field]" :placeholder="$t('Scope key')" />
              </template>
            </Column>

            <Column field="comment" :header="$t('Comment')" style="width: 40%">
              <template #editor="{ data, field }">
                <InputText v-model.trim="data[field]" :placeholder="$t('Comment')" />
              </template>
            </Column>

            <Column
              field="edit"
              :rowEditor="true"
              style="width: 15%"
              bodyStyle="text-align: center"
            />

            <Column field="delete" bodyStyle="text-align: center">
              <template #body="{ index }">
                <Button
                  text
                  plain
                  rounded
                  icon="pi pi-trash"
                  class="hover:text-color"
                  v-tooltip.bottom="$t('Delete record')"
                  @click="record.scope.splice(index, 1)"
                />
              </template>
            </Column>
          </DataTable> -->
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
