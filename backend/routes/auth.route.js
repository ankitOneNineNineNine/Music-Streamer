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
var nodemailer = require('nodemailer');

const randomString = require('randomstring')
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
       
        userModel.findOne({
            email: req.body.email,

        })
            .then(function (user) {
                if (user) {
                   
                    var isMatched = hash.verify(req.body.password, user.password)
                    if (isMatched) {
                        var token = jwt.sign({
                            id: user._id,
                            role: user.planRole,
                        }, config.jwtSecret);
                        res.status(200).json({
                            user: { _id: user._id, userName: user.userName,fullName: user.fullName,image: user.image, email: user.email, role: user.planRole },
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
        const RoleToken = randomString.generate(25);
        const RoleTokenExpiry = new Date(Date.now(1000 * 60 * 60 * 24) + (1000 * 60 * 4));;
        newUser.RoleToken = RoleToken;
        newUser.RoleTokenExpiry = RoleTokenExpiry;


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