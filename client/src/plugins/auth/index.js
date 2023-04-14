import axios from 'axios';

export default {
  install: (app, options) => {
    const instans = axios.create({
      baseURL: options.baseUrl,
      headers: options.headers
    });

    const auth = {
      user: null,

      // loggedIn: !!this.user,

      async login() {
        return true;
      },
      async logout() {
        return true;
      },
      hasScope() {
        return true;
      }
    };

    app.config.globalProperties.$auth = auth;
    app.provide('auth', auth);
  }
};
