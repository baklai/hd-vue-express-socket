import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useError = defineStore('error', () => {
  const error = ref(null);

  const getErrorMessage = computed(() => error.value);

  function setError(err) {
    error.value = typeof err === 'string' ? err : err?.message || null;
  }

  function clearError() {
    error.value = null;
  }

  return { error, getErrorMessage, setError, clearError };
});
