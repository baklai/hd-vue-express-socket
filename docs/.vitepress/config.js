import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Helpdesk docs',
  description: 'A Helpdesk documentation',
  base: '/docs/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Helpdesk', link: '/helpdesk/index' }
    ],

    sidebar: [
      {
        text: 'Helpdesk',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Windows CMD',
        items: [
          { text: 'Markdown Examples', link: '/win-cmd/index' },
          { text: 'Runtime API Examples', link: '/win-cmd/perezagruzka' },
          { text: 'Markdown Examples', link: '/win-cmd/proksi' },
          { text: 'Runtime API Examples', link: '/win-cmd/upravlenie-polzovatelyami' },
          { text: 'Markdown Examples', link: '/win-cmd/vvedenie' },
          { text: 'Runtime API Examples', link: '/win-cmd/vyklyuchenie' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/baklai' }]
  }
});
