import { useStorage } from './storage';

export function authModule(options, initialState) {
  const storage = useStorage(options.storage.driver);
  const token = storage.get.options.token.storageName;
  const user = storage.get.options.user.storageName;

  return {
    namespaced: true,
    state() {
      return {
        isLoggedIn: !!token,
        token: token ?? null,
        user,
        ...initialState
      };
    },
    mutations: {
      setUser(state, user) {
        state.isLoggedIn = true;
        state.user = user;
      },
      setToken(state, token) {
        state.token = token;
      },
      logout(state) {
        state.user = null;
        state.isLoggedIn = false;
        state.token = null;
      }
    },
    getters: {
      user: (state) => state.user,
      isLoggedIn: (state) => state.isLoggedIn,
      token: (state) => state.token
    }
  };
}
