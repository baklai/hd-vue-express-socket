import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/apperror';

export const useDepartment = defineStore('department', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  const record = ref({});

  const records = ref([]);

  function $reset() {
    record.value = {
      id: null,
      title: null,
      address: null,
      comment: null
    };
  }

  async function findAll(query) {
    try {
      records.value = await helpdesk.emit('department:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      record.value = await helpdesk.emit('department:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title, address = null, comment = null }) {
    try {
      return await helpdesk.emit('department:create:one', { title, address, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title, address = null, comment = null }) {
    try {
      return await helpdesk.emit('department:update:one', { id, title, address, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('department:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, records, $reset, findAll, findOne, createOne, updateOne, removeOne };
});
