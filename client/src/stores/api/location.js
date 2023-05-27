import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

export const useLocation = defineStore('location', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  function $reset() {
    return {
      id: null,
      title: null,
      region: null
    };
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('location:find:all', { ...query });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('location:find:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function createOne({ title, region = null }) {
    try {
      return await helpdesk.emit('location:create:one', { title, region });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function updateOne({ id, title, region = null }) {
    try {
      return await helpdesk.emit('location:update:one', { id, title, region });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('location:remove:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return { $reset, findAll, findOne, createOne, updateOne, removeOne };
});
