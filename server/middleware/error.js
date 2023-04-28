process.on('uncaughtException', (err) => {
  console.error(`${new Date().toUTCString()} uncaughtException: ${err.message}`);
  console.error(err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error(`${new Date().toUTCString()} unhandledRejection: ${reason.message}`);
  console.error(reason);
});

const handleValidationError = (err) => {
  const key = Object.keys(err.errors);
  if (err.errors[key[0]] && err.errors[key[0]].properties) {
    return err.errors[key[0]].properties.message;
  }
  return;
};

module.exports = (socket, event = 'error') => {
  return (err) => {
    if (err.name === 'UnauthorizedError') {
      socket.emit(event, { error: 'Oops! The token is invalid' });
    } else if (err.name === 'ScopedError') {
      socket.emit(event, { error: 'Oops! Access to the resource is denied' });
    } else if (err.name === 'ValidationError') {
      socket.emit(event, { error: handleValidationError(err) });
    } else if (err.name === 'MongoServerError') {
      socket.emit(event, { error: err.message });
    } else {
      socket.emit(event, { error: err.message });
    }
  };
};
