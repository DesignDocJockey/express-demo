'use strict';

const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');

const home = require('./routes/home');
const quarterbacks = require('./routes/quarterbacks');

const morgan = require('morgan');
const authenticationMiddleWare = require('./middleware/authentication');
const authorizationMiddleWare = require('./middleware/authorization');

const app = express();

//use express middle-ware to retrieve json from the body of the request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//middleware to serve static content from a specified folder
app.use(express.static('public'));

//use custom middleware 
app.use(authenticationMiddleWare);
app.use(authorizationMiddleWare);

// const environment = process.env.NODE_ENV;
// console.log(`process.env.NODE_ENV: ${environment}`);
// console.log(`application environment: ${app.get('env')}`);

if( app.get('env') === 'development') {
    console.log('Enabling Morgan for debugging..');
    app.use(morgan('tiny'));
}
 
app.use('/', home);
app.use('/api/players/qbs', quarterbacks);

//if the environment variable PORT isnt' defined, default to port 3000
const port = process.env.PORT || 3000;
app.listen(port, ()=> { console.log(`Listening at Port: ${port}`)});

