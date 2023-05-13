import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/apperror';

export const useBranch = defineStore('branch', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  const record = ref({});

  const records = ref([]);

  function $init() {
    record.value = {
      id: null,
      title: null,
      address: null,
      comment: null
    };
  }

  async function findAll(query) {
    try {
      records.value = await helpdesk.emit('branch:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      record.value = await helpdesk.emit('branch:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title, address = null, comment = null }) {
    try {
      return await helpdesk.emit('branch:create:one', { title, address, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title, address = null, comment = null }) {
    try {
      return await helpdesk.emit('branch:update:one', { id, title, address, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('branch:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, records, $init, findAll, findOne, createOne, updateOne, removeOne };
});
