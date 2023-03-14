import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Helpdesk docs',
  description: 'A Helpdesk documentation',
  base: '/docs/',
  themeConfig: {
    nav: [{ text: 'Home', link: '/' }],

    sidebar: [
      {
        text: 'Helpdesk',
        items: [
          { text: 'Network information', link: '/network-information' },
          { text: 'Operational journal', link: '/operational-journal' },
          { text: 'PC SysInspector', link: '/pc-sys-inspector' }
        ]
      },
      {
        text: 'Windows CMD',
        items: [
          { text: 'Введение', link: '/win-cmd/index' },
          { text: 'Перезагрузка', link: '/win-cmd/perezagruzka' },
          { text: 'Прокси', link: '/win-cmd/proksi' },
          { text: 'Управление пользователями', link: '/win-cmd/upravlenie-polzovatelyami' },
          { text: 'Выключение', link: '/win-cmd/vyklyuchenie' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/baklai' }]
  }
});
