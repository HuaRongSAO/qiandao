'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function checkAuth(req, res, next) {
    if (!req.session.user) {
        res.render('login', { message: '没有权限访问，请登入' });
        return;
    } else {
        next();
    }
}
exports.default = checkAuth;