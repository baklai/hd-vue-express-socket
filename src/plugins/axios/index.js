import axios from 'axios';

export default {
  install: (app, options) => {
    const instans = axios.create({
      baseURL: options.baseUrl,
      headers: {
        'Content-type': 'application/json'
      }
    });

    app.config.globalProperties.$axios = instans;
    app.provide('axios', instans);
  }
};
