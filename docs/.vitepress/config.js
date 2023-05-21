import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Documentation',
  description: 'A Helpdesk documentation',
  base: '/docs/',
  themeConfig: {
    nav: [{ text: 'HELPDESK', link: '/' }],
    sidebar: [
      {
        text: 'Helpdesk',
        items: [
          { text: 'Calendar of events', link: '/calendar-events' },
          { text: 'Network information', link: '/network-info' },
          { text: 'Help Desk Live Log', link: '/hd-live-log' },
          { text: 'PC SysInspector', link: '/pc-sys-inspector' }
        ]
      },
      {
        text: 'Windows CMD',
        items: [
          { text: 'Introduction', link: '/win-cmd/index' },
          { text: 'Reboot', link: '/win-cmd/perezagruzka' },
          { text: 'Proxy', link: '/win-cmd/proksi' },
          { text: 'Users', link: '/win-cmd/upravlenie-polzovatelyami' },
          { text: 'Shutdown', link: '/win-cmd/vyklyuchenie' }
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/baklai' }]
  },
  outDir: '../dist/docs'
});
