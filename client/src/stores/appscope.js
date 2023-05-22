import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useScope = defineStore('scope', () => {
  const clientScopes = ref([
    { scope: 'selected-html', comment: 'Enabled selected from HTML' },
    { scope: 'channel:export:table', comment: 'Export channels in CSV file' },
    { scope: 'vpn:export:table', comment: 'Export VPNs in CSV file' },
    { scope: 'ipaddress:client:internet', comment: 'Show IP Addresses with Internet' },
    { scope: 'ipaddress:client:email', comment: 'Show IP Addresses with E-Mails' },
    { scope: 'ipaddress:export:table', comment: 'Export IP Addresses in CSV file' },
    { scope: 'ipaddress:export:internet', comment: 'Export IP with Internet to CSV file' },
    { scope: 'inspector:export:table', comment: 'Export PC SysInspector reports in CSV file' },
    { scope: 'logger:export:table', comment: 'Export logs in CSV file' }
  ]);

  const apiScopes = ref([
    { scope: 'logger:find:all', comment: 'Read all logs from database' },
    { scope: 'logger:remove:all', comment: 'Delete all logs in database' },

    { scope: 'notification:find:all', comment: 'Read all notifications from database' },
    { scope: 'notification:create:many', comment: 'Create many notification in database' },
    { scope: 'notification:remove:one', comment: 'Delete one notification in database' },

    { scope: 'user:create:one', comment: 'Create user in database' },
    { scope: 'user:find', comment: 'Read all user to list' },
    { scope: 'user:find:one', comment: 'Read one user from database' },
    { scope: 'user:find:all', comment: 'Read all users from database' },
    { scope: 'user:update:one', comment: 'Update one user in database' },
    { scope: 'user:remove:one', comment: 'Delete one user in database' },

    { scope: 'event:create:one', comment: 'Create event in database' },
    { scope: 'event:find:one', comment: 'Read one event from database' },
    { scope: 'event:find:all', comment: 'Read all events from database' },
    { scope: 'event:update:one', comment: 'Update one event in database' },
    { scope: 'event:remove:one', comment: 'Delete one event in database' },

    { scope: 'channel:create:one', comment: 'Create channel in database' },
    { scope: 'channel:find:one', comment: 'Read one channel from database' },
    { scope: 'channel:find:all', comment: 'Read all channels from database' },
    { scope: 'channel:update:one', comment: 'Update one channel in database' },
    { scope: 'channel:remove:one', comment: 'Delete one channel in database' },

    { scope: 'ipaddress:create:one', comment: 'Create ipaddress in database' },
    { scope: 'ipaddress:find:one', comment: 'Read one ipaddress from database' },
    { scope: 'ipaddress:find:all', comment: 'Read all ipaddresses from database' },
    { scope: 'ipaddress:update:one', comment: 'Update one ipaddress in database' },
    { scope: 'ipaddress:remove:one', comment: 'Delete one ipaddress in database' },

    { scope: 'vpn:create:one', comment: 'Create vpn in database' },
    { scope: 'vpn:find:one', comment: 'Read one vpn from database' },
    { scope: 'vpn:find:all', comment: 'Read all vpns from database' },
    { scope: 'vpn:update:one', comment: 'Update one vpn in database' },
    { scope: 'vpn:remove:one', comment: 'Delete one vpn in database' },

    { scope: 'request:create:one', comment: 'Create request in database' },
    { scope: 'request:find:one', comment: 'Read one request from database' },
    { scope: 'request:find:all', comment: 'Read all requests from database' },
    { scope: 'request:update:one', comment: 'Update one request in database' },
    { scope: 'request:remove:one', comment: 'Delete one request in database' },

    { scope: 'inspector:find:one', comment: 'Read one SysInspector from database' },
    { scope: 'inspector:find:all', comment: 'Read all SysInspectors from database' },
    { scope: 'inspector:remove:one', comment: 'Delete one inspector in database' },

    { scope: 'company:create:one', comment: 'Create company in database' },
    { scope: 'company:find:one', comment: 'Read one company from database' },
    { scope: 'company:find:all', comment: 'Read all companies from database' },
    { scope: 'company:update:one', comment: 'Update one company in database' },
    { scope: 'company:remove:one', comment: 'Delete one company in database' },

    { scope: 'branch:create:one', comment: 'Create branch in database' },
    { scope: 'branch:find:one', comment: 'Read one branch from database' },
    { scope: 'branch:find:all', comment: 'Read all branches from database' },
    { scope: 'branch:update:one', comment: 'Update one branch in database' },
    { scope: 'branch:remove:one', comment: 'Delete one branch in database' },

    { scope: 'enterprise:create:one', comment: 'Create enterprise in database' },
    { scope: 'enterprise:find:one', comment: 'Read one enterprise from database' },
    { scope: 'enterprise:find:all', comment: 'Read all enterprises from database' },
    { scope: 'enterprise:update:one', comment: 'Update one enterprise in database' },
    { scope: 'enterprise:remove:one', comment: 'Delete one enterprise in database' },

    { scope: 'department:create:one', comment: 'Create department in database' },
    { scope: 'department:find:one', comment: 'Read one department from database' },
    { scope: 'department:find:all', comment: 'Read all departments from database' },
    { scope: 'department:update:one', comment: 'Update one department in database' },
    { scope: 'department:remove:one', comment: 'Delete one department in database' },

    { scope: 'location:create:one', comment: 'Create location in database' },
    { scope: 'location:find:one', comment: 'Read one location from database' },
    { scope: 'location:find:all', comment: 'Read all locations from database' },
    { scope: 'location:update:one', comment: 'Update one location in database' },
    { scope: 'location:remove:one', comment: 'Delete one location in database' },

    { scope: 'position:create:one', comment: 'Create position in database' },
    { scope: 'position:find:one', comment: 'Read one position from database' },
    { scope: 'position:find:all', comment: 'Read all positions from database' },
    { scope: 'position:update:one', comment: 'Update one position in database' },
    { scope: 'position:remove:one', comment: 'Delete one position in database' },

    { scope: 'unit:create:one', comment: 'Create unit in database' },
    { scope: 'unit:find:one', comment: 'Read one unit from database' },
    { scope: 'unit:find:all', comment: 'Read all units from database' },
    { scope: 'unit:update:one', comment: 'Update one unit in database' },
    { scope: 'unit:remove:one', comment: 'Delete one unit in database' },

    { scope: 'statistic:ipaddress', comment: 'Read statistic of ipaddress' },
    { scope: 'statistic:inspector', comment: 'Read statistic of SysInspector' },
    { scope: 'statistic:request', comment: 'Read statistic of requests' },
    { scope: 'statistic:dashboard', comment: 'Read statistic for dashboard' },

    { scope: 'tool:command:oping', comment: 'Ping command' },
    { scope: 'tool:script:inspector', comment: 'Create SysInspector script' },
    { scope: 'tool:link:ping', comment: 'Create Ping Link' },
    { scope: 'tool:link:rdp', comment: 'Create RDP link' },
    { scope: 'tool:link:vnc', comment: 'Create VNC link' }
  ]);

  const scopeLength = computed(() => clientScopes.value.length + apiScopes.value.length);

  function hasScope() {
    return true;
  }

  return { clientScopes, apiScopes, scopeLength, hasScope };
});
