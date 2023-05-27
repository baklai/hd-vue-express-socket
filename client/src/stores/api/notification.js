import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

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
      throw new Error(err.message);
    }
  }

  async function createOne({ title, text, userID }) {
    try {
      return await helpdesk.emit('notification:create:one', { title, text, userID });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('notification:remove:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return { $reset, findAll, createOne, removeOne };
});
