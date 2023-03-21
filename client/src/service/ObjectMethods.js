export const getObjField = (obj, path, defaultValue = '-') => {
  let keys = path.split('.');
  for (let i = 0; i < keys.length; i++) {
    obj = obj[keys[i]];
    if (obj === undefined) {
      return defaultValue;
    }
  }
  return obj;
};
