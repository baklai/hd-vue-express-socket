import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

export const useFileHosting = defineStore('filehosting', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  async function findAll(query) {
    try {
      return await helpdesk.emit('filehosting:find:all', { ...query });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return { findAll };
});
