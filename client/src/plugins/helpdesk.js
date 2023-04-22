import { io } from 'socket.io-client';

export default {
  install: (app, { t, toast, router, connection, options }) => {
    const helpdesk = {
      user: null,
      scopes: [],

      users: [],

      socket: null,

      get loggedIn() {
        return this.user !== null;
      },

      get isAdmin() {
        return this.user?.isAdmin;
      },

      get isActive() {
        return this.user?.isActive;
      },

      emit(event, payload) {
        return new Promise((resolve, reject) => {
          if (!this.socket) {
            reject('No socket connection');
          } else {
            this.socket.emit(event, payload, (response) => {
              if (response.error) {
                reject(response.error);
              } else {
                resolve(response);
              }
            });
          }
        });
      },

      hasScope(scope) {
        return this.user?.scope?.includes(scope);
      },

      async login({ login, password }) {
        this.socket = io(connection, {
          name: options?.name || 'helpdesk',
          path: options?.path || '/',
          transports: options?.transports || ['websocket'],
          reconnection: options?.reconnection || false,
          auth: (cb) => {
            cb({ token: localStorage.token || false });
          }
        });

        this.socket.on('connect', async () => {
          try {
            this.user = await this.emit('auth:signin', { login, password });
            router.push({ name: 'home' });
            toast.add({
              severity: 'success',
              summary: t('HD Information'),
              detail: t('Authorization passed'),
              life: 3000
            });
          } catch (err) {
            this.socket.close();
            toast.add({
              severity: 'warn',
              summary: t('HD Warning'),
              detail: t(err),
              life: 3000
            });
          }
        });

        this.socket.on('helpdesk:users', (payload) => {
          this.users = payload;
        });

        this.socket.on('helpdesk:message', (payload) => {
          if (typeof payload === 'string') {
            toast.add({
              severity: 'success',
              summary: t('HD Information'),
              detail: t(payload),
              life: 3000
            });
          }
        });

        this.socket.on('helpdesk:error', (payload) => {
          if (typeof payload === 'string') {
            toast.add({
              severity: 'warn',
              summary: $t('HD Warning'),
              detail: $t(payload),
              life: 3000
            });
          }
        });

        this.socket.on('disconnect', () => {
          this.user = null;
          this.socket = null;
          router.push({ name: 'signin' });
        });
      },

      async logout() {
        this.socket.close();
        toast.add({
          severity: 'info',
          summary: t('HD Information'),
          detail: t('Logout successfully completed'),
          life: 3000
        });
      }
    };

    router.beforeEach((to, from, next) => {
      if (to?.meta?.auth && !helpdesk.loggedIn) next({ name: 'signin' });
      else next();
    });

    app.config.globalProperties.$helpdesk = helpdesk;
    app.provide('helpdesk', helpdesk);
  }
};
