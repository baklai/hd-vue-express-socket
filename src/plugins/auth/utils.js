export const normalizeURL = (url) => {
  return String(url).startsWith('/') ? url.substr(1) : url;
};

export const isTokenExpired = (expireTime) => {
  const exp = expireTime * 1000;
  return Date.now() > exp;
};
