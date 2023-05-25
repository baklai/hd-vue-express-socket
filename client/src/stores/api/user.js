import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

export const useUser = defineStore('user', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  function $reset() {
    return {
      id: null,
      login: 'nullnullnull',
      password: 'nullnullnunullll',
      fullname: 'null',
      email: 'null@null.nu',
      phone: 'nullnullnullnull',
      isActive: false,
      isAdmin: false,
      scope: []
    };
  }

  async function find(query) {
    try {
      return await helpdesk.emit('user:find', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('user:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('user:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ ...payload }) {
    try {
      return await helpdesk.emit('user:create:one', { ...payload });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, ...payload }) {
    try {
      return await helpdesk.emit('user:update:one', { id, ...payload });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('user:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { $reset, find, findAll, findOne, createOne, updateOne, removeOne };
});
