import { io } from 'socket.io-client';

import router from '@/router';

export default {
  install: (app, { connection, options }) => {
    const helpdesk = {
      user: null,

      socket: null,

      // scopes: [...scopes, ...store.getters.scopes],

      scopes: [],

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
          } catch (err) {
            this.socket.close();
            //  app.$toast.error(err);
          }
        });

        this.socket.on('helpdesk:users', (payload) => {
          // store.commit('updateUsers', payload);
        });

        this.socket.on('helpdesk:message', (payload) => {
          //    if (typeof payload === 'string') app.$toast.success(payload);
        });

        this.socket.on('helpdesk:error', (payload) => {
          //    if (typeof payload === 'string') app.$toast.error(payload);
        });

        this.socket.on('disconnect', () => {
          this.user = null;
          this.socket = null;
          router.push({ name: 'signin' });
        });
      },

      async logout() {
        this.socket.close();
        router.push({ name: 'signin' });
      }
    };

    app.config.globalProperties.$helpdesk = helpdesk;
    app.provide('helpdesk', helpdesk);
  }
};
