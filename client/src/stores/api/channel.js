import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/apperror';

export const useChannel = defineStore('channel', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  const record = ref({});

  const records = ref({});

  function $init() {
    return {
      locationFrom: null,
      unitFrom: null,
      locationTo: null,
      unitTo: null,
      level: null,
      type: null,
      speed: null,
      status: null,
      operator: null,
      composition: null
    };
  }

  async function findAll(query) {
    try {
      records.value = await helpdesk.emit('channel:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      record.value = await helpdesk.emit('channel:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({
    locationFrom,
    unitFrom,
    locationTo,
    unitTo,
    level,
    type,
    speed,
    status,
    operator,
    composition
  }) {
    try {
      return await helpdesk.emit('channel:create:one', {
        locationFrom,
        unitFrom,
        locationTo,
        unitTo,
        level,
        type,
        speed,
        status,
        operator,
        composition
      });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({
    id,
    locationFrom,
    unitFrom,
    locationTo,
    unitTo,
    level,
    type,
    speed,
    status,
    operator,
    composition
  }) {
    try {
      return await helpdesk.emit('channel:update:one', {
        id,
        locationFrom,
        unitFrom,
        locationTo,
        unitTo,
        level,
        type,
        speed,
        status,
        operator,
        composition
      });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('channel:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, records, $init, findAll, findOne, createOne, updateOne, removeOne };
});
