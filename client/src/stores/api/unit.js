import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

export const useUnit = defineStore('unit', () => {
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
      return await helpdesk.emit('unit:find:all', { ...query });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('unit:find:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function createOne({ title }) {
    try {
      return await helpdesk.emit('unit:create:one', { title });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function updateOne({ id, title }) {
    try {
      return await helpdesk.emit('unit:update:one', { id, title });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('unit:remove:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return { $reset, findAll, findOne, createOne, updateOne, removeOne };
});
