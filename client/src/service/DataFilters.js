export const dateToStr = (value) => {
  return value ? new Date(value).toLocaleDateString() : '-';
};
