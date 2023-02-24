import SecureLS from 'secure-ls';

export class SecureLocalStorage {
  // _ls: SecureLS;

  constructor(options = { encodingType: 'aes', isCompression: true }) {
    this._ls = new SecureLS({
      ...options
    });
  }

  set(key, value) {
    this._ls.set(key, value);
  }

  get(key, defaultValue) {
    try {
      return this._ls.get(key) || defaultValue;
    } catch {
      return defaultValue;
    }
  }

  remove(key) {
    this._ls.remove(key);
  }

  clear() {
    this._ls.clear();
  }
}
