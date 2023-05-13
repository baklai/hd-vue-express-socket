import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/apperror';

export const useUnit = defineStore('unit', () => {
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
      records.value = await helpdesk.emit('unit:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      record.value = await helpdesk.emit('unit:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title }) {
    try {
      return await helpdesk.emit('unit:create:one', { title });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title }) {
    try {
      return await helpdesk.emit('unit:update:one', { id, title });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('unit:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, records, $reset, findAll, findOne, createOne, updateOne, removeOne };
});
