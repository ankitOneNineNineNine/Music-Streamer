var jwt = require('jsonwebtoken');
var config = require('./../routes/index')
const UserModel = require('./../model/users.model');

module.exports = function (req, res, next) {
    var token;
   
    if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }
    else if (req.headers['authorization']) {
        token = req.headers['authorization']
    }
    else if (req.headers['token']) {
        token = req.headers['token'];
    }
    else if(req.query.token){
        token = req.query.token
    }

    if (token) {
        jwt.verify(token, config.jwtSecret, function (err, done) {
            if (err) {
                return next(err);
            }
            UserModel.findById(done.id)
                .exec(function (err, user) {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        return next({
                            msg: 'user removed from system'
                        })
                    }
                    req.loggedInUser = user;
                    next();
                })

        })
    } else {
        next({
            msg: "Token not provided"
        });
    }
}