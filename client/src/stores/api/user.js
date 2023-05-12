import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/apperror';

export const useUser = defineStore('user', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  function $init() {
    return {
      id: null,
      login: null,
      password: null,
      name: null,
      email: null,
      phone: null,
      isActive: false,
      isAdmin: false,
      scope: []
    };
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

  async function createOne({ payload }) {
    try {
      return await helpdesk.emit('user:create:one', { ...payload });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, payload }) {
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

  return { $init, findAll, findOne, createOne, updateOne, removeOne };
});
