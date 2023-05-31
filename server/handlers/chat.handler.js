module.exports = (socket) => {
  const chatMessage = async ({ message }, callback) => {
    try {
      socket.broadcast.emit('chat:message', {
        response: {
          username: socket.user.fullname,
          datetime: new Date(),
          message: message
        }
      });
      callback({ response: 'Ok' });
    } catch (err) {
      callback({ error: err.message });
    }
  };

  socket.on('chat:message', chatMessage);
};
