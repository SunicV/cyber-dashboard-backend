'use strict';

const users = require('../../models/users.js');
const jwt = require('jwt-simple');
const cfg = require('./config.js');

exports.apiUser = function(args, res, next) {
    /**
     * Logs user into the system
     * 
     *
     * id String The user id for login
     * returns String
     **/
    var examples = {};
    examples['application/json'] = "aeiou";
    if (Object.keys(examples).length > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
        res.end();
    }
}

exports.deleteUser = function(args, res, next) {
    /**
     * Delete user
     * This can only be done by the logged in user.
     *
     * no response value expected for this operation
     **/
    res.end();
}

exports.loginUser = function(req, res, next) {
    /**
     * user login
     * This can only be done by the logged in user.
     *
     * body User user login
     * no response value expected for this operation
     **/

    if (req.body.value && req.body.value.email && req.body.value.password) {
        var email = req.body.value.email;
        var password = req.body.value.password;

        var user = users.find(function(u) {
            return u.email === email && u.password === password;
        });
        if (user) {
            var payload = {
                id: user.id,
                email: user.email,
            };
            var token = jwt.encode(payload, cfg.jwtSecret);
            return res.json({
                data: {
                    message: 'Successfully logged in!',
                    token: token
                }
            });
        }
    }
    return res.status(401).json({
        data: {
            error: 'Login/password combination is not correct'
        }
    });
    res.end();
}

exports.registerUser = function(args, res, next) {
    /**
     * user register
     * This can only be done by the logged in user.
     *
     * body User user register
     * no response value expected for this operation
     **/
    res.end();
}

exports.requestPassUser = function(args, res, next) {
    /**
     * user request-pass
     * This can only be done by the logged in user.
     *
     * body User user request pass
     * no response value expected for this operation
     **/
    res.end();
}

exports.reset = function(args, res, next) {
    /**
     * user reset-pass
     * This can only be done by the logged in user.
     *
     * body User user reset
     * no response value expected for this operation
     **/
    res.end();
}