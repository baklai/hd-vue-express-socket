import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/error';

export const useUnit = defineStore('unit', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('unit', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`unit/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('unit', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`unit/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`unit/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useLocation = defineStore('location', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('location', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`location/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('location', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`location/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`location/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useBranch = defineStore('branch', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('branch', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`branch/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('branch', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`branch/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`branch/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useCompany = defineStore('company', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('company', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`company/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('company', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`company/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`company/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useDepartment = defineStore('department', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('department', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`department/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('department', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`department/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`department/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useEnterprise = defineStore('enterprise', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('enterprise', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`enterprise/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('enterprise', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`enterprise/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`enterprise/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const usePosition = defineStore('position', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('position', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`position/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('position', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`position/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`position/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useEvent = defineStore('event', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('event', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`event/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('event', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`event/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`event/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useChannel = defineStore('channel', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('channel', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`channel/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('channel', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`channel/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`channel/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useInspector = defineStore('inspector', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('inspector', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`inspector/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('inspector', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`inspector/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`inspector/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useIPAddress = defineStore('ipaddress', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('ipaddress', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`ipaddress/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('ipaddress', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`ipaddress/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`ipaddress/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useNotification = defineStore('notification', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('notification', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`notification/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('notification', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`notification/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`notification/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useRequest = defineStore('request', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('request', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`request/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('request', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`request/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`request/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useUser = defineStore('user', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('user', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`user/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('user', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`user/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`user/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useStatistic = defineStore('statistic', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function inspector() {
    try {
      const { data } = await axios.get('statistic/inspector');
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function ipaddress() {
    try {
      const { data } = await axios.get('statistic/ipaddress');
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function request() {
    try {
      const { data } = await axios.get('statistic/request');
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function dashboard() {
    try {
      const { data } = await axios.get('statistic/dashboard');
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { inspector, ipaddress, request, dashboard };
});

export const useCloud = defineStore('cloud', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('cloud', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll };
});

export const useLogger = defineStore('logger', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      const { data } = await axios.get('logger', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne(id) {
    try {
      const { data } = await axios.get(`logger/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      const { data } = await axios.post('logger', { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne(id, payload) {
    try {
      const { data } = await axios.put(`logger/${id}`, { ...payload });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne(id) {
    try {
      const { data } = await axios.delete(`logger/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useTool = defineStore('tool', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  async function getVBS() {
    try {
      const { data } = await axios.get('tool/inspector');
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function getRDP(host) {
    try {
      const { data } = await axios.get('tool/rdp', { params: { ip: host } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function getVNC(host) {
    try {
      const { data } = await axios.get('tool/vnc', { params: { ip: host } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function getPING(host) {
    try {
      const { data } = await axios.get('tool/ping', { params: { ip: host } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function getOPING(host) {
    try {
      const { data } = await axios.get('tool/ping-online', { params: { ip: host } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { getVBS, getRDP, getVNC, getPING, getOPING };
});
