const env = {
    dbUrl: process.env.DB_CNN_URL || '',
    jwtSecret: process.env.JWT_SECRET || '',
    authCookie: process.env.AUTH_COOKIE || '',
};
export default env;