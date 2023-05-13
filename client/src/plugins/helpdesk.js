import { io } from 'socket.io-client';

const SOCKET_TIMEOUT_EMIT = 5000;

export default {
  install: async (app, { connection, options }) => {
    const { $router, $toast, $i18n, $t } = app.config.globalProperties;

    const helpdesk = {
      user: null,
      users: [],

      connection,

      socket: io(connection, {
        name: options?.name || 'helpdesk',
        path: options?.path || '/',
        transports: options?.transports || ['websocket'],
        autoConnect: options?.autoConnect || false,
        reconnection: options?.reconnection || false,

        auth: { token: localStorage.getItem('app-token') }
      }),

      get loggedIn() {
        return this.user !== null;
      },

      get isAdmin() {
        return this.user?.isAdmin;
      },

      get isActive() {
        return this.user?.isActive;
      },

      hasScope(scope) {
        return this.user?.scope?.includes(scope);
      },

      async emit(event, payload) {
        try {
          if (!this.socket) throw new Error('No socket connection');
          const { error, response } = await this.socket.timeout(SOCKET_TIMEOUT_EMIT).emitWithAck(event, payload);
          if (error) throw new Error(error);
          return response;
        } catch (err) {
          throw new Error(err.message);
        }
      },

      async init() {
        try {
          this.socket.connect();
          await this.refresh();
          await this.me();
          $router.push({ name: 'home' });
        } catch (err) {
          $router.push({ name: 'signin' });
          this.socket.close();
        }
      },

      async me() {
        try {
          this.user = await this.emit('auth:me');
        } catch (err) {
          this.socket.close();
          throw new Error(err);
        }
      },

      async refresh() {
        try {
          const token = await this.emit('auth:refresh');
          if (localStorage.getItem('app-token')) localStorage.setItem('app-token', token);
          this.socket.auth.token = token;
        } catch (err) {
          this.socket.close();
          throw new Error(err);
        }
      },

      async login({ login, password, remember = false }) {
        try {
          this.socket.connect();
          const token = await this.emit('auth:signin', { login, password });
          this.socket.auth.token = token;
          if (remember) localStorage.setItem('app-token', token);
          this.user = await this.emit('auth:me');
          $router.push({ name: 'home' });
        } catch (err) {
          this.socket.close();
          throw new Error(err);
        }
      },

      async logout() {
        this.socket.close();
        this.socket.auth.token = null;
        localStorage.removeItem('app-token');
      }

      // loadLocaleMessages(locale = 'ru_RU') {
      //   console.log(locale);
      //   return import(/* webpackChunkName: "locale-[request]" */ `@/locales/${locale}.json`);
      // },

      // // Установка локали с ленивой загрузкой
      // async setI18nLanguage(locale) {
      //   if ($i18n.mode === 'legacy') {
      //     $i18n.globalProxy.locale = locale;
      //   } else {
      //     // Загрузка модуля с переводами
      //     const messages = await this.loadLocaleMessages(locale);
      //     $i18n.globalProxy.setLocaleMessage(locale, messages.default || messages);
      //     $i18n.globalProxy.locale = locale;
      //   }
      // }
    };

    helpdesk.socket.on('connect', () => {});

    helpdesk.socket.on('users', ({ response }) => {
      helpdesk.users = response;
    });

    helpdesk.socket.on('message', ({ response }) => {
      if (typeof response === 'string') {
        $toast.add({
          severity: 'success',
          summary: $t('HD Information'),
          detail: $t(response),
          life: 3000
        });
      }
    });

    helpdesk.socket.on('error', ({ error }) => {
      if (typeof error === 'string') {
        $toast.add({
          severity: 'warn',
          summary: $t('HD Warning'),
          detail: $t(error),
          life: 3000
        });
      }
    });

    helpdesk.socket.on('disconnect', () => {
      helpdesk.user = null;
      helpdesk.socket.auth.token = null;
      $router.push({ name: 'signin' });
    });

    $router.beforeEach(async (to, from, next) => {
      if (to?.meta?.auth && !helpdesk.loggedIn) next({ name: 'signin' });
      else next();
    });

    app.config.globalProperties.$helpdesk = helpdesk;
    app.provide('helpdesk', helpdesk);

    await helpdesk.init();
    // await helpdesk.setI18nLanguage('ru');
  }
};
