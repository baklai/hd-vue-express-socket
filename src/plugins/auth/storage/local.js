export class LocalStorage {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key, defaultValue) {
        try {
            const value = localStorage.getItem(key);
            return JSON.parse(value);
        } catch {
            return defaultValue;
        }
    }

    remove(key) {
        localStorage.remove(key);
    }

    clear() {
        localStorage.clear();
    }
}
