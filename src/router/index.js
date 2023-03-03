import { createRouter, createWebHashHistory } from 'vue-router';

import DefaultLayout from '@/layout/DefaultLayout.vue';
import ErrorLayout from '@/layout/ErrorLayout.vue';
import AppLayout from '@/layout/AppLayout.vue';

import AppNotFound from '@/components/AppNotFound.vue';
import AppError from '@/components/AppError.vue';
import AppAccess from '@/components/AppAccess.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Index.vue'),
      meta: { layout: DefaultLayout }
    },

    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/blog/Blog.vue'),
      meta: { layout: AppLayout, auth: true }
    },

    {
      path: '/auth',
      meta: { layout: DefaultLayout },
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
      path: '/apps',
      component: AppLayout,
      children: [
        {
          path: '/apps/calendar-events',
          name: 'calendar-events',
          component: () => import('@/views/apps/CalendarEvents.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '/apps/network-info',
          children: [
            {
              path: '/apps/network-info/channels',
              name: 'network-channels',
              component: () => import('@/views/apps/network-info/Channels.vue'),
              meta: {
                auth: false
              }
            },
            {
              path: '/apps/network-info/ip-address',
              name: 'network-ip-address',
              component: () => import('@/views/apps/network-info/IPAddress.vue'),
              meta: {
                auth: true
              }
            },
            {
              path: '/apps/network-info/statistics',
              name: 'network-statistics',
              component: () => import('@/views/apps/network-info/NetworkInfo.vue'),
              meta: {
                auth: true
              }
            }
          ]
        },
        {
          path: '/apps/operational-journal',
          children: [
            {
              path: '/apps/operational-journal/requests',
              name: 'operational-journal-requests',
              component: () => import('@/views/apps/operational-journal/OperationalRequests.vue'),
              meta: {
                auth: true
              }
            },
            {
              path: '/apps/operational-journal/statistics',
              name: 'operational-journal-statistics',
              component: () => import('@/views/apps/operational-journal/OperationalJournal.vue'),
              meta: {
                auth: true
              }
            }
          ]
        },
        {
          path: '/apps/pc-sys-inspector',
          children: [
            {
              path: '/apps/pc-sys-inspector/reports',
              name: 'pc-sys-inspector-reports',
              component: () => import('@/views/apps/pc-sys-inspector/PCSysInspectorReports.vue'),
              meta: {
                auth: true
              }
            },
            {
              path: '/apps/pc-sys-inspector/statistics',
              name: 'pc-sys-inspector-statistics',
              component: () => import('@/views/apps/pc-sys-inspector/PCSysInspector.vue'),
              meta: {
                auth: true
              }
            }
          ]
        },
        {
          path: '/apps/ping-icmp',
          name: 'ping-icmp',
          component: () => import('@/views/apps/PingICMP.vue'),
          meta: {
            auth: true
          }
        }
      ]
    },

    {
      path: '/core',
      component: AppLayout,
      children: [
        {
          path: '/core/dashboard',
          name: 'core-dashboard',
          component: () => import('@/views/core/AppDashboard.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '/core/log-audit',
          name: 'core-log-audit',
          component: () => import('@/views/core/AppLogAudit.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '/core/options',
          name: 'core-options',
          component: () => import('@/views/core/AppOptions.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '/core/users',
          name: 'core-users',
          component: () => import('@/views/core/AppUsers.vue'),
          meta: {
            auth: true
          }
        }
      ]
    },

    // {
    //   path: '/error',
    //   component: ErrorLayout,
    //   children: [
    //     {
    //       path: '/error/not-found',
    //       name: 'signin',
    //       component: () => import('@/views/auth/Signin.vue')
    //     },
    //     {
    //       path: '/error/signup',
    //       name: 'signup',
    //       component: () => import('@/views/auth/Signup.vue')
    //     }
    //   ]
    // },

    { path: '/:pathMatch(.*)*', name: 'not-found', component: AppNotFound }
  ]
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
