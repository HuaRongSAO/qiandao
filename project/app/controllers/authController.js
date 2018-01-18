import {findUser} from './userController'
import md5 from 'md5'
function grantAuthorization(req, res, next) {
    let work_number = req.body.username;
    let password = md5(req.body.password);
    findUser({work_number:work_number,password:password}).then((user) => {
        if (user.length > 0) {
            req.session.auth = true;
            req.session.user = user[0]
            if (req.session.user.role == 0) {
                res.redirect('/admin');
            }
            if (req.session.user.role == 1) {
                res.send('你好护士长')
            } else {
                res.redirect('/');
            }
        } else {
            req.session.auth = false
            res.render('uaredirect', {message: null})
        }
    }).catch((err) => {
        throw err
    })
}
export default grantAuthorization