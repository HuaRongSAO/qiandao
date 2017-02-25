'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authController = require('./../controllers/authController');

var _authController2 = _interopRequireDefault(_authController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routerAuth = _express2.default.Router();

routerAuth.post('/', function (req, res, next) {
    (0, _authController2.default)(req, res, next);
});

exports.default = routerAuth;