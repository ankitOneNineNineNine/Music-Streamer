var express = require('express');
var router = express.Router();
var hash = require('password-hash')
var jwt = require('jsonwebtoken')
var config = require('./index');
const path = require('path');
const fs = require('fs');
var util = require('util');
var userModel = require('./../models/user.model');
var upload = require('./../middlewares/upload');
var randomString = require('randomstring');
var nodemailer = require('nodemailer');
var songModel = require('./../models/songList')
const sender = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
        user: '4astores1010@gmail.com',
        pass: 'znunbbduhrscavgw'
    },
    debug: true,
    logger: true
})
function prepareMail(data) {
    let mailBody = {
        from: '4A Store <noreply@4astore.com',
        to: data.email,
        subject: "Forgot Password",
        text: "Choose your password wisely",
        html: `
        <p>Hi <strong>${data.name}</strong></p>
        <p>We noticed that you are having problem logging into our website.
        Please note that this link will only sustain to work for 24 hours.</p>
        <p>Click on this link <a href = '${data.link}'>here</a> to reset your password. </p>
        <p>If you did not send the request please contact the customer support for the possibility of intrusion </p>
        <p>Regards, </p>
        <p>4A Store </p>
        `

    }
    return mailBody
}

router.route('/login')
    .post(function (req, res, next) {
        console.log(req.body.email)
        userModel.findOne({
            email: req.body.email,

        })
            .then(function (user) {
                if (user) {
                    console.log(user)
                    var isMatched = hash.verify(req.body.password, user.password)
                    if (isMatched) {
                        var token = jwt.sign({
                            id: user._id,
                            role: user.role
                        }, config.jwtSecret);
                        res.status(200).json({
                            user: { userName: user.userName, email: user.email },
                            token: token,

                        })
                    } else {
                        next({
                            msg: 'invalid password'
                        })
                    }
                } else {
                    next({
                        msg: 'invalid email'
                    })
                }
            })
            .catch(function (err) {
                console.log(err)
                return next(err)
            })

    })
router.route('/register')
    .post(function (req, res, next) {

        var newUser = new userModel({});
        newUser.fullName = req.body.fullName;
        newUser.email = req.body.email;
        newUser.userName = req.body.userName;
        newUser.password = hash.generate(req.body.password);


        newUser
            .save()
            .then(function (data) {
                res.status(200).json(data);
            })
            .catch(function (err) {
                console.log(err)
                return next()
            })

    })
router.route('/forgot-password')

    .post(function (req, res, next) {

        userModel.findOne({
            email: req.body.email,
        })
            .exec(function (err, user) {
                if (err)
                    return next(err)
                if (user) {

                    const passwordResetToken = randomString.generate(25);

                    const passwordResetExpiry = new Date(Date.now(1000 * 60 * 60 * 24));

                    var mailData = {
                        name: user.userName,
                        email: user.email,
                        link: `${req.headers.origin}/reset-password/${passwordResetToken}`

                    }
                    const mailContent = prepareMail(mailData)

                    user.passwordResetToken = passwordResetToken;
                    user.passwordResetTokenExpiry = passwordResetExpiry;
                    user.save(function (err, saved) {
                        if (err)
                            return next(err)
                        else {
                            sender.sendMail(mailContent, function (err, done) {
                                if (err) {
                                    console.log('err ', err)
                                    return next(err)
                                }
                                res.json(done)
                            })
                        }
                    })

                }
                else {
                    next({
                        msg: 'Email not found'
                    })

                }
            })
    })
router.route('/duplicacyCheck')
    .get(function (req, res, next) {

        userModel.find({
            "__v": 0,
        }, function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                next()
            }
            res.status(200).json(user);
        })

    })




router.post('/reset-password/:token', function (req, res, next) {
    var token = req.params.token;
    console.log(token)
    userModel.findOne({
        passwordResetToken: token,
        passwordResetTokenExpiry: {
            $lte: Date.now()
        }
    })
        .exec(function (err, user) {
            if (err)
                return next(err)
            if (!user) {
                return next({
                    msg: 'Invalid or Expired token'
                })
            }
            console.log('here')
            user.password = hash.generate(req.body.password)
            user.passwordResetToken = null,
                user.passwordResetExpiry = null,
                user.save(function (err, done) {
                    if (err) {
                        return next(err)
                    }
                    res.json(done);
                })
        })
})



module.exports = router;