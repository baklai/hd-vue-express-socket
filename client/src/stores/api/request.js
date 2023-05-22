import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/apperror';

export const useRequest = defineStore('request', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

  function $reset() {
    return {
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
      return await helpdesk.emit('request:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id, populate = true }) {
    try {
      return await helpdesk.emit('request:find:one', { id, populate });
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
      return await helpdesk.emit('request:create:one', {
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
      return await helpdesk.emit('request:update:one', {
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
      return await helpdesk.emit('request:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { $reset, findAll, findOne, createOne, updateOne, removeOne };
});
