<script setup>
import { ref, onMounted, inject } from 'vue';
import { useI18n } from 'vue-i18n';

import { dateToLocaleStr } from '@/service/DataFilters';

const helpdesk = inject('helpdesk');

const { locale } = useI18n();

const visible = ref(false);

const refEnd = ref();
const badge = ref();
const sound = ref();
const message = ref();
const chatHistory = ref([]);

const sendeMessage = () => {
  if (message.value) {
    helpdesk.emit('chat:message', { message: message.value });
    chatHistory.value.push({
      datetime: new Date(),
      username: helpdesk.user.fullname,
      message: message.value,
      key: 'out'
    });
    message.value = null;
    badge.value = null;
    refEnd.value.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  sound.value = new Audio();
  sound.value.src = '/sound/msg.mp3';
  badge.value = null;
  helpdesk.socket.on('chat:message', ({ response }) => {
    chatHistory.value.push({
      datetime: response.datetime,
      username: response.username,
      message: response.message,
      key: 'in'
    });
    sound.value.play();
    if (!visible.value) badge.value = '1+';
    else badge.value = null;
  });
});
</script>

<template>
  <i v-badge.success="badge" class="p-overlay-badge mx-2" v-if="badge">
    <Button
      text
      plain
      rounded
      icon="pi pi-whatsapp"
      iconClass="text-3xl"
      aria-haspopup="true"
      aria-controls="online-clients-menu"
      class="w-3rem h-3rem hover:text-color"
      v-tooltip.bottom="$t('HD Chat')"
      @click="visible = !visible"
    />
  </i>

  <Button
    v-else
    text
    plain
    rounded
    icon="pi pi-whatsapp"
    iconClass="text-3xl"
    aria-haspopup="true"
    aria-controls="online-clients-menu"
    class="w-3rem h-3rem hover:text-color ml-2"
    v-tooltip.bottom="$t('HD Chat')"
    @click="visible = !visible"
  />

  <Dialog
    closable
    draggable
    dismissableMask
    v-model:visible="visible"
    :header="$t('HD Chat')"
    class="p-fluid p-dialog"
    contentStyle="height: 35rem; background-image: url('/img/bg-chat.webp');"
    contentClass="w-30rem border-y-1 border-x-none border-solid surface-border p-0"
  >
    <template #header>
      <div class="flex align-content-center flex-wrap cursor-move">
        <div class="flex align-items-center justify-content-center mr-3">
          <i class="pi pi-comments text-5xl text-blue-500"></i>
        </div>
        <div class="flex align-items-center justify-content-center mr-4">
          <div class="flex flex-column">
            <h5 class="mb-0">{{ $t('HD Chat') }}</h5>
            <p>{{ $t('Chat of the technical support') }}</p>
          </div>
        </div>
      </div>
    </template>

    <template #default>
      <ul class="px-4">
        <li
          class="list-none mb-3"
          :key="`chat-msg-${index}`"
          v-for="({ key, datetime, username, message }, index) of chatHistory"
        >
          <div
            class="flex flex-column border-round-2xl p-2"
            :class="key === 'in' ? 'mr-8 bg-yellow-100' : 'ml-8 bg-blue-100'"
          >
            <div
              class="flex align-items-center"
              :class="key === 'in' ? 'justify-content-start' : 'justify-content-end'"
              v-if="key === 'in'"
            >
              <span class="font-semibold text-primary p-2">
                {{ username }}
              </span>
            </div>

            <div
              class="flex align-items-center"
              :class="key === 'in' ? 'justify-content-start' : 'justify-content-end'"
            >
              <span class="text-gray-900 text-lg font-normal line-height-1 white-space-normal p-2">
                {{ message }}
              </span>
            </div>

            <div class="flex align-items-center justify-content-end">
              <small class="text-gray-600">
                {{ dateToLocaleStr(datetime, locale) }}
              </small>
            </div>
          </div>
        </li>
      </ul>
      <p class="text-center py-6" ref="refEnd"></p>
    </template>

    <template #footer>
      <div class="flex justify-content-between">
        <span class="p-input-icon-right">
          <i class="pi pi-send cursor-pointer px-2" @click="sendeMessage" />
          <InputText
            v-model="message"
            class="p-inputtext-lg shadow-none border-none focus:border-none outline-none"
            :placeholder="$t('Input your message...')"
            @keypress.enter="sendeMessage"
          />
        </span>
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
::v-deep(.p-badge.p-component) {
  top: 6px;
  right: 6px;
}
</style>
