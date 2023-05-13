import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useError } from '@/stores/apperror';

export const useIPAddress = defineStore('ipaddress', () => {
  const helpdesk = inject('helpdesk');
  const error = useError();

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

  const record = ref({});

  const records = ref({});

  function $init() {
    record.value = {
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
      records.value = await helpdesk.emit('ipaddress:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id, populate = true }) {
    try {
      record.value = await helpdesk.emit('ipaddress:find:one', { id, populate });
    } catch (err) {
      error.setError(err);
    }
  }

  async function searchOne({ ipaddress }) {
    try {
      record.value = await helpdesk.emit('ipaddress:search:one', { ipaddress });
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
      return await helpdesk.emit('ipaddress:create:one', {
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
      return await helpdesk.emit('ipaddress:update:one', {
        id,
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
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('ipaddress:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { cidrs, record, records, $init, findAll, findOne, searchOne, createOne, updateOne, removeOne };
});
