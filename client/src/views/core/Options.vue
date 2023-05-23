<script setup>
import { ref, onMounted, inject } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { useNotification } from '@/stores/api/notification';
import { useUser } from '@/stores/api/user';

const { t } = useI18n();
const toast = useToast();
const helpdesk = inject('helpdesk');

const User = useUser();
const Notification = useNotification();

const message = ref();
const notification = ref({});
const users = ref([]);

const $validate = useVuelidate(
  { title: { required }, text: { required }, users: { required } },
  notification
);

const onSendNotification = async () => {
  const valid = await $validate.value.$validate();
  if (valid) {
    try {
      await Promise.allSettled[
        notification.value.users.map(({ id }) =>
          Notification.createOne({
            title: notification.value.title,
            text: notification.value.text,
            userID: id
          })
        )
      ];
      $validate.value.$reset();
      notification.value = Notification.$reset();
      toast.add({
        severity: 'success',
        summary: t('HD Information'),
        detail: t('All messages have been sent'),
        life: 3000
      });
    } catch (err) {
      toast.add({
        severity: 'warn',
        summary: t('HD Warning'),
        detail: t(err?.message),
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

const onSendMessage = async () => {
  try {
    const response = await helpdesk.emit('message', message.value);
    message.value = null;
    toast.add({
      severity: 'success',
      summary: t('HD Information'),
      detail: t(response),
      life: 3000
    });
  } catch (err) {
    toast.add({
      severity: 'warn',
      summary: t('HD Warning'),
      detail: t(err?.message),
      life: 3000
    });
  }
};

onMounted(async () => {
  notification.value = Notification.$reset();
  users.value = await User.find({});
});
</script>

<template>
  <div className="col-12">
    <div class="flex align-content-center mb-4">
      <div class="flex align-items-center justify-content-center mr-2">
        <AppIcons :name="$route?.name" :size="42" />
      </div>
      <div>
        <h5 class="text-sm text-color-secondary m-0">
          {{ $t($route?.meta?.title) }}
        </h5>
        <h3 class="m-0">{{ $t($route?.meta?.description) }}</h3>
      </div>
    </div>

    <div class="grid w-full align-content-start">
      <div class="col-12 lg:col-6 xl:col-3">
        <div class="card">
          <div class="flex justify-content-between mb-4">
            <div class="flex align-items-center justify-content-center">
              <i class="pi pi-bell text-2xl mr-2"></i>
              <p class="font-medium text-lg mb-0">{{ $t('HD Notification') }}</p>
            </div>
            <div class="flex align-items-center justify-content-center">
              <Button
                outlined
                severity="info"
                :label="$t('Send')"
                icon="pi pi-send"
                badgeClass="p-badge-success"
                :badge="notification?.users?.length?.toString()"
                v-tooltip.bottom="$t('Send notification')"
                @click.prevent="onSendNotification"
              />
            </div>
          </div>

          <form @submit.prevent="onSendNotification" class="p-fluid">
            <div class="field">
              <label for="notification-title">{{ $t('Notification title') }}</label>
              <InputText
                id="notification-title"
                v-model.trim="notification.title"
                :placeholder="$t('Notification title')"
                :class="{ 'p-invalid': !!$validate.title.$errors.length }"
              />
              <small class="p-error" v-for="error in $validate.title.$errors" :key="error.$uid">
                {{ $t(error.$message) }}
              </small>
            </div>

            <div class="field">
              <label for="notification-text">{{ $t('Notification text') }}</label>
              <Textarea
                rows="5"
                id="notification-text"
                v-model.trim="notification.text"
                :placeholder="$t('Notification text')"
              />
              <small class="p-error" v-for="error in $validate.text.$errors" :key="error.$uid">
                {{ $t(error.$message) }}
              </small>
            </div>

            <div class="field">
              <label for="notification-users">{{ $t('Notification users') }}</label>
              <MultiSelect
                id="notification-users"
                v-model="notification.users"
                :options="users"
                optionLabel="name"
                :maxSelectedLabels="3"
                :placeholder="$t('Notification users')"
                class="w-full"
              >
                <template #option="slotProps">
                  <div class="flex align-items-center">
                    <Avatar icon="pi pi-user" shape="circle" class="mr-2" />
                    <p class="font-semibold">{{ slotProps.option.name }}</p>
                  </div>
                </template>
              </MultiSelect>
              <small class="p-error" v-for="error in $validate.users.$errors" :key="error.$uid">
                {{ $t(error.$message) }}
              </small>
            </div>
          </form>
        </div>

        <div class="card">
          <div class="flex justify-content-between mb-4">
            <div class="flex align-items-center justify-content-center">
              <i class="pi pi-bell text-2xl mr-2"></i>
              <p class="font-medium text-lg mb-0">{{ $t('HD Online message') }}</p>
            </div>
            <div class="flex align-items-center justify-content-center">
              <Button
                outlined
                severity="info"
                :label="$t('Send')"
                icon="pi pi-send"
                badgeClass="p-badge-success"
                :badge="$helpdesk?.users?.length?.toString()"
                v-tooltip.bottom="$t('Send message')"
                @click.prevent="onSendMessage"
              />
            </div>
          </div>

          <form @submit.prevent="onSendMessage" class="p-fluid">
            <div class="field">
              <label for="message-text">{{ $t('Message text') }}</label>
              <Textarea
                rows="5"
                id="message-text"
                v-model.trim="message"
                :placeholder="$t('Message text')"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
