import { createRouter, createWebHashHistory } from 'vue-router';

import AppLayout from '@/layout/AppLayout.vue';
import PublicLayout from '@/layout/PublicLayout.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      meta: { auth: true },
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/Index.vue'),
          meta: {
            icon: 'app-home',
            title: 'Helpdesk service',
            description: 'Helpdesk of the technical support'
          }
        },

        {
          path: '/docs',
          name: 'docs',
          meta: {
            icon: 'app-docs',
            title: 'Docs of helpdesk',
            description: 'Docs of the technical support'
          }
        },

        {
          path: '/apps',
          name: 'apps',
          children: [
            {
              path: '/apps/calendar-events',
              name: 'calendar-events',
              component: () => import('@/views/apps/CalendarEvents.vue'),
              meta: {
                icon: 'calendar-events',
                title: 'Calendar of events',
                description: 'Сalendar service of events  of the technical support'
              }
            },
            {
              path: '/apps/network-info',
              name: 'network-info',
              meta: {
                auth: true,
                icon: 'network-info',
                title: 'Network information',
                description: 'Network information of the technical support'
              },
              children: [
                {
                  path: '/apps/network-info/channels',
                  name: 'network-channels',
                  component: () => import('@/views/apps/network-info/Channels.vue'),
                  meta: {
                    auth: true,
                    icon: 'network-channels',
                    title: 'Network channels',
                    description: 'Network channels of the technical support'
                  }
                },
                {
                  path: '/apps/network-info/vpn-clients',
                  name: 'network-vpn-clients',
                  component: () => import('@/views/apps/network-info/VPNClients.vue'),
                  meta: {
                    auth: true,
                    icon: 'network-vpn-clients',
                    title: 'Network VPN Clients',
                    description: 'Network VPN Clients of the technical support'
                  }
                },
                {
                  path: '/apps/network-info/ip-address',
                  name: 'network-ip-address',
                  component: () => import('@/views/apps/network-info/IPAddress.vue'),
                  meta: {
                    auth: true,
                    icon: 'network-ip-address',
                    title: 'Network IP Address',
                    description: 'Network IP Address of the technical support'
                  }
                },
                {
                  path: '/apps/network-info/statistics',
                  name: 'network-statistics',
                  component: () => import('@/views/apps/network-info/NetworkInfo.vue'),
                  meta: {
                    auth: true,
                    title: 'Service statistics',
                    description: 'Statistics of network information',
                    icon: 'app-statistics'
                  }
                }
              ]
            },
            {
              path: '/apps/operational-journal',
              name: 'operational-journal',
              meta: {
                auth: true,
                title: 'Operational journal',
                description: 'Operational journal of the technical support',
                icon: 'operational-journal'
              },
              children: [
                {
                  path: '/apps/operational-journal/requests',
                  name: 'operational-journal-requests',
                  component: () =>
                    import('@/views/apps/operational-journal/OperationalRequests.vue'),
                  meta: {
                    auth: true,
                    title: 'Operational journal',
                    description: 'Operational journal of the technical support',
                    icon: 'operational-journal'
                  }
                },
                {
                  path: '/apps/operational-journal/statistics',
                  name: 'operational-journal-statistics',
                  component: () =>
                    import('@/views/apps/operational-journal/OperationalJournal.vue'),
                  meta: {
                    auth: true,
                    title: 'Service statistics',
                    description: 'Statistics of operational journal',
                    icon: 'app-statistics'
                  }
                }
              ]
            },
            {
              path: '/apps/pc-sys-inspector',
              name: 'pc-sys-inspector',
              meta: {
                auth: true,
                title: 'PC SysInspector',
                description: 'PC SysInspector service of the technical support',
                icon: 'pc-sys-inspector'
              },
              children: [
                {
                  path: '/apps/pc-sys-inspector/reports',
                  name: 'pc-sys-inspector-reports',
                  component: () =>
                    import('@/views/apps/pc-sys-inspector/PCSysInspectorReports.vue'),
                  meta: {
                    auth: true,
                    title: 'PC SysInspector',
                    description: 'PC SysInspector service of the technical support',
                    icon: 'pc-sys-inspector'
                  }
                },
                {
                  path: '/apps/pc-sys-inspector/statistics',
                  name: 'pc-sys-inspector-statistics',
                  component: () => import('@/views/apps/pc-sys-inspector/PCSysInspector.vue'),
                  meta: {
                    auth: true,
                    title: 'Service statistics',
                    description: 'Statistics of PC SysInspector',
                    icon: 'app-statistics'
                  }
                }
              ]
            },
            {
              path: '/apps/ping-icmp',
              name: 'ping-icmp',
              component: () => import('@/views/apps/PingICMP.vue'),
              meta: {
                auth: true,
                title: 'ICMP Ping',
                description: 'ICMP Ping service of the technical support',
                icon: 'ping-icmp'
              }
            }
          ]
        },

        {
          path: '/core',
          name: 'core',
          children: [
            {
              path: '/core/dashboard',
              name: 'core-dashboard',
              component: () => import('@/views/core/Dashboard.vue'),
              meta: {
                auth: true,
                title: 'Dashboard',
                description: 'Dashboard of the helpdesk service',
                icon: 'core-dashboard'
              }
            },
            {
              path: '/core/log-audit',
              name: 'core-log-audit',
              component: () => import('@/views/core/LogAudit.vue'),
              meta: {
                auth: true,
                title: 'Activity audit',
                description: 'Audit log of the helpdesk service',
                icon: 'core-log-audit'
              }
            },
            {
              path: '/core/options',
              name: 'core-options',
              component: () => import('@/views/core/Options.vue'),
              meta: {
                auth: true,
                title: 'Configuration',
                description: 'Configuration of the helpdesk service',
                icon: 'core-options'
              }
            },
            {
              path: '/core/users',
              name: 'core-users',
              component: () => import('@/views/core/Users.vue'),
              meta: {
                auth: true,
                title: 'User accounts',
                description: 'User accounts of the helpdesk service',
                icon: 'core-users'
              }
            }
          ]
        }
      ]
    },

    {
      path: '/auth',
      redirect: '/auth/signin',
      component: PublicLayout,
      children: [
        {
          path: '/auth/signin',
          name: 'signin',
          component: () => import('@/views/auth/Signin.vue')
        },
        {
          path: '/auth/signup',
          name: 'signup',
          component: () => import('@/views/auth/Signup.vue')
        }
      ]
    },

    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          path: '/error/not-found',
          name: 'not-found',
          component: () => import('@/views/error/NotFound.vue')
        },
        {
          path: '/error/access-denied',
          name: 'access-denied',
          component: () => import('@/views/error/AccessDenied.vue')
        },
        {
          path: '/error/error-occured',
          name: 'error-occured',
          component: () => import('@/views/error/ErrorOccured.vue')
        }
      ]
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-router',
      component: PublicLayout,
      children: [
        {
          path: '/:pathMatch(.*)*',
          name: 'not-router',
          component: () => import('@/views/error/NotFound.vue')
        }
      ]
    }
  ]
});

export default router;
