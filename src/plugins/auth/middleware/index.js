export const requiresAuthMiddleware = ({ loggedIn, next, options }) => {
    if (!loggedIn?.value) {
        next(options.redirect.login);
    } else {
        next();
    }
};

export const guestMiddleware = ({ loggedIn, next, options }) => {
    if (loggedIn?.value) {
        next(options.redirect.home);
    } else {
        next();
    }
};
