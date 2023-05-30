export default {
  base: '/docs/',
  outDir: '../dist/docs',

  appearance: true,
  cleanUrls: true,
  i18nRouting: true,

  title: 'HD Documentation',
  titleTemplate: 'HD Documentation - :title',
  description: 'Documentation of technical support',

  head: [['meta', { property: 'og:title', content: 'HD Documentation' }]],

  locales: {
    root: {
      lang: 'uk',
      link: '/',
      label: 'Українська',
      themeConfig: {
        langMenuLabel: 'Змінити мову',
        outlineTitle: 'На цій сторінці',
        docFooter: {
          prev: 'Попередня сторінка',
          next: 'Наступна сторінка'
        },
        sidebar: [
          {
            text: 'Helpdesk service',
            items: [
              { text: 'Calendar of events', link: '/calendar-events' },
              { text: 'Network information', link: '/network-info' },
              { text: 'Help Desk Live Log', link: '/hd-live-log' },
              { text: 'PC SysInspector', link: '/pc-sys-inspector' }
            ]
          },
          {
            text: 'Windows CMD',
            collapsed: true,
            items: [
              { text: 'Introduction', link: '/win-cmd/index' },
              { text: 'Shutdown', link: '/win-cmd/shutdown' },
              { text: 'Reboot', link: '/win-cmd/rebooting' },
              { text: 'Proxy', link: '/win-cmd/proxy' },
              { text: 'Users', link: '/win-cmd/user-management' }
            ]
          }
        ]
      }
    },
    ru: {
      lang: 'ru',
      link: '/ru/',
      label: 'Русский',
      themeConfig: {
        langMenuLabel: 'Изменить язык',
        outlineTitle: 'На этой странице',
        docFooter: {
          prev: 'Предыдущая страница',
          next: 'Следущая страница'
        },
        sidebar: [
          {
            text: 'Helpdesk service',
            items: [
              { text: 'Calendar of events', link: '/ru/calendar-events' },
              { text: 'Network information', link: '/ru/network-info' },
              { text: 'Help Desk Live Log', link: '/ru/hd-live-log' },
              { text: 'PC SysInspector', link: '/ru/pc-sys-inspector' }
            ]
          },
          {
            text: 'Windows CMD',
            collapsed: true,
            items: [
              { text: 'Introduction', link: '/ru/win-cmd/index' },
              { text: 'Shutdown', link: '/ru/win-cmd/shutdown' },
              { text: 'Reboot', link: '/ru/win-cmd/rebooting' },
              { text: 'Proxy', link: '/ru/win-cmd/proxy' },
              { text: 'Users', link: '/ru/win-cmd/user-management' }
            ]
          }
        ]
      }
    }
  },

  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Пошук',
                buttonAriaLabel: 'Показати детальний список'
              },
              modal: {
                noResultsText: 'Немає результатів для',
                resetButtonTitle: 'Скинути пошук',
                footer: {
                  selectText: 'вибрати',
                  navigateText: 'для навігації'
                }
              }
            }
          },
          ru: {
            translations: {
              button: {
                buttonText: 'Поиск',
                buttonAriaLabel: 'Показать подробный список'
              },
              modal: {
                noResultsText: 'Нет результатов для',
                resetButtonTitle: 'Сбросить поиск',
                footer: {
                  selectText: 'выбирать',
                  navigateText: 'для навигации'
                }
              }
            }
          }
        }
      }
    },
    nav: [{ text: 'HELPDESK', link: '/' }],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/baklai' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/dmitrii-baklai-1370a3170/' },
      { icon: 'facebook', link: 'https://www.facebook.com/dmitrii.baklai/' }
    ]
  }
};
