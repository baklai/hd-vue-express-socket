import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', () => {
  const navigation = ref([
    {
      items: [
        { label: 'Helpdesk service', icon: 'pi pi-home', to: '/' },
        { label: 'Blog of helpdesk', icon: 'pi pi-book', to: '/blog' },
        { label: 'HD File Hosting', icon: 'pi pi-cloud', to: '/cloud' }
      ]
    },
    {
      label: 'Applications',
      items: [
        { label: 'Calendar of events', icon: 'pi pi-calendar', to: '/apps/calendar-events' },
        {
          label: 'Network info',
          icon: 'pi pi-sitemap',
          items: [
            {
              label: 'Network channels',
              icon: 'pi pi-arrow-right-arrow-left',
              to: '/apps/network-info/channels'
            },
            {
              label: 'Network IP Address',
              icon: 'pi pi-sitemap',
              to: '/apps/network-info/ip-address'
            },
            {
              label: 'Service statistics',
              icon: 'pi pi-chart-bar',
              to: '/apps/network-info/statistics'
            }
          ]
        },
        {
          label: 'Operational journal',
          icon: 'pi pi-map',
          items: [
            {
              label: 'Operational journal',
              icon: 'pi pi-map',
              to: '/apps/operational-journal/requests'
            },
            {
              label: 'Service statistics',
              icon: 'pi pi-chart-bar',
              to: '/apps/operational-journal/statistics'
            }
          ]
        },
        {
          label: 'PC SysInspector',
          icon: 'pi pi-desktop',
          items: [
            {
              label: 'PC SysInspector',
              icon: 'pi pi-desktop',
              to: '/apps/pc-sys-inspector/reports'
            },
            {
              label: 'Service statistics',
              icon: 'pi pi-chart-bar',
              to: '/apps/pc-sys-inspector/statistics'
            }
          ]
        },
        { label: 'ICMP Ping', icon: 'pi pi-code', to: '/apps/ping-icmp' }
      ]
    },
    {
      label: 'Administration',
      separator: false,
      items: [
        { label: 'Dashboard', icon: 'pi pi-microsoft', to: '/core/dashboard' },
        { label: 'Activity audit', icon: 'pi pi-list', to: '/core/log-audit' },
        { label: 'Configuration', icon: 'pi pi-cog', to: '/core/options' },
        { label: 'User accounts', icon: 'pi pi-users', to: '/core/users' }
      ]
    }
  ]);

  return { navigation };
});
