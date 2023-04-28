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
          name: 'home',
          path: '/',
          component: () => import('@/views/Index.vue'),
          meta: {
            title: 'Helpdesk service',
            description: 'Helpdesk of the technical support'
          }
        },

        {
          name: 'docs',
          path: '/docs',
          meta: {
            title: 'Docs of helpdesk',
            description: 'Docs of the technical support'
          }
        },

        {
          name: 'apps',
          path: '/apps',
          children: [
            {
              name: 'calendar-events',
              path: '/apps/calendar-events',
              component: () => import('@/views/apps/CalendarEvents.vue'),
              meta: {
                title: 'Calendar of events',
                description: 'Сalendar service of events  of the technical support'
              }
            },
            {
              name: 'network-info',
              path: '/apps/network-info',
              meta: {
                title: 'Network information',
                description: 'Network information of the technical support'
              },
              children: [
                {
                  name: 'network-channels',
                  path: '/apps/network-info/channels',
                  component: () => import('@/views/apps/network-info/Channels.vue'),
                  meta: {
                    title: 'Network channels',
                    description: 'Network channels of the technical support'
                  }
                },
                {
                  name: 'network-vpn-clients',
                  path: '/apps/network-info/vpn-clients',
                  component: () => import('@/views/apps/network-info/VPNClients.vue'),
                  meta: {
                    title: 'Network VPN Clients',
                    description: 'Network VPN Clients of the technical support'
                  }
                },
                {
                  name: 'network-ip-address',
                  path: '/apps/network-info/ip-address',
                  component: () => import('@/views/apps/network-info/IPAddress.vue'),
                  meta: {
                    title: 'Network IP Address',
                    description: 'Network IP Address of the technical support'
                  }
                },
                {
                  name: 'network-statistics',
                  path: '/apps/network-info/statistics',
                  component: () => import('@/views/apps/network-info/NetworkInfo.vue'),
                  meta: {
                    title: 'Service statistics',
                    description: 'Statistics of network information'
                  }
                }
              ]
            },
            {
              name: 'operational-journal',
              path: '/apps/operational-journal',
              meta: {
                title: 'Operational journal',
                description: 'Operational journal of the technical support'
              },
              children: [
                {
                  name: 'operational-journal-requests',
                  path: '/apps/operational-journal/requests',
                  component: () => import('@/views/apps/operational-journal/OperationalRequests.vue'),
                  meta: {
                    title: 'Operational journal',
                    description: 'Operational journal of the technical support'
                  }
                },
                {
                  name: 'operational-journal-statistics',
                  path: '/apps/operational-journal/statistics',
                  component: () => import('@/views/apps/operational-journal/OperationalJournal.vue'),
                  meta: {
                    title: 'Service statistics',
                    description: 'Statistics of operational journal'
                  }
                }
              ]
            },
            {
              name: 'pc-sys-inspector',
              path: '/apps/pc-sys-inspector',
              meta: {
                title: 'PC SysInspector',
                description: 'PC SysInspector service of the technical support'
              },
              children: [
                {
                  name: 'pc-sys-inspector-reports',
                  path: '/apps/pc-sys-inspector/reports',
                  component: () => import('@/views/apps/pc-sys-inspector/PCSysInspectorReports.vue'),
                  meta: {
                    title: 'PC SysInspector',
                    description: 'PC SysInspector service of the technical support'
                  }
                },
                {
                  name: 'pc-sys-inspector-statistics',
                  path: '/apps/pc-sys-inspector/statistics',
                  component: () => import('@/views/apps/pc-sys-inspector/PCSysInspector.vue'),
                  meta: {
                    title: 'Service statistics',
                    description: 'Statistics of PC SysInspector'
                  }
                }
              ]
            },
            {
              name: 'ping-icmp',
              path: '/apps/ping-icmp',
              component: () => import('@/views/apps/PingICMP.vue'),
              meta: {
                title: 'ICMP Ping',
                description: 'ICMP Ping service of the technical support'
              }
            }
          ]
        },

        {
          name: 'core',
          path: '/core',
          children: [
            {
              name: 'core-dashboard',
              path: '/core/dashboard',
              component: () => import('@/views/core/Dashboard.vue'),
              meta: {
                title: 'Dashboard',
                description: 'Dashboard of the helpdesk service'
              }
            },
            {
              name: 'core-log-audit',
              path: '/core/log-audit',
              component: () => import('@/views/core/LogAudit.vue'),
              meta: {
                title: 'Activity audit',
                description: 'Audit log of the helpdesk service'
              }
            },
            {
              name: 'core-options',
              path: '/core/options',
              component: () => import('@/views/core/Options.vue'),
              meta: {
                title: 'Configuration',
                description: 'Configuration of the helpdesk service'
              }
            },
            {
              name: 'core-users',
              path: '/core/users',
              component: () => import('@/views/core/Users.vue'),
              meta: {
                title: 'User accounts',
                description: 'User accounts of the helpdesk service'
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
          name: 'signin',
          path: '/auth/signin',
          component: () => import('@/views/auth/Signin.vue')
        },
        {
          name: 'signup',
          path: '/auth/signup',
          component: () => import('@/views/auth/Signup.vue')
        }
      ]
    },

    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          name: 'not-found',
          path: '/error/not-found',
          component: () => import('@/views/error/NotFound.vue')
        },
        {
          name: 'access-denied',
          path: '/error/access-denied',
          component: () => import('@/views/error/AccessDenied.vue')
        },
        {
          name: 'error-occured',
          path: '/error/error-occured',
          component: () => import('@/views/error/ErrorOccured.vue')
        }
      ]
    },

    {
      name: 'not-router',
      path: '/:pathMatch(.*)*',
      component: PublicLayout,
      children: [
        {
          name: 'not-router',
          path: '/:pathMatch(.*)*',
          component: () => import('@/views/error/NotFound.vue')
        }
      ]
    }
  ]
});

export default router;
