export const dateToStr = (value) => {
  return value ? new Date(value).toLocaleDateString() : '-';
};

export const dateTimeToStr = (value) => {
  return value ? new Date(value).toLocaleString() : '-';
};

export const byteFormat = (value) => {
  if (!Number(value)) return '-';
  const index = Math.floor(Math.log(Number(value)) / Math.log(1024));
  return (
    (Number(value) / Math.pow(1024, index)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GiB', 'TB'][index]
  );
};
