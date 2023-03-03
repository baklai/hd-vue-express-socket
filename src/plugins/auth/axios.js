import { normalizeURL } from './utils';
import LocalStorage from './local';

export const registerAxiosInterceptors = (axios, options, router, useAuth) => {
  const storage = new LocalStorage();

  const auth = useAuth();

  const getAccessToken = () => {
    return storage.get(options.token.storageName);
  };

  axios.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token && config.headers) {
        config.headers[options.token.name] = `${options.token.type} ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      const originalRequest = error.config;
      const originalRequestUrl = normalizeURL(originalRequest.url);
      const refreshTokenUrl = normalizeURL(options.endpoints.refresh?.url);
      if (error.response.status === 401 && originalRequestUrl === refreshTokenUrl && options.refreshToken.autoLogout) {
        auth.forceLogout();
        router.push({
          path: options.redirect.login,
          query: {
            failed_refresh_token: 1
          }
        });
        return Promise.reject(error);
      }

      const isLogin = originalRequestUrl === normalizeURL(options.endpoints.login.url);
      if (error.response.status === 401 && !originalRequest._retry && !isLogin) {
        originalRequest._retry = true;
        return axios
          .request({
            ...options.endpoints.refresh,
            data: {
              [options.refreshToken.name]: auth.getRefreshToken()
            }
          })
          .then(({ status, data }) => {
            if (status === 200) {
              const newToken = data[options.token.property];
              auth.setToken(newToken);
              auth.setTokenHeader(newToken);
              return axios(originalRequest);
            }
          });
      }

      console.log(error);

      return Promise.reject(error);
    }
  );
};
