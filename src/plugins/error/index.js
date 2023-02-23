import { inject } from 'vue';

import { useToast } from 'primevue/usetoast';

export default {
    install: (app, { options }) => {
        const toast = useToast();

        const error = createPiniaAuth(merge(defaultOptions, options), router, axios);

        app.config.globalProperties.$auth = auth;

        app.provide('auth', auth);
    }
};
