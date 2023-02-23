import { CookieStorage } from './cookie';
import { LocalStorage } from './local';
import { SecureLocalStorage } from './secure-ls';

export const drivers = {
    local: LocalStorage,
    secureLs: SecureLocalStorage,
    cookie: CookieStorage
};

export const DEFAULT_DRIVER = 'local';

export const useStorage = (driver) => new drivers[driver || DEFAULT_DRIVER]();
