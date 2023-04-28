import { io } from 'socket.io-client';

const SOCKET_TIMEOUT_EMIT = 5000;

export default {
  install: async (app, { connection, options }) => {
    const { $router, $toast, $t } = app.config.globalProperties;

    const helpdesk = {
      user: null,
      users: [],

      socket: io(connection, {
        name: options?.name || 'helpdesk',
        path: options?.path || '/',
        transports: options?.transports || ['websocket'],
        autoConnect: options?.autoConnect || false,
        reconnection: options?.reconnection || false,

        auth: {
          token: localStorage.getItem('app-token')
        }
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
          const { error, response } = await this.socket
            .timeout(SOCKET_TIMEOUT_EMIT)
            .emitWithAck(event, payload);
          if (error) throw new Error(error);
          return response;
        } catch (err) {
          throw new Error(err.message);
        }
      },

      async init() {
        try {
          await this.refresh();
          await this.me();
          $router.push({ name: 'home' });
        } catch (err) {
          $router.push({ name: 'signin' });
          console.log(err);
        }
      },

      async me() {
        try {
          this.user = await this.emit('auth:me');
        } catch (err) {
          this.socket.close();
        }
      },

      async refresh() {
        try {
          const { token } = await this.emit('auth:refresh');
          if (localStorage.getItem('app-token')) localStorage.setItem('app-token', token);
          this.socket.auth.token = token;
        } catch (err) {
          this.socket.close();
        }
      },

      async login({ login, password, remember = true }) {
        try {
          this.socket.connect();
          const { token } = await this.emit('auth:signin', { login, password });
          if (remember) localStorage.setItem('app-token', token);
          this.socket.auth.token = token;
          this.user = await this.emit('auth:me');
          $router.push({ name: 'home' });
          // $toast.add({
          //   severity: 'success',
          //   summary: $t('HD Information'),
          //   detail: $t('Authorization passed'),
          //   life: 3000
          // });
        } catch (err) {
          this.socket.close();
          throw new Error(err);
        }
      },

      async logout() {
        this.socket.close();
        // $toast.add({
        //   severity: 'info',
        //   summary: $t('HD Information'),
        //   detail: $t('Logout successfully completed'),
        //   life: 3000
        // });
      }
    };

    helpdesk.socket.on('connect', async () => {
      // try {
      //   helpdesk.user = await helpdesk.emit('auth:refresh');
      //   $toast.add({
      //     severity: 'success',
      //     summary: $t('HD Information'),
      //     detail: $t('Authorization passed'),
      //     life: 3000
      //   });
      // } catch (err) {
      //   $toast.add({
      //     severity: 'warn',
      //     summary: $t('HD Warning'),
      //     detail: $t(err),
      //     life: 3000
      //   });
      // }
    });

    helpdesk.socket.on('helpdesk:users', (payload) => {
      helpdesk.users = payload;
    });

    helpdesk.socket.on('helpdesk:message', (payload) => {
      if (typeof payload === 'string') {
        $toast.add({
          severity: 'success',
          summary: $t('HD Information'),
          detail: $t(payload),
          life: 3000
        });
      }
    });

    helpdesk.socket.on('error', (payload) => {
      if (typeof payload === 'string') {
        $toast.add({
          severity: 'warn',
          summary: $t('HD Warning'),
          detail: $t(payload),
          life: 3000
        });
      }
    });

    helpdesk.socket.on('disconnect', () => {
      helpdesk.user = null;
      $router.push({ name: 'signin' });
    });

    $router.beforeEach((to, from, next) => {
      if (to?.meta?.auth && !helpdesk.loggedIn) next({ name: 'signin' });
      else next();
    });

    app.config.globalProperties.$helpdesk = helpdesk;
    app.provide('helpdesk', helpdesk);
  }
};
