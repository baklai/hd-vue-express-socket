import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/apperror';

export const useLocation = defineStore('location', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  const record = ref({});

  const records = ref([]);

  function $reset() {
    record.value = {
      id: null,
      title: null,
      region: null
    };
  }

  async function findAll(query) {
    try {
      records.value = await helpdesk.emit('location:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      record.value = await helpdesk.emit('location:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title, region = null }) {
    try {
      return await helpdesk.emit('location:create:one', { title, region });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title, region = null }) {
    try {
      return await helpdesk.emit('location:update:one', { id, title, region });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('location:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, records, $reset, findAll, findOne, createOne, updateOne, removeOne };
});
