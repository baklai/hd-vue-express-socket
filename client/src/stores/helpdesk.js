import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useHelpdesk = defineStore('helpdesk', () => {
  const users = ref([]);

  const timeout = ref();

  const usersCount = computed(() => users.value.length);

  const sessionTimeOut = computed(() => timeout.value);

  function setUsers(value) {
    users.value = value;
  }

  function updateTimeout(value) {
    timeout.value = value;
  }

  return { timeout, users, usersCount, sessionTimeOut, setUsers, updateTimeout };
});
