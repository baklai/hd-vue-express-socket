<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useСompany } from '@/stores/restfullapi';

const { t } = useI18n();
const toast = useToast();
const store = useСompany();

const props = defineProps(['show']);
const emit = defineEmits(['update:show']);

const rules = {
  title: { required }
};

const menu = ref();
const records = ref([]);
const options = ref([
  {
    label: t('Create record'),
    icon: 'pi pi-plus-circle',
    command: () => {
      store.$reset();
      toast.add({ severity: 'success', detail: t('Input new record'), life: 3000 });
    }
  },
  {
    label: t('Delete record'),
    icon: 'pi pi-trash',
    command: async () => {
      store.$reset();
      await removeRecord();
      await getRecords();
      toast.add({ severity: 'success', detail: t('Record is removed'), life: 3000 });
    }
  },
  {
    label: t('Update records'),
    icon: 'pi pi-sync',
    command: async () => {
      store.$reset();
      await getRecords();
      toast.add({ severity: 'success', detail: t('Records is updated'), life: 3000 });
    }
  }
]);

const open = computed({
  get() {
    return props.show;
  },
  set(value) {
    emit('update:show', value);
  }
});

const $v = useVuelidate(rules, { title: store.record.title });

const toggle = (event) => {
  menu.value.toggle(event);
};

const getRecords = async () => {
  records.value = await store.findAll();
};

const removeRecord = async () => {
  if (store?.record?.id) await store.removeOne(store.record.id);
};

const saveRecord = async () => {
  const valid = await $v.value.$validate();
  if (valid) {
    if (store?.record?.id) {
      await store.updateOne(store.record);
      toast.add({ severity: 'success', detail: t('Record is updated'), life: 3000 });
    } else {
      await store.createOne(store.record);
      toast.add({ severity: 'success', detail: t('Records update'), life: 3000 });
    }
    open.value = false;
  } else {
    toast.add({ severity: 'info', detail: t('Input login and password'), life: 3000 });
  }
};

watchEffect(async () => {
  store.$reset();
  if (open.value) await getRecords();
});
</script>

<template>
  <Menu ref="menu" :model="options" :popup="true" />

  <Dialog
    modal
    closable
    :draggable="false"
    v-model:visible="open"
    class="p-fluid w-3 min-w-min"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
  >
    <template #header>
      <div class="flex justify-content-between w-full">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-database text-4xl mr-3"></i>
          <div>
            <p class="text-lg font-bold mb-0">{{ $t('Сompany') }}</p>
            <p class="text-base font-normal text-color-secondary">
              {{ store?.record?.id ? t('Update current record') : t('Create new record') }}
            </p>
          </div>
        </div>

        <div class="flex gap-2 align-items-center">
          <Button
            text
            plain
            rounded
            icon="pi pi-ellipsis-v"
            class="mx-2"
            v-tooltip.bottom="'Options menu'"
            @click="toggle"
          />
        </div>
      </div>
    </template>

    <div class="field">
      <label for="database">{{ $t('Search in database') }}</label>
      <Dropdown
        id="database"
        filter
        autofocus
        v-model="store.record"
        :options="records"
        optionLabel="title"
        :placeholder="$t('Search in database')"
        class="w-full"
      />
    </div>

    <Divider type="solid" class="my-4" />

    <form @submit.prevent="saveRecord" class="p-fluid">
      <div class="field">
        <label for="title">{{ $t('Сompany name') }}</label>
        <InputText
          id="title"
          v-model.trim="store.record.title"
          :placeholder="$t('Сompany name')"
          :class="{ 'p-invalid': !!$v.title.$errors.length }"
        />
        <small class="p-error" v-for="error in $v.title.$errors" :key="error.$uid">
          {{ $t(error.$message) }}
        </small>
      </div>

      <div class="field">
        <label for="address">{{ $t('Сompany address') }}</label>
        <InputText
          id="address"
          v-model.trim="store.record.address"
          :placeholder="$t('Сompany address')"
        />
      </div>

      <div class="field">
        <label for="comment">{{ $t('Сompany comment') }}</label>
        <Textarea
          rows="5"
          id="comment"
          class="min-w-full"
          v-model.trim="store.record.comment"
          :placeholder="$t('Сompany comment')"
        />
      </div>
    </form>

    <template #footer>
      <Button text icon="pi pi-times" :label="$t('Cancel')" @click="open = false" />
      <Button
        text
        icon="pi pi-check"
        :label="$t('Save')"
        @click="saveRecord"
        :disabled="$v.$invalid"
      />
    </template>
  </Dialog>
</template>
