import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

export const useUnsoftware = defineStore('unsoftware', () => {
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
      return await helpdesk.emit('unsoftware:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('unsoftware:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ name, comment = '-' }) {
    try {
      return await helpdesk.emit('unsoftware:create:one', { name, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, name, comment = '-' }) {
    try {
      return await helpdesk.emit('unsoftware:update:one', { id, name, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('unsoftware:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { $reset, findAll, findOne, createOne, updateOne, removeOne };
});
