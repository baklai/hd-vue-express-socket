import { createPiniaAuth } from './store';
import { registerAxiosInterceptors } from './axios';

export default {
  install: async (app, { options, axios, router }) => {
    const useAuth = createPiniaAuth(options, router, axios);
    registerAxiosInterceptors(axios, options, router, useAuth);

    const auth = useAuth();

    app.config.globalProperties.$auth = auth;

    if (auth.token) await auth.fetchUser();

    router.beforeEach((to, from) => {
      // if (to.name !== 'login' && !auth().loggedIn) next({ name: 'login' });
      // else next();

      if (to.meta.auth && !auth?.loggedIn) {
        return { path: '/auth/login', query: { redirect: to.fullPath } };
      }
    });

    app.provide('auth', auth);
  }
};
