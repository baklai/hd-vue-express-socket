import { createPiniaAuth } from './store';
import { registerAxiosInterceptors } from './axios';

export default {
  install: (app, { options, axios, router }) => {
    const auth = createPiniaAuth(options, router, axios);
    registerAxiosInterceptors(axios, options, router, auth);
    app.config.globalProperties.$auth = auth;
    app.provide('auth', auth);
  }
};
