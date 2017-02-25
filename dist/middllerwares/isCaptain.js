'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
function isCaptain(req, res, next) {
    if (req.session.user.role == 1) {
        next();
    } else {
        res.send('对不起你不是护士长，没有权限访问！');
    }
}
exports.default = isCaptain;