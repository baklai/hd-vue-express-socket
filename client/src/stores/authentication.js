import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuth = defineStore('auth', () => {
  const user = ref(null);

  const loggedIn = computed(() => !!user);

  function login() {
    return true;
  }

  function logout() {
    return true;
  }

  function hasScope() {
    return true;
  }

  return { user, loggedIn, login, logout, hasScope };
});
