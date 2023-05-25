import { defineStore } from 'pinia';

export const useScope = defineStore('scope', () => {
  function hasScope() {
    return true;
  }

  function scopeLength() {
    return scopeGroups()
      .map((group) => group.items)
      .flat().length;
  }

  function scopeGroups() {
    return [
      {
        icon: 'pi pi-cog',
        name: 'Web client options',
        items: [
          { scope: 'selected-html', comment: 'Enabled selected from HTML', value: false },
          { scope: 'channel:export:table', comment: 'Export channels in CSV file', value: false },
          { scope: 'vpn:export:table', comment: 'Export VPNs in CSV file', value: false },
          {
            scope: 'ipaddress:client:internet',
            comment: 'Show IP Addresses with Internet',
            value: false
          },
          {
            scope: 'ipaddress:client:email',
            comment: 'Show IP Addresses with E-Mails',
            value: false
          },
          {
            scope: 'ipaddress:export:table',
            comment: 'Export IP Addresses in CSV file',
            value: false
          },
          {
            scope: 'ipaddress:export:internet',
            comment: 'Export IP with Internet to CSV file',
            value: false
          },
          {
            scope: 'inspector:export:table',
            comment: 'Export PC SysInspector reports in CSV file',
            value: false
          },
          { scope: 'logger:export:table', comment: 'Export logs in CSV file', value: false }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'Company database table',
        items: [
          { scope: 'company:create:one', comment: 'Create company in database', value: false },
          { scope: 'company:find:one', comment: 'Read one company from database', value: false },
          { scope: 'company:find:all', comment: 'Read all companies from database', value: false },
          { scope: 'company:update:one', comment: 'Update one company in database', value: false },
          { scope: 'company:remove:one', comment: 'Delete one company in database', value: false }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'Branch database table',
        items: [
          { scope: 'branch:create:one', comment: 'Create branch in database', value: false },
          { scope: 'branch:find:one', comment: 'Read one branch from database', value: false },
          { scope: 'branch:find:all', comment: 'Read all branches from database', value: false },
          { scope: 'branch:update:one', comment: 'Update one branch in database', value: false },
          { scope: 'branch:remove:one', comment: 'Delete one branch in database', value: false }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'Enterprise database table',
        items: [
          {
            scope: 'enterprise:create:one',
            comment: 'Create enterprise in database',
            value: false
          },
          {
            scope: 'enterprise:find:one',
            comment: 'Read one enterprise from database',
            value: false
          },
          {
            scope: 'enterprise:find:all',
            comment: 'Read all enterprises from database',
            value: false
          },
          {
            scope: 'enterprise:update:one',
            comment: 'Update one enterprise in database',
            value: false
          },
          {
            scope: 'enterprise:remove:one',
            comment: 'Delete one enterprise in database',
            value: false
          }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'Department database table',
        items: [
          {
            scope: 'department:create:one',
            comment: 'Create department in database',
            value: false
          },
          {
            scope: 'department:find:one',
            comment: 'Read one department from database',
            value: false
          },
          {
            scope: 'department:find:all',
            comment: 'Read all departments from database',
            value: false
          },
          {
            scope: 'department:update:one',
            comment: 'Update one department in database',
            value: false
          },
          {
            scope: 'department:remove:one',
            comment: 'Delete one department in database',
            value: false
          }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'Location database table',
        items: [
          { scope: 'location:create:one', comment: 'Create location in database', value: false },
          { scope: 'location:find:one', comment: 'Read one location from database', value: false },
          {
            scope: 'location:find:all',
            comment: 'Read all locations from database',
            value: false
          },
          {
            scope: 'location:update:one',
            comment: 'Update one location in database',
            value: false
          },
          {
            scope: 'location:remove:one',
            comment: 'Delete one location in database',
            value: false
          }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'Position database table',
        items: [
          { scope: 'position:create:one', comment: 'Create position in database', value: false },
          { scope: 'position:find:one', comment: 'Read one position from database', value: false },
          {
            scope: 'position:find:all',
            comment: 'Read all positions from database',
            value: false
          },
          {
            scope: 'position:update:one',
            comment: 'Update one position in database',
            value: false
          },
          {
            scope: 'position:remove:one',
            comment: 'Delete one position in database',
            value: false
          }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'Unit database table',
        items: [
          { scope: 'unit:create:one', comment: 'Create unit in database', value: false },
          { scope: 'unit:find:one', comment: 'Read one unit from database', value: false },
          { scope: 'unit:find:all', comment: 'Read all units from database', value: false },
          { scope: 'unit:update:one', comment: 'Update one unit in database', value: false },
          { scope: 'unit:remove:one', comment: 'Delete one unit in database', value: false }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'Calendar of events',
        items: [
          { scope: 'event:create:one', comment: 'Create event in database', value: false },
          { scope: 'event:find:one', comment: 'Read one event from database', value: false },
          { scope: 'event:find:all', comment: 'Read all events from database', value: false },
          { scope: 'event:update:one', comment: 'Update one event in database', value: false },
          { scope: 'event:remove:one', comment: 'Delete one event in database', value: false }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'Network information',
        items: [
          { scope: 'channel:create:one', comment: 'Create channel in database', value: false },
          { scope: 'channel:find:one', comment: 'Read one channel from database', value: false },
          { scope: 'channel:find:all', comment: 'Read all channels from database', value: false },
          { scope: 'channel:update:one', comment: 'Update one channel in database', value: false },
          { scope: 'channel:remove:one', comment: 'Delete one channel in database', value: false },
          { scope: 'ipaddress:create:one', comment: 'Create ipaddress in database', value: false },
          {
            scope: 'ipaddress:find:one',
            comment: 'Read one ipaddress from database',
            value: false
          },
          {
            scope: 'ipaddress:find:all',
            comment: 'Read all ipaddresses from database',
            value: false
          },
          {
            scope: 'ipaddress:update:one',
            comment: 'Update one ipaddress in database',
            value: false
          },
          {
            scope: 'ipaddress:remove:one',
            comment: 'Delete one ipaddress in database',
            value: false
          },
          { scope: 'vpn:create:one', comment: 'Create vpn in database', value: false },
          { scope: 'vpn:find:one', comment: 'Read one vpn from database', value: false },
          { scope: 'vpn:find:all', comment: 'Read all vpns from database', value: false },
          { scope: 'vpn:update:one', comment: 'Update one vpn in database', value: false },
          { scope: 'vpn:remove:one', comment: 'Delete one vpn in database', value: false }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'Help Desk Live Log',
        items: [
          { scope: 'request:create:one', comment: 'Create request in database', value: false },
          { scope: 'request:find:one', comment: 'Read one request from database', value: false },
          { scope: 'request:find:all', comment: 'Read all requests from database', value: false },
          { scope: 'request:update:one', comment: 'Update one request in database', value: false },
          { scope: 'request:remove:one', comment: 'Delete one request in database', value: false }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'PC SysInspector',
        items: [
          {
            scope: 'inspector:find:one',
            comment: 'Read one SysInspector from database',
            value: false
          },
          {
            scope: 'inspector:find:all',
            comment: 'Read all SysInspectors from database',
            value: false
          },
          {
            scope: 'inspector:remove:one',
            comment: 'Delete one inspector in database',
            value: false
          }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'Statistic',
        items: [
          { scope: 'statistic:ipaddress', comment: 'Read statistic of ipaddress', value: false },
          {
            scope: 'statistic:inspector',
            comment: 'Read statistic of SysInspector',
            value: false
          },
          { scope: 'statistic:request', comment: 'Read statistic of requests', value: false },
          { scope: 'statistic:dashboard', comment: 'Read statistic for dashboard', value: false }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'HD User accounts',
        items: [
          { scope: 'user:create:one', comment: 'Create user in database', value: false },
          { scope: 'user:find', comment: 'Read all user to list', value: false },
          { scope: 'user:find:one', comment: 'Read one user from database', value: false },
          { scope: 'user:find:all', comment: 'Read all users from database', value: false },
          { scope: 'user:update:one', comment: 'Update one user in database', value: false },
          { scope: 'user:remove:one', comment: 'Delete one user in database', value: false }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'HD Logger system',
        items: [
          { scope: 'logger:find:all', comment: 'Read all logs from database', value: false },
          { scope: 'logger:remove:all', comment: 'Delete all logs in database', value: false }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'HD Notification system',
        items: [
          {
            scope: 'notification:find:all',
            comment: 'Read all notifications from database',
            value: false
          },
          {
            scope: 'notification:create:one',
            comment: 'Create one notification in database',
            value: false
          },
          {
            scope: 'notification:remove:one',
            comment: 'Delete one notification in database',
            value: false
          }
        ]
      },
      {
        icon: 'pi pi-cog',
        name: 'HD System tools',
        items: [
          { scope: 'tool:command:oping', comment: 'Ping command', value: false },
          { scope: 'tool:script:inspector', comment: 'Create SysInspector script', value: false },
          { scope: 'tool:link:ping', comment: 'Create Ping Link', value: false },
          { scope: 'tool:link:rdp', comment: 'Create RDP link', value: false },
          { scope: 'tool:link:vnc', comment: 'Create VNC link', value: false }
        ]
      }
    ];
  }

  return { scopeLength, scopeGroups, hasScope };
});
