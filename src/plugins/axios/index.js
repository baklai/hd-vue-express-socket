import axios from 'axios';

export default {
  install: (app, options) => {
    const instans = axios.create({
      baseURL: options.baseUrl,
      headers: options.headers
    });

    app.config.globalProperties.$axios = instans;
    app.provide('axios', instans);
  }
};
