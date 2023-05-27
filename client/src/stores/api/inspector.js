import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

export const useInspector = defineStore('inspector', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  function $reset() {
    return {};
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('inspector:find:all', { ...query });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('inspector:find:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function createOne(payload) {
    try {
      return await helpdesk.emit('inspector:create:one', { ...payload });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function updateOne({ id, payload }) {
    try {
      return await helpdesk.emit('inspector:update:one', { id, ...payload });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('inspector:remove:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return { $reset, findAll, findOne, createOne, updateOne, removeOne };
});
