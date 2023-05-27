import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

export const usePosition = defineStore('position', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  function $reset() {
    return {
      id: null,
      title: null
    };
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('position:find:all', { ...query });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('position:find:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function createOne({ title }) {
    try {
      return await helpdesk.emit('position:create:one', { title });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function updateOne({ id, title }) {
    try {
      return await helpdesk.emit('position:update:one', { id, title });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('position:remove:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return { $reset, findAll, findOne, createOne, updateOne, removeOne };
});
