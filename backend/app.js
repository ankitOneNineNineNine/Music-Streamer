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
var authenticate = require('./middlewares/authenticate')
var userRoute = require('./routes/user.route')
var songsRoute = require('./routes/songList.route')
var showEmotion = require('./faceAnalysis/face')

require('./db');
var app = express();
// var jsmediatags = require("jsmediatags");
// new jsmediatags.Reader("./songs/Imagine Dragons - Believer.mp3")
//     .setTagsToRead(["title", "artist"])
//     .read({
//         onSuccess: function (tag) {
//             console.log(tag);
//         },
//         onError: function (error) {
//             console.log(':(', error.type, error.info);
//         }
//     });
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/songs', express.static(path.join(__dirname, 'songs')));
// app.use('/emotion', showEmotion);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth', authRoute)
app.use('/songs', songsRoute)
app.use('/user', authenticate, userRoute)


app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 400);
    res.json({
        message: err.message,
        error: err
    });
});

app.listen(config.port, function (err, done) {
    if (err) {
        console.log('server lost');
    }
    else {
        console.log('server connected')
    }
})

module.exports = app;
