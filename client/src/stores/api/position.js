import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/apperror';

export const usePosition = defineStore('position', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  const record = ref({});

  const records = ref([]);

  function $reset() {
    record.value = {
      id: null,
      title: null
    };
  }

  async function findAll(query) {
    try {
      records.value = await helpdesk.emit('position:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      record.value = await helpdesk.emit('position:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title }) {
    try {
      return await helpdesk.emit('position:create:one', { title });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title }) {
    try {
      return await helpdesk.emit('position:update:one', { id, title });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('position:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, records, $reset, findAll, findOne, createOne, updateOne, removeOne };
});
