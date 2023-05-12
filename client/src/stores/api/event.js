import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/apperror';

export const useEvent = defineStore('event', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  const eventType = ref({
    event: {
      color: '#fff',
      backgroundColor: '#2196f3'
    },
    meeting: {
      color: '#fff',
      backgroundColor: '#fbc02d'
    },
    deadline: {
      color: '#fff',
      backgroundColor: '#ff4032'
    },
    holiday: {
      color: '#fff',
      backgroundColor: '#607d8b'
    },
    birthday: {
      color: '#fff',
      backgroundColor: '#9c27b0'
    }
  });

  function $init() {
    return {
      id: null,
      title: null,
      datetime: null,
      description: null,
      eventType: null
    };
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('event:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('event:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title, datetime, description }) {
    try {
      return await helpdesk.emit('event:create:one', { title, datetime, description });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title, datetime, description }) {
    try {
      return await helpdesk.emit('event:update:one', { id, title, datetime, description });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('event:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { eventType, $init, findAll, findOne, createOne, updateOne, removeOne };
});
