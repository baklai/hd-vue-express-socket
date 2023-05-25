const socketUsers = (sockets) => {
  const users = [];
  sockets.forEach((item) => {
    if (item.user) users.push(item.user);
  });
  const allUsers = users.reduce(
    (prev, curr) => (prev.map((item) => item.id).includes(curr.id) || prev.push(curr), prev),
    []
  );
  return allUsers.map(({ id, login, fullname, email, phone }) => {
    return { id, login, fullname, email, phone };
  });
};

module.exports = { socketUsers };
