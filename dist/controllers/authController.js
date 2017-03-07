'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userController = require('./userController');

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function grantAuthorization(req, res, next) {
    var work_number = req.body.username;
    var password = (0, _md2.default)(req.body.password);
    (0, _userController.findUser)({ work_number: work_number, password: password }).then(function (user) {
        if (user.length > 0) {
            req.session.auth = true;
            req.session.user = user[0];
            if (req.session.user.role == 0) {
                res.redirect('/admin');
            }
            if (req.session.user.role == 1) {
                res.send('你好护士长');
            } else {
                res.redirect('/');
            }
        } else {
            req.session.auth = false;
            res.render('uaredirect', { message: null });
        }
    }).catch(function (err) {
        throw err;
    });
}
exports.default = grantAuthorization;