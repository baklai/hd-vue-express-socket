import { createRouter, createWebHashHistory } from 'vue-router';

import AppLayout from '@/layout/AppLayout.vue';
import AuthLayout from '@/layout/AuthLayout.vue';
import PublicLayout from '@/layout/PublicLayout.vue';

const DEFAULT_TITLE = 'Helpdesk service';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      meta: { auth: true },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/Index.vue'),
          meta: {
            title: 'Helpdesk service',
            description: 'Helpdesk of the technical support',
            icon: 'app-home'
          }
        },

        {
          path: '/docs',
          name: 'docs',
          meta: {
            title: 'Docs of helpdesk',
            description: 'Docs of the technical support',
            icon: 'app-docs'
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
                title: 'Calendar of events',
                description: 'Сalendar service of events  of the technical support',
                icon: 'calendar-events'
              }
            },
            {
              path: '/apps/network-info',
              name: 'network-info',
              meta: {
                title: 'Network information',
                description: 'Network information of the technical support',
                icon: 'network-info'
              },
              children: [
                {
                  path: '/apps/network-info/channels',
                  name: 'network-channels',
                  component: () => import('@/views/apps/network-info/Channels.vue'),
                  meta: {
                    title: 'Network channels',
                    description: 'Network channels of the technical support',
                    icon: 'network-channels'
                  }
                },
                {
                  path: '/apps/network-info/ip-address',
                  name: 'network-ip-address',
                  component: () => import('@/views/apps/network-info/IPAddress.vue'),
                  meta: {
                    title: 'Network IP Address',
                    description: 'Network IP Address of the technical support',
                    icon: 'network-ip-address'
                  }
                },
                {
                  path: '/apps/network-info/statistics',
                  name: 'network-statistics',
                  component: () => import('@/views/apps/network-info/NetworkInfo.vue'),
                  meta: {
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
      component: AuthLayout,
      children: [
        {
          path: '/auth',
          name: 'auth',
          component: () => import('@/views/auth/Index.vue')
        },
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
      component: PublicLayout,
      children: [
        {
          path: '',
          name: 'not-router',
          component: () => import('@/views/error/NotFound.vue')
        }
      ]
    }
  ]
});

router.beforeEach((to, from) => {
  document.title = to.meta.title ? `HD • ${to.meta.title}` : `HD • ${DEFAULT_TITLE}`;
});

// router.beforeEach(async (to, from) => {
//   // canUserAccess() returns `true` or `false`
//   // const canAccess = await canUserAccess(to);
//   // const isAuthenticated = false;

//   // if (to.meta.auth) {
//   //   if (to.name !== 'login' && !$auth.loggedIn) return { name: 'login' };
//   // }

//   if (to.meta.auth && !auth.isLoggedIn()) {
//     return { path: '/login', query: { redirect: to.fullPath } };
//   }
// });

export default router;
