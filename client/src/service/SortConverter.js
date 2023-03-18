export const sortConverter = (value) => {
  const sortObject = {};
  value.forEach(({ field, order }) => {
    sortObject[field] = parseInt(order, 10);
  });
  return sortObject;
};
