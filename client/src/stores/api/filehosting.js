import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/apperror';

export const useFileHosting = defineStore('filehosting', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  const records = ref([]);

  async function findAll(query) {
    try {
      records.value = await helpdesk.emit('filehosting:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  return { records, findAll };
});
