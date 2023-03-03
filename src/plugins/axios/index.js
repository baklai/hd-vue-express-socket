import axios from 'axios';

export default {
  install: (app, options) => {
    // const instans = axios.create({
    //   baseURL: options.baseUrl,
    //   headers: options.headers
    // });

    app.config.globalProperties.$axios = options.axios;
    app.provide('axios', options.axios);
  }
};
