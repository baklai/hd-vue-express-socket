import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/apperror';

export const useFilehosting = defineStore('filehosting', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      return await helpdesk.emit('filehosting:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll };
});
