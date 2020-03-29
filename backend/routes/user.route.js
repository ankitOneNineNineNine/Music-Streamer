const router = require('express').Router();
const userModel = require('./../models/user.model')
const hash = require('password-hash')
const randomString = require('randomstring')
const upload = require('./../middlewares/upload')
function map_user_request(user, userDetails) {
    if (userDetails.fullName)
        user.fullName = userDetails.fullName;
    if (userDetails.email)
        user.email = userDetails.email;
    if (userDetails.password)
        user.password = hash.generate(userDetails.password);
    if (userDetails.RoleToken)
        user.RoleToken = userDetails.RoleToken
    if (userDetails.RoleTokenExpiry)
        user.RoleTokenExpiry = userDetails.RoleTokenExpiry
    if (userDetails.status)
        user.status = userDetails.status
    if (userDetails.image)
        user.image.unshift(userDetails.image)
    return user;
}

router.route('/uploadPhoto')
    .post(upload.single('img'), function (req, res, next) {
        var mimeType = req.file.mimetype.split('/')[0];
        if (mimeType != 'image') {
            fs.unlink(path.join(process.cwd(), 'uploads/images/' + req.file.filename), function (err, done) {
                if (err) {
                    console.log('file removing error');
                } else {
                    console.log('file removed');
                }
            });
            return next({
                msg: 'invalid file format'
            });
        }
        else {
            var filename = req.file.filename
        
            req.body.image = filename
    
            user = req.loggedInUser
            var updateProfileUser = map_user_request(user, req.body)

            updateProfileUser.save(function (err, uploaded) {
                if (err) {
                    return next(err);
                }
                res.json(uploaded);

            })

        }
    })
router.route('/')
    .get(function (req, res, next) {

        res.json(req.loggedInUser)
    })


router.route('/profile/:id')
    .get(function (req, res, next) {
        var uid = req.params.id
        userModel.findOne({ _id: uid })
            .exec(function (err, found) {
                if (err) {

                    console.log(err)
                    return next(err);
                }
                else
                    res.status(200).json(found)
            })

    })

router.route('/changepassword/:id')

    .put(function (req, res, next) {
        const id = req.params.id;
        userModel.findOne({ _id: id })
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }
                if (user) {

                    if (hash.verify(req.body.oldPassword, user.password)) {
                        const newpassword = {
                            password: req.body.password
                        }
                        updatedMappedUser = map_user_request(user, newpassword)

                        updatedMappedUser.save(function (err, changed) {
                            if (err) {
                                return next(err);
                            }
                            res.json(changed);
                            // })
                        })
                    }
                    else {
                        next({
                            msg: 'Wrong old password'
                        })
                    }


                } else {
                    next({
                        msg: 'user not found',
                    })
                }
            })

    })


router.route('/:id')

    .put(function (req, res, next) {
        // find by id and update
        const id = req.params.id;
        userModel.findOne({ _id: id })
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }
                if (user) {
                    const updatedMappedUser = map_user_request(user, req.body)

                    updatedMappedUser.save(function (err, updated) {
                        if (err) {
                            return next(err);
                        }
                        res.json(updated);
                    })

                } else {
                    next({
                        msg: 'user not found',
                    })
                }
            })

    })
    .delete(function (req, res, next) {
        // delete by id

        var id = req.params.id;
        userModel.findById(id, function (err, user) {
            if (err) {
                return next(err);
            }
            if (user) {
                user.remove(function (err, removed) {
                    if (err) {
                        return next(err);
                    }
                    res.status(200).json(removed);
                });
            } else {
                res.json({
                    msg: "user not found"
                })
            }
        })

    });
router.route('/payForRole')
    .post(function (req, res, next) {
        userModel.findOne({
            email: req.loggedInUser.email
        })

            .exec(function (err, user) {

                if (err) {
                    console.log('err', err)
                    return next(err)
                }
                if (!user) {

                    return next({
                        msg: 'Not Found'

                    })


                }
                var RoleChosen = req.body.role

                user.status = 'enabled'
                if (RoleChosen === '2') {
                    var RoleTokenExpiry = new Date(Date.now(1000 * 60 * 60 * 24) + (1000 * 60 * 60 * 24 * 30));
                }
                else if (RoleChosen === '3') {
                    var RoleTokenExpiry = new Date(Date.now(1000 * 60 * 60 * 24) + (1000 * 60 * 60 * 24 * 365));
                }
                else {
                    console.log('err occured')
                }
                var RoleToken = randomString.generate(25);

                var updateRolesToken = map_user_request(user, {
                    RoleToken,
                    RoleTokenExpiry,
                    status: 'enabled',
                    planRole: RoleChosen

                })

                updateRolesToken.save(function (err, updated) {
                    if (err) {
                        return next(err);
                    }
                    res.json(updated);
                })


            })


    })


router.route('/RoleCheck')
    .get(function (req, res, next) {

        userModel.findOne({
            email: req.loggedInUser.email
        })

            .exec(function (err, user) {

                if (err) {
                    console.log('err', err)
                    return next(err)
                }
                if (!user) {

                    return next({
                        msg: 'Not Found'

                    })


                }

                if (req.loggedInUser.RoleToken) {

                    date2 = new Date(req.loggedInUser.RoleTokenExpiry);
                    date1 = new Date();
                    var remainingDate = new Date(req.loggedInUser.RoleTokenExpiry) - new Date();
                    console.log(remainingDate)
                    if (remainingDate >= 0) {

                        var delta = Math.abs(date2 - date1) / 1000;

                        // calculate (and subtract) whole days
                        var days = Math.floor(delta / 86400);

                        delta -= days * 86400;

                        // calculate (and subtract) whole hours
                        var hours = Math.floor(delta / 3600) % 24;
                        delta -= hours * 3600;

                        // calculate (and subtract) whole minutes
                        var minutes = Math.floor(delta / 60) % 60;
                        delta -= minutes * 60;

                        // what's left is seconds
                        var seconds = (delta % 60).toFixed(0);
                        user.status = 'enabled';

                        res.json({
                            msg: `You have ${days}, days  ${hours} hours ${minutes} minutes and  ${seconds} seconds remaining `,
                            status: user.status
                        })

                    }
                    else {

                        user.status = 'disabled'

                        var updateRolesToken = map_user_request(user, {
                            RoleToken: null,
                            RoleTokenExpiry: null,

                        })

                        updateRolesToken.save(function (err, updated) {
                            if (err) {
                                return next(err);
                            }
                            res.json(updated);
                        })
                        res.json({
                            msg: 'Your subscription has ended',
                            status: user.status
                        })


                    }
                }
                else {
                    user.status = 'disabled'
                    res.json({
                        msg: 'Your subscription has ended',
                        status: user.status
                    })
                }



            })


    })

module.exports = router;
