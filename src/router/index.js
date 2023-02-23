import { createRouter, createWebHashHistory } from 'vue-router';

import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('@/views/Index.vue')
                }
            ]
        },
        {
            path: '/blog',
            component: AppLayout
        },
        {
            path: '/cloud',
            component: AppLayout
        },
        {
            path: '/apps',
            component: AppLayout,
            children: [
                {
                    path: '/apps/calendar-events',
                    name: 'calendar-events',
                    component: () => import('@/views/apps/CalendarEvents.vue')
                },
                {
                    path: '/apps/network-info',
                    children: [
                        {
                            path: '/apps/network-info/channels',
                            name: 'network-channels',
                            component: () => import('@/views/apps/network-info/Channels.vue')
                        },
                        {
                            path: '/apps/network-info/ip-address',
                            name: 'network-ip-address',
                            component: () => import('@/views/apps/network-info/IPAddress.vue')
                        },
                        {
                            path: '/apps/network-info/statistics',
                            name: 'network-statistics',
                            component: () => import('@/views/apps/network-info/NetworkInfo.vue')
                        }
                    ]
                },
                {
                    path: '/apps/operational-journal',
                    children: [
                        {
                            path: '/apps/operational-journal/requests',
                            name: 'operational-journal-requests',
                            component: () => import('@/views/apps/operational-journal/OperationalRequests.vue')
                        },
                        {
                            path: '/apps/operational-journal/statistics',
                            name: 'operational-journal-statistics',
                            component: () => import('@/views/apps/operational-journal/OperationalJournal.vue')
                        }
                    ]
                },
                {
                    path: '/apps/pc-sys-inspector',
                    children: [
                        {
                            path: '/apps/pc-sys-inspector/reports',
                            name: 'pc-sys-inspector-reports',
                            component: () => import('@/views/apps/pc-sys-inspector/PCSysInspectorReports.vue')
                        },
                        {
                            path: '/apps/pc-sys-inspector/statistics',
                            name: 'pc-sys-inspector-statistics',
                            component: () => import('@/views/apps/pc-sys-inspector/PCSysInspector.vue')
                        }
                    ]
                },
                {
                    path: '/apps/ping-icmp',
                    name: 'ping-icmp',
                    component: () => import('@/views/apps/PingICMP.vue')
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
                    component: () => import('@/views/core/AppDashboard.vue')
                },
                {
                    path: '/core/log-audit',
                    name: 'core-log-audit',
                    component: () => import('@/views/core/AppLogAudit.vue')
                },
                {
                    path: '/core/options',
                    name: 'core-options',
                    component: () => import('@/views/core/AppOptions.vue')
                },
                {
                    path: '/core/users',
                    name: 'core-users',
                    component: () => import('@/views/core/AppUsers.vue')
                }
            ]
        }
    ]
});

export default router;
