import { inject } from 'vue';
import defaultAxios from 'axios';
import merge from 'lodash.merge';

import { defaultOptions } from './options';

import createPiniaAuth from './auth';

export const injectAuth = (injectKey = 'auth') => inject(injectKey);

export default {
    install: (app, { options, axios, router, store }) => {
        axios = axios || defaultAxios;

        const auth = createPiniaAuth(merge(defaultOptions, options), router, axios);

        app.config.globalProperties.$auth = auth;

        app.provide('auth', auth);
    }
};
