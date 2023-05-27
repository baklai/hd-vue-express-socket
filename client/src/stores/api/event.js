import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/error';

export const useEvent = defineStore('event', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

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

  function $reset() {
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
      throw new Error(err.message);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('event:find:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function createOne({ title, datetime, description }) {
    try {
      return await helpdesk.emit('event:create:one', { title, datetime, description });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function updateOne({ id, title, datetime, description }) {
    try {
      return await helpdesk.emit('event:update:one', { id, title, datetime, description });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('event:remove:one', { id });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return { eventType, $reset, findAll, findOne, createOne, updateOne, removeOne };
});
