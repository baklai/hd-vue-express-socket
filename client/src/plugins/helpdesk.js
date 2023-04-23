import { io } from 'socket.io-client';

class Provider {
  #token;
  #users;
  #socket;

  #router;
  #toast;
  #translate;
  #options;

  constructor({ router, toast, translate, options }) {
    this.user = null;
    this.scopes = [];

    this.#token = null;
    this.#users = [];
    this.#socket = null;

    this.#router = router;
    this.#toast = toast;
    this.#translate = translate;
    this.#options = options;
  }

  get loggedIn() {
    return this.user !== null;
  }

  get isAdmin() {
    return this.user?.isAdmin;
  }

  get isActive() {
    return this.user?.isActive;
  }

  hasScope(scope) {
    return this.user?.scope?.includes(scope);
  }

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
  }

  async init() {
    this.#token = localStorage.getItem('token');

    this.#socket = io(this.#options?.connection, {
      name: this.#options?.name || 'helpdesk',
      path: this.#options?.path || '/',
      transports: this.#options?.transports || ['websocket'],
      reconnection: this.#options?.reconnection || false,
      auth: (cb) => {
        cb({ token: this.#token || null });
      }
    });

    this.#socket.on('connect', async () => {
      try {
        this.user = await this.emit('auth:signin', { login, password });
        this.#router.push({ name: 'home' });
        this.#toast.add({
          severity: 'success',
          summary: t('HD Information'),
          detail: t('Authorization passed'),
          life: 3000
        });
      } catch (err) {
        this.#socket.close();
        this.#toast.add({
          severity: 'warn',
          summary: t('HD Warning'),
          detail: t(err),
          life: 3000
        });
      }
    });

    this.#socket.on('helpdesk:users', (payload) => {
      this.#users = payload;
    });

    this.#socket.on('helpdesk:message', (payload) => {
      if (typeof payload === 'string') {
        this.#toast.add({
          severity: 'success',
          summary: t('HD Information'),
          detail: t(payload),
          life: 3000
        });
      }
    });

    this.#socket.on('helpdesk:error', (payload) => {
      if (typeof payload === 'string') {
        this.#toast.add({
          severity: 'warn',
          summary: $t('HD Warning'),
          detail: $t(payload),
          life: 3000
        });
      }
    });

    this.#socket.on('disconnect', () => {
      this.user = null;
      this.#socket = null;
      this.#router.push({ name: 'signin' });
    });
  }

  async fetchUser() {
    return true;
  }

  async login({ login, password }) {
    try {
      this.user = await this.emit('auth:signin', { login, password });
      this.#router.push({ name: 'home' });
      this.#toast.add({
        severity: 'success',
        summary: t('HD Information'),
        detail: t('Authorization passed'),
        life: 3000
      });
    } catch (err) {
      this.#socket.close();
      this.#toast.add({
        severity: 'warn',
        summary: t('HD Warning'),
        detail: t(err),
        life: 3000
      });
    }
  }

  async logout() {
    this.#socket.close();
    this.#toast.add({
      severity: 'info',
      summary: t('HD Information'),
      detail: t('Logout successfully completed'),
      life: 3000
    });
  }
}

export default {
  install: async (app, { router, translate, toast, options }) => {
    const helpdesk = new Provider({ router, toast, translate, options });

    await helpdesk.init();

    router.beforeEach((to, from, next) => {
      if (to?.meta?.auth && !helpdesk.loggedIn) next({ name: 'signin' });
      else next();
    });

    app.config.globalProperties.$helpdesk = helpdesk;
    app.provide('helpdesk', helpdesk);
  }
};
