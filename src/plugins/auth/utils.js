export const normalizeURL = (url) => {
  return String(url).startsWith('/') ? url.substr(1) : url;
};
