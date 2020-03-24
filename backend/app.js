var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var config = require('./routes/index')
var authRoute = require('./routes/auth.route');
var fileSystem = require('fs')
var path = require('path')
var util = require('util');
require('./db')
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/songs', express.static(path.join(__dirname, 'songs')));

app.use('/auth', authRoute)

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {
    res.status(err.status || 400);
    res.json({
        message: err.message,
        error: err
    });
});

app.listen(config.port, function(err, done){
    if(err){
        console.log('server lost');
    }
    else{
        console.log('server connected', )
    }
})

module.exports = app;