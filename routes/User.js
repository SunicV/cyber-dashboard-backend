'use strict';

var url = require('url');

var User = require('../controllers/users/UserService');

module.exports.apiUser = function apiUser(req, res, next) {
    User.apiUser(req.swagger.params, res, next);
};

module.exports.deleteUser = function deleteUser(req, res, next) {
    User.deleteUser(req.swagger.params, res, next);
};

module.exports.loginUser = function loginUser(req, res, next) {
    User.loginUser(req.swagger.params, res, next);
};

module.exports.registerUser = function registerUser(req, res, next) {
    User.registerUser(req.swagger.params, res, next);
};

module.exports.requestPassUser = function requestPassUser(req, res, next) {
    User.requestPassUser(req.swagger.params, res, next);
};

module.exports.reset = function reset(req, res, next) {
    User.reset(req.swagger.params, res, next);
};