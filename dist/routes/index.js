'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _master = require('./master');

var _master2 = _interopRequireDefault(_master);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _isMaster = require('./../middllerwares/isMaster');

var _isMaster2 = _interopRequireDefault(_isMaster);

var _isNurse = require('./../middllerwares/isNurse');

var _isNurse2 = _interopRequireDefault(_isNurse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* GET home page. */
var router = _express2.default.Router();

router.get('/', function (req, res, next) {
    if (req.session.user.role == 0) {
        res.redirect('/admin');
    } else if (req.session.user.role == 1) {
        res.send('你好护士长');
    } else if (req.session.user.role == 2) {
        res.redirect('/user/article');
    } else {
        res.render('uaredirect', { message: null });
    }
});

router.use('/admin', _isMaster2.default, _master2.default);
router.use('/user', _isNurse2.default, _user2.default);

exports.default = router;