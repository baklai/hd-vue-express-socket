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
      throw new Error(err.message);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('logger:find:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('logger:remove:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function removeAll(payload) {
    try {
      return await helpdesk.emit('logger:remove:all', { ...payload });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return { $reset, findAll, findOne, removeOne, removeAll };
});
