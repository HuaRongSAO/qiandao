'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express2.default.Router();
/* GET users listing. */
// var express = require('express');
// var router = express.Router();
userRouter.get('/', function (req, res, next) {
    console.log('++++++++++++++++++++=');
    console.log(req.session);
    res.send('hello wprld! chr');
});

exports.default = userRouter;