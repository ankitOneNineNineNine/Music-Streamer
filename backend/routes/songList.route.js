var express = require('express');
var router = express.Router();
var songsArray = require('./../models/songs.model')
var uploadSongImage = require('./../middlewares/uploadSongPhoto')
var fs = require('fs')
var path = require('path')
router.get('/', function (req, res, next) {
    songsArray.find({}, function (err, songs) {
        if (err) {
            return next(err);
        }
        if (!songs) {
            next()
        }
        res.status(200).json(songs);

    })

})
router.route('/')
    .post(uploadSongImage.array('img'), function (req, res, next) {
        var newSong = new songsArray({});
        var fileNames = req.files.map(songs => `http://localhost:1250/uploads/songs/images/${songs.filename}`)

        var mimeTypes = req.files.map(songs => songs.mimetype.split('/')[0])
        var firstCheck = mimeTypes[0] === 'image'
        var secondCheck = mimeTypes.every(v => v === mimeTypes[0]);

        if (firstCheck) {
            if (secondCheck) {
                newSong.cover = fileNames;
            }
            else {
                return next({
                    msg: 'invalid file format'
                });

            }
        }

        newSong.name = req.body.name;
        newSong.singer = req.body.singer.split(',');
        newSong.album = req.body.album;
        newSong.emotion = req.body.emotion;
        newSong.musicSrc = req.body.musicSrc
        newSong.uploader = req.loggedInUser

        console.log(newSong)
        newSong
            .save()
            .then(function (data) {
                res.status(200).json(data);
            })
            .catch(function (err) {
                console.log(err)
                return next()
            })

    })
module.exports = router;