import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/apperror';

export const useUnit = defineStore('unit', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  const record = ref({
    id: null,
    title: null
  });

  function $reset() {
    record.value = {
      id: null,
      title: null
    };
  }

  async function findAll(query) {
    try {
      const { data } = await axios.get('unit', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      const { data } = await axios.get(`unit/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title }) {
    try {
      const { data } = await axios.post('unit', { title });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title }) {
    try {
      const { data } = await axios.put(`unit/${id}`, { title });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      const { data } = await axios.delete(`unit/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
});

export const useLocation = defineStore('location', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  const record = ref({
    id: null,
    title: null,
    region: null
  });

  function $reset() {
    record.value = {
      id: null,
      title: null,
      region: null
    };
  }

  async function findAll(query) {
    try {
      const { data } = await axios.get('location', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      const { data } = await axios.get(`location/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title, region = null }) {
    try {
      const { data } = await axios.post('location', { title, region });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title, region = null }) {
    try {
      const { data } = await axios.put(`location/${id}`, { title, region });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      const { data } = await axios.delete(`location/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
});

export const useBranch = defineStore('branch', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  const record = ref({
    id: null,
    title: null,
    address: null,
    comment: null
  });

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
      const { data } = await axios.get('branch', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      const { data } = await axios.get(`branch/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title, address = null, comment = null }) {
    try {
      const { data } = await axios.post('branch', { title, address, comment });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title, address = null, comment = null }) {
    try {
      const { data } = await axios.put(`branch/${id}`, { title, address, comment });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      const { data } = await axios.delete(`branch/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
});

export const useСompany = defineStore('company', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  const record = ref({
    id: null,
    title: null,
    address: null,
    comment: null
  });

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
      const { data } = await axios.get('company', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      const { data } = await axios.get(`company/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title, address = null, comment = null }) {
    try {
      const { data } = await axios.post('company', { title, address, comment });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title, address = null, comment = null }) {
    try {
      const { data } = await axios.put(`company/${id}`, { title, address, comment });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      const { data } = await axios.delete(`company/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
});

export const useDepartment = defineStore('department', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  const record = ref({
    id: null,
    title: null,
    address: null,
    comment: null
  });

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
      const { data } = await axios.get('department', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      const { data } = await axios.get(`department/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title, address = null, comment = null }) {
    try {
      const { data } = await axios.post('department', { title, address, comment });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title, address = null, comment = null }) {
    try {
      const { data } = await axios.put(`department/${id}`, { title, address, comment });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      const { data } = await axios.delete(`department/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
});

export const useEnterprise = defineStore('enterprise', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  const record = ref({
    id: null,
    title: null,
    address: null,
    comment: null
  });

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
      const { data } = await axios.get('enterprise', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      const { data } = await axios.get(`enterprise/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title, address = null, comment = null }) {
    try {
      const { data } = await axios.post('enterprise', { title, address, comment });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, address = null, comment = null }) {
    try {
      const { data } = await axios.put(`enterprise/${id}`, { title, address, comment });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      const { data } = await axios.delete(`enterprise/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
});

export const usePosition = defineStore('position', () => {
  const axios = inject('axios');
  const error = useErrorStore();

  const record = ref({
    id: null,
    title: null
  });

  function $reset() {
    record.value = {
      id: null,
      title: null
    };
  }

  async function findAll(query) {
    try {
      const { data } = await axios.get('position', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      const { data } = await axios.get(`position/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title }) {
    try {
      const { data } = await axios.post('position', { title });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title }) {
    try {
      const { data } = await axios.put(`position/${id}`, { title });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      const { data } = await axios.delete(`position/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
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

  async function updateOne({ id, payload }) {
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
      const { data } = await axios.get('channel', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      const { data } = await axios.get(`channel/${id}`);
      return data;
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
      const { data } = await axios.post('channel', {
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
      return data;
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
      const { data } = await axios.put(`channel/${id}`, {
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
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      const { data } = await axios.delete(`channel/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { $init, findAll, findOne, createOne, updateOne, removeOne };
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

  async function updateOne({ id, payload }) {
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

  const cidrs = ref([
    { value: 32, mask: '255.255.255.255' },
    { value: 31, mask: '255.255.255.254' },
    { value: 30, mask: '255.255.255.252' },
    { value: 29, mask: '255.255.255.248' },
    { value: 28, mask: '255.255.255.240' },
    { value: 27, mask: '255.255.255.224' },
    { value: 26, mask: '255.255.255.192' },
    { value: 25, mask: '255.255.255.128' },
    { value: 24, mask: '255.255.255.0' },
    { value: 23, mask: '255.255.254.0' },
    { value: 22, mask: '255.255.252.0' },
    { value: 21, mask: '255.255.248.0' },
    { value: 20, mask: '255.255.240.0' },
    { value: 19, mask: '255.255.224.0' },
    { value: 18, mask: '255.255.192.0' },
    { value: 17, mask: '255.255.128.0' },
    { value: 16, mask: '255.255.0.0' },
    { value: 15, mask: '255.254.0.0' },
    { value: 14, mask: '255.252.0.0' },
    { value: 13, mask: '255.248.0.0' },
    { value: 12, mask: '255.240.0.0' },
    { value: 11, mask: '255.224.0.0' },
    { value: 10, mask: '255.192.0.0' },
    { value: 9, mask: '255.128.0.0' },
    { value: 8, mask: '255.0.0.0' },
    { value: 7, mask: '254.0.0.0' },
    { value: 6, mask: '252.0.0.0' },
    { value: 5, mask: '248.0.0.0' },
    { value: 4, mask: '240.0.0.0' },
    { value: 3, mask: '224.0.0.0' },
    { value: 2, mask: '192.0.0.0' },
    { value: 1, mask: '128.0.0.0' },
    { value: 0, mask: '0.0.0.0' }
  ]);

  function $init() {
    return {
      id: null,
      ipaddress: null,
      indexip: null,
      cidr: null,
      unit: null,
      internet: {
        mail: null,
        dateOpen: null,
        dateClose: null,
        comment: null
      },
      email: [],
      autoanswer: null,
      mail: null,
      date: null,
      location: null,
      company: null,
      branch: null,
      enterprise: null,
      department: null,
      fullname: null,
      position: null,
      phone: null,
      comment: null
    };
  }

  async function findAll(query) {
    try {
      const { data } = await axios.get('ipaddress', { params: { ...query } });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id, populate = true }) {
    try {
      const { data } = await axios.get(`ipaddress/${id}?populate=${populate}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({
    ipaddress,
    cidr,
    unit,
    internet,
    email = [],
    autoanswer,
    mail,
    date,
    location,
    company,
    branch,
    enterprise,
    department,
    fullname,
    position,
    phone,
    comment
  }) {
    try {
      const { data } = await axios.post('ipaddress', {
        ipaddress,
        cidr,
        unit,
        internet,
        email,
        autoanswer,
        mail,
        date,
        location,
        company,
        branch,
        enterprise,
        department,
        fullname,
        position,
        phone,
        comment
      });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({
    id,
    ipaddress,
    cidr,
    unit,
    internet,
    email = [],
    autoanswer,
    mail,
    date,
    location,
    company,
    branch,
    enterprise,
    department,
    fullname,
    position,
    phone,
    comment
  }) {
    try {
      const { data } = await axios.put(`ipaddress/${id}`, {
        ipaddress,
        cidr,
        unit,
        internet,
        email,
        autoanswer,
        mail,
        date,
        location,
        company,
        branch,
        enterprise,
        department,
        fullname,
        position,
        phone,
        comment
      });
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      const { data } = await axios.delete(`ipaddress/${id}`);
      return data;
    } catch (err) {
      error.setError(err);
    }
  }

  return { cidrs, $init, findAll, findOne, createOne, updateOne, removeOne };
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

  async function updateOne({ id, payload }) {
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

  async function updateOne({ id, payload }) {
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

  async function updateOne({ id, payload }) {
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

  async function updateOne({ id, payload }) {
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

  return { getVBS, getRDP, getVNC, getPING };
});
