function isNurse(req, res, next) {
    if (req.session.user.role == 2) {
        next();
    } else {
        res.send('对不起，没有权限访问！')
    }
}
export default isNurse