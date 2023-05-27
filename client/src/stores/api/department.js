import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

export const useDepartment = defineStore('department', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  function $reset() {
    return {
      id: null,
      title: null,
      address: null,
      comment: null
    };
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('department:find:all', { ...query });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('department:find:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function createOne({ title, address = null, comment = null }) {
    try {
      return await helpdesk.emit('department:create:one', { title, address, comment });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function updateOne({ id, title, address = null, comment = null }) {
    try {
      return await helpdesk.emit('department:update:one', { id, title, address, comment });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('department:remove:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return { $reset, findAll, findOne, createOne, updateOne, removeOne };
});
