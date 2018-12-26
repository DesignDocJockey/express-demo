function authorizationMiddleWare (request, response, next) {
    console.log('Authorization MiddleWare Function...');
    next();
};

module.exports = authorizationMiddleWare;