import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { isTokenExpired } from './utils';
import LocalStorage from './local';

export const createPiniaAuth = (options, router, axios) =>
  defineStore('auth', () => {
    const storage = new LocalStorage();

    const user = ref(null);
    const token = ref(storage.get(options.token.storageName));
    const error = ref('');
    const loading = ref(false);

    const loggedIn = computed(() => !!user.value && !!token.value);

    const setUser = (userData) => {
      user.value = userData;
    };

    const setToken = (tokenData) => {
      token.value = tokenData;
      storage.set(options.token.storageName, tokenData);
    };

    const resetState = () => {
      user.value = null;
      token.value = '';
      loading.value = false;
      error.value = '';
    };

    const forceLogout = () => {
      storage.clear(options);
      resetState();
      return Promise.resolve(true);
    };

    const logout = async () => {
      try {
        loading.value = true;
        const { data } = await axios.request({ ...options.endpoints.logout });
        loading.value = false;
        await forceLogout();
        router.push(options.redirect.login);
        return data;
      } catch (err) {
        loading.value = false;
        error.value = err.response?.data?.message || err.message;
        return err.response;
      }
    };

    const fetchUser = async () => {
      try {
        loading.value = true;
        const { data } = await axios.request({ ...options.endpoints.user });
        setUser(data[options.user.property]);
        return data;
      } catch (err) {
        error.value = err.response?.data?.message || err.message;
        return err.response.data;
      } finally {
        loading.value = false;
      }
    };

    const setTokenHeader = (tokenData) => {
      axios.defaults.headers[options.token.name] = `${options.token.type} ${tokenData}`;
    };

    const login = async (payload) => {
      loading.value = true;
      error.value = '';
      try {
        const { data } = await axios.request({ ...options.endpoints.login, data: payload });
        const tokenData = data[options.token.property];
        setToken(tokenData);
        setTokenHeader(tokenData);
        await fetchUser();
        setRefreshTokenData(data);
        return router.push(options.redirect.home);
      } catch (err) {
        if (err.response) {
          error.value = err.response?.data?.message || err.message;
        } else {
          error.value = err.message;
        }
        return err.response;
      } finally {
        loading.value = false;
      }
    };

    const setRefreshTokenData = (data) => {
      const refreshToken = data[options.refreshToken.property];
      storage.set(options.refreshToken.storageName, refreshToken);
    };

    const getUser = async () => {
      return await fetchUser();
    };

    const isExpired = () => {
      const expireTime = storage.get(options.expiredStorage);
      return isTokenExpired(expireTime);
    };

    const getFreshToken = () => {
      return storage.get(options.token.storageName);
    };

    const getToken = async () => {
      if (isExpired()) {
        await refreshToken();
        return getFreshToken();
      } else {
        return getFreshToken();
      }
    };

    const setRefreshToken = (token) => {
      storage.set(options.refreshToken.storageName, token);
    };

    const getRefreshToken = () => {
      return storage.get(options.refreshToken.storageName);
    };

    const getTokenExpirationTime = () => {
      return storage.get(options.expiredStorage);
    };

    const refreshToken = async () => {
      const expiredAt = getTokenExpirationTime();
      if (expiredAt && !isTokenExpired(expiredAt)) {
        return null;
      }

      try {
        loading.value = true;
        const refreshToken = getRefreshToken();
        const refreshTokenName = options.refreshToken.name;
        const { status, data } = await axios.request({
          ...options.endpoints.refresh,
          data: {
            [refreshTokenName]: refreshToken
          }
        });

        if (status === 200) {
          const newToken = data[options.token.property];
          const newRefreshToken = data[options.refreshToken.property];
          setRefreshToken(newRefreshToken);
          setToken(newToken);
          return data;
        }
      } catch (err) {
        return handleRefreshTokenFailed(err);
      } finally {
        loading.value = false;
      }
    };

    const handleRefreshTokenFailed = (err) => {
      if (options.refreshToken.autoLogout) {
        forceLogout();
        router.push(options.redirect.login);
      }
      return err;
    };

    const loginAs = (user, token) => {
      setUser(user);
      setToken(token);
      setTokenHeader(token);
      return Promise.resolve({
        code: 200,
        data: { user, token },
        message: 'OK'
      });
    };

    return {
      user,
      token,
      error,
      loading,
      loggedIn,
      setUser,
      setToken,
      logout,
      login,
      loginAs,
      forceLogout,
      fetchUser,
      setTokenHeader,
      refreshToken,
      setRefreshToken,
      getRefreshToken,
      getToken,
      getUser,
      getFreshToken,
      isExpired,
      handleRefreshTokenFailed,
      getTokenExpirationTime,
      setRefreshTokenData
    };
  });
