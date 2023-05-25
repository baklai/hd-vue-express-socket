import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

export const useExaccount = defineStore('exaccount', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  function $reset() {
    return {
      id: null,
      name: null,
      comment: null
    };
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('exaccount:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('exaccount:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ name, comment = '-' }) {
    try {
      return await helpdesk.emit('exaccount:create:one', { name, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, name, comment = '-' }) {
    try {
      return await helpdesk.emit('exaccount:update:one', { id, name, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('exaccount:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { $reset, findAll, findOne, createOne, updateOne, removeOne };
});
