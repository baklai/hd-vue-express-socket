import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/apperror';

export const useNotification = defineStore('notification', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  function $reset() {
    return {
      title: null,
      text: null,
      users: null
    };
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('notification:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title, text, userID }) {
    try {
      return await helpdesk.emit('notification:create:one', { title, text, userID });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('notification:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { $reset, findAll, createOne, removeOne };
});
