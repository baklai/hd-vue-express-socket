import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useHelpdesk = defineStore('helpdesk', () => {
  const users = ref([]);

  const usersCount = computed(() => users.value.length);

  function setUsers(value) {
    users.value = value;
  }

  return { users, usersCount, setUsers };
});
