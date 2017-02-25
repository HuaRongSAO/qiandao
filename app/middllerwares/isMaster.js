function isMaster(req, res, next) {
    if (req.session.user.role == 0) {
        next();
    } else {
        res.send('不是管理员,没有权限！')
    }
}
export default isMaster