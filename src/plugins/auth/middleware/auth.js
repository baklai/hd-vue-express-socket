export const requiresAuthMiddleware = ({ loggedIn, next, options }) => {
  if (!loggedIn?.value) {
    next(options.redirect.login);
  } else {
    next();
  }
};
