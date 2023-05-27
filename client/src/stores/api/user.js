import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

export const useUser = defineStore('user', () => {
  const helpdesk = inject('helpdesk');

  const error = useError();

  function $reset() {
    return {
      id: null,
      login: null,
      password: null,
      fullname: null,
      email: null,
      phone: null,
      timeout: 15,
      isActive: false,
      isAdmin: false,
      scope: []
    };
  }

  async function find(query) {
    try {
      return await helpdesk.emit('user:find', { ...query });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('user:find:all', { ...query });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('user:find:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function createOne({ ...payload }) {
    try {
      return await helpdesk.emit('user:create:one', { ...payload });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function updateOne({ id, ...payload }) {
    try {
      return await helpdesk.emit('user:update:one', { id, ...payload });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('user:remove:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return { $reset, find, findAll, findOne, createOne, updateOne, removeOne };
});
