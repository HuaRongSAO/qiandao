'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function isUser(req, res, next) {
    if (!req.session.user) {
        res.render('uaredirect', { message: '没有权限访问，请登入' });
    } else {
        next();
    }
}
exports.default = isUser;