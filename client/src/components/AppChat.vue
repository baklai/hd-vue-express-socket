<script setup>
import { ref, onMounted, inject } from 'vue';
import { useI18n } from 'vue-i18n';

import { dateToLocaleStr } from '@/service/DataFilters';

const helpdesk = inject('helpdesk');

const { locale } = useI18n();

const visible = ref(false);

const refEnd = ref();
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

    refEnd.value.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  sound.value = new Audio();
  sound.value.src = '/sound/msg.mp3';

  helpdesk.socket.on('chat:message', ({ response }) => {
    chatHistory.value.push({
      datetime: response.datetime,
      username: response.username,
      message: response.message,
      key: 'in'
    });
    sound.value.play();
  });
});
</script>

<template>
  <button
    type="button"
    class="chat-button p-link"
    v-tooltip.left="$t('HD Chat')"
    @click="visible = !visible"
  >
    <i class="pi pi-comments"></i>
  </button>

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
.chat-button {
  display: block;
  position: fixed;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  background: var(--text-color-secondary);
  color: var(--primary-color-text);
  text-align: center;
  top: 45%;
  right: 0;
  margin-top: -1.5rem;
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transition: background-color var(--transition-duration);
  overflow: hidden;
  cursor: pointer;
  z-index: 999;
  box-shadow: -0.25rem 0 1rem rgba(0, 0, 0, 0.15);
}

.chat-button:hover {
  background: var(--text-color);
}

.chat-button i {
  font-size: 2rem;
  line-height: inherit;
  transform: rotate(0deg);
  transition: transform 1s;
}
</style>
