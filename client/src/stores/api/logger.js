import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

export const useLogger = defineStore('logger', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  function $reset() {
    return {};
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('logger:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('logger:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('logger:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeAll(payload) {
    try {
      return await helpdesk.emit('logger:remove:all', { ...payload });
    } catch (err) {
      error.setError(err);
    }
  }

  return { $reset, findAll, findOne, removeOne, removeAll };
});
