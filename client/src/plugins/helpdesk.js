import { io } from 'socket.io-client';
import { useHelpdesk } from '@/stores/helpdesk';
import { useError } from '@/stores/error';

const CLIENT_TIMEOUT = 15;
const SOCKET_TIMEOUT_EMIT = 5000;

export default {
  install: async (app, { connection, options, information }) => {
    const { $router, $toast, $t } = app.config.globalProperties;

    const store = useHelpdesk();
    const error = useError();

    const helpdesk = {
      user: null,
      timerId: null,
      connected: false,

      info: information,
      connection: connection,

      socket: io(connection, {
        name: options?.name || 'helpdesk',
        path: options?.path || '/helpdesk',
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
        if (this.user?.isAdmin) return true;
        if (scope === 'auth:signin') return true;
        if (scope === 'auth:signup') return true;
        if (scope === 'auth:refresh') return true;
        if (scope === 'auth:me') return true;

        return this.user?.scope?.includes(scope);
      },

      async emit(event, payload = {}, timeout = SOCKET_TIMEOUT_EMIT) {
        try {
          if (!this.socket) throw new Error('No socket connection');
          if (!this.hasScope(event)) throw new Error($t("You don't have enough rights!"));
          const { error, response } = await this.socket
            .timeout(timeout)
            .emitWithAck(event, payload);
          store.updateTimeout(this?.user?.timeout || CLIENT_TIMEOUT);
          if (error) throw new Error(error);
          return response;
        } catch (err) {
          error.setError(err.message);
          throw new Error(err.message);
        }
      },

      async init() {
        try {
          this.socket.connect();
          await this.refresh();
          await this.me();
        } catch (err) {
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

      async signin({ login, password, remember = false }) {
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

      async signup({ login, password, fullname, email, phone }) {
        try {
          this.socket.connect();
          await this.emit('auth:signup', { login, password, fullname, email, phone });
        } catch (err) {
          throw new Error(err);
        } finally {
          this.socket.close();
        }
      },

      async signout() {
        this.socket.close();
        this.socket.auth.token = null;
        localStorage.removeItem('app-token');
      }
    };

    helpdesk.socket.on('connect', () => {
      helpdesk.connected = true;
      helpdesk.timerId = setInterval(() => {
        store.timeout--;
        if (store.timeout === 0 || store.timeout < 0) {
          clearInterval(helpdesk.timerId);
          helpdesk.socket.close();
        }
      }, 60000);
    });

    helpdesk.socket.on('disconnect', () => {
      helpdesk.user = null;
      helpdesk.connected = false;
      clearInterval(helpdesk.timerId);
      helpdesk.socket.auth.token = null;
      $router.push({ name: 'signin' });
    });

    helpdesk.socket.on('onusers', ({ response }) => {
      store.setUsers(response);
    });

    helpdesk.socket.on('message', ({ response }) => {
      if (typeof response === 'string') {
        $toast.add({
          severity: 'success',
          summary: $t('HD Information'),
          detail: $t(response),
          life: 1000
        });
      }
    });

    helpdesk.socket.on('error', ({ error }) => {
      if (typeof error === 'string') {
        $toast.add({
          severity: 'warn',
          summary: $t('HD Warning'),
          detail: $t(error),
          life: 5000
        });
      }
    });

    $router.beforeEach(async (to, from, next) => {
      if (!helpdesk.connected && helpdesk.socket.auth.token) await helpdesk.init();
      if (to?.meta?.auth && !helpdesk.loggedIn) next({ name: 'signin' });
      else if (to?.meta?.admin && !helpdesk.user.isAdmin) next({ name: 'access-denied' });
      else next();
    });

    app.config.globalProperties.$helpdesk = helpdesk;

    app.provide('helpdesk', helpdesk);
  }
};
