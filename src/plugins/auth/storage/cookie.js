import Cookies from 'js-cookie';

export class CookieStorage {
  set(key, value, options) {
    Cookies.set(key, JSON.stringify(value), options?.cookie);
  }

  get(key, defaultValue) {
    try {
      const value = Cookies.get(key);
      return JSON.parse(value);
    } catch {
      return defaultValue;
    }
  }

  remove(key) {
    Cookies.remove(key);
  }

  clear(options) {
    Cookies.remove(options?.token?.storageName, options?.cookie);
    Cookies.remove(options?.user?.storageName, options?.cookie);
    Cookies.remove(options?.expiredStorage, options?.cookie);
    Cookies.remove(options?.refreshToken.storageName, options?.cookie);
  }
}
