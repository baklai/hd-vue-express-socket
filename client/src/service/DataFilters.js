export const dateToStr = (value) => {
  return value ? new Date(value).toLocaleDateString() : '-';
};

export const dateTimeToStr = (value) => {
  return value ? new Date(value).toLocaleString() : '-';
};

export const byteFormat = (value) => {
  if (!value) return '0 kB';
  const index = Math.floor(Math.log(value) / Math.log(1024));
  return (
    (value / Math.pow(1024, index)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GiB', 'TB'][index]
  );
};
