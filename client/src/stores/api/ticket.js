import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/apperror';

export const useTicket = defineStore('ticket', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  const record = ref({});

  const records = ref({});

  function $reset() {
    record.value = {
      fullname: null,
      phone: null,
      position: null,
      ipaddress: null,
      mail: null,
      location: null,
      company: null,
      branch: null,
      enterprise: null,
      department: null,
      request: null,
      workerOpen: null,
      workerClose: null,
      closed: null,
      comment: null,
      conclusion: null
    };
  }

  async function findAll(query) {
    try {
      records.value = await helpdesk.emit('ticket:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id, populate = true }) {
    try {
      record.value = await helpdesk.emit('ticket:find:one', { id, populate });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({
    fullname,
    phone,
    position,
    ipaddress,
    mail,
    location,
    company,
    branch,
    enterprise,
    department,
    request,
    workerOpen,
    workerClose,
    closed,
    comment,
    conclusion
  }) {
    try {
      return await helpdesk.emit('ticket:create:one', {
        fullname,
        phone,
        position,
        ipaddress,
        mail,
        location,
        company,
        branch,
        enterprise,
        department,
        request,
        workerOpen,
        workerClose,
        closed,
        comment,
        conclusion
      });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({
    id,
    fullname,
    phone,
    position,
    ipaddress,
    mail,
    location,
    company,
    branch,
    enterprise,
    department,
    request,
    workerOpen,
    workerClose,
    closed,
    comment,
    conclusion
  }) {
    try {
      return await helpdesk.emit('ticket:update:one', {
        id,
        fullname,
        phone,
        position,
        ipaddress,
        mail,
        location,
        company,
        branch,
        enterprise,
        department,
        request,
        workerOpen,
        workerClose,
        closed,
        comment,
        conclusion
      });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('ticket:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, records, $reset, findAll, findOne, createOne, updateOne, removeOne };
});
