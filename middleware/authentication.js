function authenticationMiddleWare (request, response, next) {
    console.log('Authentication MiddleWare Function...');
    next();
}

module.exports = authenticationMiddleWare;