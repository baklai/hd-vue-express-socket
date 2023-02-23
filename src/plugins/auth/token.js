export const isTokenExpired = (expireTime) => {
    const exp = expireTime * 1000;
    return Date.now() > exp;
};
