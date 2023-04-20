import { ref, inject } from 'vue';
import { defineStore } from 'pinia';
import { useErrorStore } from '@/stores/apperror';

export const useUnit = defineStore('unit', () => {
  const helpdesk = inject('helpdesk');
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
      return await helpdesk.emit('unit:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('unit:find:one', { id });
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

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
});

export const useLocation = defineStore('location', () => {
  const helpdesk = inject('helpdesk');
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
      return await helpdesk.emit('location:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('location:find:one', { id });
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

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
});

export const useBranch = defineStore('branch', () => {
  const helpdesk = inject('helpdesk');
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
      return await helpdesk.emit('branch:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('branch:find:one', { id });
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

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
});

export const useСompany = defineStore('company', () => {
  const helpdesk = inject('helpdesk');
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
      return await helpdesk.emit('company:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('company:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title, address = null, comment = null }) {
    try {
      return await helpdesk.emit('company:create:one', { title, address, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title, address = null, comment = null }) {
    try {
      return await helpdesk.emit('company:update:one', { id, title, address, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('company:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
});

export const useDepartment = defineStore('department', () => {
  const helpdesk = inject('helpdesk');
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
      return await helpdesk.emit('department:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('department:find:one', { id });
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

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
});

export const useEnterprise = defineStore('enterprise', () => {
  const helpdesk = inject('helpdesk');
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
      return await helpdesk.emit('enterprise:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('enterprise:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title, address = null, comment = null }) {
    try {
      return await helpdesk.emit('enterprise:create:one', { title, address, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title, address = null, comment = null }) {
    try {
      return await helpdesk.emit('enterprise:update:one', { id, title, address, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('enterprise:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
});

export const usePosition = defineStore('position', () => {
  const helpdesk = inject('helpdesk');
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
      return await helpdesk.emit('position:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('position:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title }) {
    try {
      return await helpdesk.emit('position:create:one', { title });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title }) {
    try {
      return await helpdesk.emit('position:update:one', { id, title });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('position:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { record, $reset, findAll, findOne, createOne, updateOne, removeOne };
});

export const useEvent = defineStore('event', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  function $init() {
    return {
      id: null,
      title: null,
      date: null,
      href: null,
      comment: null
    };
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('event:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('event:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ title, date, href, comment }) {
    try {
      return await helpdesk.emit('event:create:one', { title, date, href, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, title, date, href, comment }) {
    try {
      return await helpdesk.emit('event:update:one', { id, title, date, href, comment });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('event:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { $init, findAll, findOne, createOne, updateOne, removeOne };
});

export const useChannel = defineStore('channel', () => {
  const helpdesk = inject('helpdesk');
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
      return await helpdesk.emit('channel:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('channel:find:one', { id });
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

  return { $init, findAll, findOne, createOne, updateOne, removeOne };
});

export const useInspector = defineStore('inspector', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  function $init() {
    return {};
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('inspector:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('inspector:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      return await helpdesk.emit('inspector:create:one', { ...payload });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, payload }) {
    try {
      return await helpdesk.emit('inspector:update:one', { id, ...payload });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('inspector:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { $init, findAll, findOne, createOne, updateOne, removeOne };
});

export const useIPAddress = defineStore('ipaddress', () => {
  const helpdesk = inject('helpdesk');
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
      return await helpdesk.emit('ipaddress:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id, populate = true }) {
    try {
      return await helpdesk.emit('ipaddress:find:one', { id, populate });
    } catch (err) {
      error.setError(err);
    }
  }

  async function searchOne({ ipaddress }) {
    try {
      return await helpdesk.emit('ipaddress:search:one', { ipaddress });
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

  return { cidrs, $init, findAll, findOne, searchOne, createOne, updateOne, removeOne };
});

export const useVPNAddress = defineStore('vpn', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  function $init() {
    return {
      id: null,
      vpn: null,
      ipaddress: null,
      login: null,
      unit: null,
      location: null,
      company: null,
      branch: null,
      enterprise: null,
      department: null,
      position: null,
      fullname: null,
      phone: null,
      mail: null,
      dateOpen: null,
      dateClose: null,
      service: null,
      comment: null
    };
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('vpn:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id, populate = true }) {
    try {
      return await helpdesk.emit('vpn:find:one', { id, populate });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({
    vpn,
    ipaddress,
    login,
    unit,
    location,
    company,
    branch,
    enterprise,
    department,
    position,
    fullname,
    phone,
    mail,
    dateOpen,
    dateClose,
    service,
    comment
  }) {
    try {
      return await helpdesk.emit('vpn:create:one', {
        vpn,
        ipaddress,
        login,
        unit,
        location,
        company,
        branch,
        enterprise,
        department,
        position,
        fullname,
        phone,
        mail,
        dateOpen,
        dateClose,
        service,
        comment
      });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({
    id,
    vpn,
    ipaddress,
    login,
    unit,
    location,
    company,
    branch,
    enterprise,
    department,
    position,
    fullname,
    phone,
    mail,
    dateOpen,
    dateClose,
    service,
    comment
  }) {
    try {
      return await helpdesk.emit('vpn:update:one', {
        id,
        vpn,
        ipaddress,
        login,
        unit,
        location,
        company,
        branch,
        enterprise,
        department,
        position,
        fullname,
        phone,
        mail,
        dateOpen,
        dateClose,
        service,
        comment
      });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('vpn:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { $init, findAll, findOne, createOne, updateOne, removeOne };
});

export const useNotification = defineStore('notification', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      return await helpdesk.emit('notification:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('notification:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      return await helpdesk.emit('notification:create:one', { ...payload });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, payload }) {
    try {
      return await helpdesk.emit('notification:update:one', { id, ...payload });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('notification:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useRequest = defineStore('request', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  function $init() {
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

  return { $init, findAll, findOne, createOne, updateOne, removeOne };
});

export const useUser = defineStore('user', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  function $init() {
    return {
      id: null,
      login: null,
      password: null,
      name: null,
      email: null,
      phone: null,
      isActive: false,
      isAdmin: false,
      scope: []
    };
  }

  async function findAll(query) {
    try {
      return await helpdesk.emit('user:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('user:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne({ payload }) {
    try {
      return await helpdesk.emit('user:create:one', { ...payload });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, payload }) {
    try {
      return await helpdesk.emit('user:update:one', { id, ...payload });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('user:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { $init, findAll, findOne, createOne, updateOne, removeOne };
});

export const useStatistic = defineStore('statistic', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  async function inspector() {
    try {
      return await helpdesk.emit('statistic:inspector');
    } catch (err) {
      error.setError(err);
    }
  }

  async function ipaddress() {
    try {
      return await helpdesk.emit('statistic:ipaddress');
    } catch (err) {
      error.setError(err);
    }
  }

  async function request() {
    try {
      return await helpdesk.emit.get('statistic:request');
    } catch (err) {
      error.setError(err);
    }
  }

  async function dashboard() {
    try {
      return await helpdesk.emit('statistic:dashboard');
    } catch (err) {
      error.setError(err);
    }
  }

  return { inspector, ipaddress, request, dashboard };
});

export const useCloud = defineStore('cloud', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      return await helpdesk.emit('cloud', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll };
});

export const useLogger = defineStore('logger', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  async function findAll(query) {
    try {
      return await helpdesk.emit('logger:find:all', { ...query });
    } catch (err) {
      error.setError(err);
    }
  }

  async function findOne({ id }) {
    try {
      return await helpdesk.emit('logger:find:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  async function createOne(payload) {
    try {
      return await helpdesk.emit('logger:create:one', { ...payload });
    } catch (err) {
      error.setError(err);
    }
  }

  async function updateOne({ id, payload }) {
    try {
      return await helpdesk.emit('logger:update:one', { id, ...payload });
    } catch (err) {
      error.setError(err);
    }
  }

  async function removeOne({ id }) {
    try {
      return await helpdesk.emit('logger:remove:one', { id });
    } catch (err) {
      error.setError(err);
    }
  }

  return { findAll, findOne, createOne, updateOne, removeOne };
});

export const useTool = defineStore('tool', () => {
  const helpdesk = inject('helpdesk');
  const error = useErrorStore();

  async function getVBS() {
    try {
      return await helpdesk.emit('tool:inspector');
    } catch (err) {
      error.setError(err);
    }
  }

  async function getRDP(host) {
    try {
      return await helpdesk.emit('tool:rdp', { ip: host });
    } catch (err) {
      error.setError(err);
    }
  }

  async function getVNC(host) {
    try {
      return await helpdesk.emit('tool:vnc', { ip: host });
    } catch (err) {
      error.setError(err);
    }
  }

  async function getPING(host) {
    try {
      return await helpdesk.emit('tool:ping', { ip: host });
    } catch (err) {
      error.setError(err);
    }
  }

  return { getVBS, getRDP, getVNC, getPING };
});
