export const guestMiddleware = ({ loggedIn, next, options }) => {
  if (loggedIn?.value) {
    next(options.redirect.home);
  } else {
    next();
  }
};
