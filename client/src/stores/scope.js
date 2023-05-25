import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useScope = defineStore('scope', () => {
  const client = ref([
    { scope: 'selected-html', comment: 'Enabled selected from HTML', value: true },
    { scope: 'channel:export:table', comment: 'Export channels in CSV file', value: true },
    { scope: 'vpn:export:table', comment: 'Export VPNs in CSV file', value: true },
    {
      scope: 'ipaddress:client:internet',
      comment: 'Show IP Addresses with Internet',
      value: true
    },
    { scope: 'ipaddress:client:email', comment: 'Show IP Addresses with E-Mails', value: true },
    { scope: 'ipaddress:export:table', comment: 'Export IP Addresses in CSV file', value: true },
    {
      scope: 'ipaddress:export:internet',
      comment: 'Export IP with Internet to CSV file',
      value: true
    },
    {
      scope: 'inspector:export:table',
      comment: 'Export PC SysInspector reports in CSV file',
      value: true
    },
    { scope: 'logger:export:table', comment: 'Export logs in CSV file', value: true }
  ]);

  const logger = ref([
    { scope: 'logger:find:all', comment: 'Read all logs from database', value: true },
    { scope: 'logger:remove:all', comment: 'Delete all logs in database', value: true }
  ]);

  const notification = ref([
    {
      scope: 'notification:find:all',
      comment: 'Read all notifications from database',
      value: true
    },
    {
      scope: 'notification:create:one',
      comment: 'Create one notification in database',
      value: true
    },
    {
      scope: 'notification:remove:one',
      comment: 'Delete one notification in database',
      value: true
    }
  ]);

  const user = ref([
    { scope: 'user:create:one', comment: 'Create user in database', value: true },
    { scope: 'user:find', comment: 'Read all user to list', value: true },
    { scope: 'user:find:one', comment: 'Read one user from database', value: true },
    { scope: 'user:find:all', comment: 'Read all users from database', value: true },
    { scope: 'user:update:one', comment: 'Update one user in database', value: true },
    { scope: 'user:remove:one', comment: 'Delete one user in database', value: true }
  ]);

  const event = ref([
    { scope: 'event:create:one', comment: 'Create event in database', value: true },
    { scope: 'event:find:one', comment: 'Read one event from database', value: true },
    { scope: 'event:find:all', comment: 'Read all events from database', value: true },
    { scope: 'event:update:one', comment: 'Update one event in database', value: true },
    { scope: 'event:remove:one', comment: 'Delete one event in database', value: true }
  ]);

  const channel = ref([
    { scope: 'channel:create:one', comment: 'Create channel in database', value: true },
    { scope: 'channel:find:one', comment: 'Read one channel from database', value: true },
    { scope: 'channel:find:all', comment: 'Read all channels from database', value: true },
    { scope: 'channel:update:one', comment: 'Update one channel in database', value: true },
    { scope: 'channel:remove:one', comment: 'Delete one channel in database', value: true }
  ]);

  const ipaddress = ref([
    { scope: 'ipaddress:create:one', comment: 'Create ipaddress in database', value: true },
    { scope: 'ipaddress:find:one', comment: 'Read one ipaddress from database', value: true },
    { scope: 'ipaddress:find:all', comment: 'Read all ipaddresses from database', value: true },
    { scope: 'ipaddress:update:one', comment: 'Update one ipaddress in database', value: true },
    { scope: 'ipaddress:remove:one', comment: 'Delete one ipaddress in database', value: true }
  ]);

  const vpn = ref([
    { scope: 'vpn:create:one', comment: 'Create vpn in database', value: true },
    { scope: 'vpn:find:one', comment: 'Read one vpn from database', value: true },
    { scope: 'vpn:find:all', comment: 'Read all vpns from database', value: true },
    { scope: 'vpn:update:one', comment: 'Update one vpn in database', value: true },
    { scope: 'vpn:remove:one', comment: 'Delete one vpn in database', value: true }
  ]);

  const request = ref([
    { scope: 'request:create:one', comment: 'Create request in database', value: true },
    { scope: 'request:find:one', comment: 'Read one request from database', value: true },
    { scope: 'request:find:all', comment: 'Read all requests from database', value: true },
    { scope: 'request:update:one', comment: 'Update one request in database', value: true },
    { scope: 'request:remove:one', comment: 'Delete one request in database', value: true }
  ]);

  const inspector = ref([
    { scope: 'inspector:find:one', comment: 'Read one SysInspector from database', value: true },
    { scope: 'inspector:find:all', comment: 'Read all SysInspectors from database', value: true },
    { scope: 'inspector:remove:one', comment: 'Delete one inspector in database', value: true }
  ]);

  const company = ref([
    { scope: 'company:create:one', comment: 'Create company in database', value: true },
    { scope: 'company:find:one', comment: 'Read one company from database', value: true },
    { scope: 'company:find:all', comment: 'Read all companies from database', value: true },
    { scope: 'company:update:one', comment: 'Update one company in database', value: true },
    { scope: 'company:remove:one', comment: 'Delete one company in database', value: true }
  ]);

  const branch = ref([
    { scope: 'branch:create:one', comment: 'Create branch in database', value: true },
    { scope: 'branch:find:one', comment: 'Read one branch from database', value: true },
    { scope: 'branch:find:all', comment: 'Read all branches from database', value: true },
    { scope: 'branch:update:one', comment: 'Update one branch in database', value: true },
    { scope: 'branch:remove:one', comment: 'Delete one branch in database', value: true }
  ]);

  const enterprise = ref([
    { scope: 'enterprise:create:one', comment: 'Create enterprise in database', value: true },
    { scope: 'enterprise:find:one', comment: 'Read one enterprise from database', value: true },
    { scope: 'enterprise:find:all', comment: 'Read all enterprises from database', value: true },
    {
      scope: 'enterprise:update:one',
      comment: 'Update one enterprise in database',
      value: false
    },
    { scope: 'enterprise:remove:one', comment: 'Delete one enterprise in database', value: false }
  ]);

  const department = ref([
    { scope: 'department:create:one', comment: 'Create department in database', value: true },
    { scope: 'department:find:one', comment: 'Read one department from database', value: true },
    { scope: 'department:find:all', comment: 'Read all departments from database', value: false },
    {
      scope: 'department:update:one',
      comment: 'Update one department in database',
      value: false
    },
    { scope: 'department:remove:one', comment: 'Delete one department in database', value: false }
  ]);

  const location = ref([
    { scope: 'location:create:one', comment: 'Create location in database', value: true },
    { scope: 'location:find:one', comment: 'Read one location from database', value: true },
    { scope: 'location:find:all', comment: 'Read all locations from database', value: false },
    { scope: 'location:update:one', comment: 'Update one location in database', value: false },
    { scope: 'location:remove:one', comment: 'Delete one location in database', value: false }
  ]);

  const position = ref([
    { scope: 'position:create:one', comment: 'Create position in database', value: true },
    { scope: 'position:find:one', comment: 'Read one position from database', value: true },
    { scope: 'position:find:all', comment: 'Read all positions from database', value: false },
    { scope: 'position:update:one', comment: 'Update one position in database', value: false },
    { scope: 'position:remove:one', comment: 'Delete one position in database', value: false }
  ]);

  const unit = ref([
    { scope: 'unit:create:one', comment: 'Create unit in database', value: true },
    { scope: 'unit:find:one', comment: 'Read one unit from database', value: true },
    { scope: 'unit:find:all', comment: 'Read all units from database', value: false },
    { scope: 'unit:update:one', comment: 'Update one unit in database', value: false },
    { scope: 'unit:remove:one', comment: 'Delete one unit in database', value: false }
  ]);

  const statistic = ref([
    { scope: 'statistic:ipaddress', comment: 'Read statistic of ipaddress', value: true },
    { scope: 'statistic:inspector', comment: 'Read statistic of SysInspector', value: true },
    { scope: 'statistic:request', comment: 'Read statistic of requests', value: true },
    { scope: 'statistic:dashboard', comment: 'Read statistic for dashboard', value: true }
  ]);

  const tool = ref([
    { scope: 'tool:command:oping', comment: 'Ping command', value: true },
    { scope: 'tool:script:inspector', comment: 'Create SysInspector script', value: true },
    { scope: 'tool:link:ping', comment: 'Create Ping Link', value: true },
    { scope: 'tool:link:rdp', comment: 'Create RDP link', value: true },
    { scope: 'tool:link:vnc', comment: 'Create VNC link', value: true }
  ]);

  const scopeGroups = computed(() => {
    return [
      {
        name: 'Web client options',
        items: [...client.value]
      },
      {
        name: 'Company database table',
        items: [...company.value]
      },
      {
        name: 'Branch database table',
        items: [...branch.value]
      },
      {
        name: 'Enterprise database table',
        items: [...enterprise.value]
      },
      {
        name: 'Department database table',
        items: [...department.value]
      },
      {
        name: 'Location database table',
        items: [...location.value]
      },
      {
        name: 'Position database table',
        items: [...position.value]
      },
      {
        name: 'Unit database table',
        items: [...unit.value]
      },
      {
        name: 'Calendar of events',
        items: [...event.value]
      },
      {
        name: 'Network information',
        items: [...channel.value, ...ipaddress.value, ...vpn.value]
      },
      {
        name: 'Help Desk Live Log',
        items: [...request.value]
      },
      {
        name: 'PC SysInspector',
        items: [...inspector.value]
      },
      {
        name: 'Statistic',
        items: [...statistic.value]
      },
      {
        name: 'HD User accounts',
        items: [...user.value]
      },
      {
        name: 'HD Logger system',
        items: [...logger.value]
      },
      {
        name: 'HD Notification system',
        items: [...notification.value]
      },
      {
        name: 'HD System tools',
        items: [...tool.value]
      }
    ];
  });

  const scopeLength = computed(
    () =>
      client.value.length +
      logger.value.length +
      notification.value.length +
      user.value.length +
      event.value.length +
      channel.value.length +
      ipaddress.value.length +
      vpn.value.length +
      request.value.length +
      inspector.value.length +
      company.value.length +
      branch.value.length +
      enterprise.value.length +
      department.value.length +
      location.value.length +
      position.value.length +
      unit.value.length +
      statistic.value.length +
      tool.value.length
  );

  function hasScope() {
    return true;
  }

  return { scopeGroups, scopeLength, hasScope };
});
