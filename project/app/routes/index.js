import express from 'express'
import masterRouter from './master'
import userRouter from './user'

import isMaster from './../middllerwares/isMaster'
import isNurse from './../middllerwares/isNurse'

/* GET home page. */
let router = express.Router()

router.get('/', function (req, res, next) {
    if (req.session.user.role == 0) {
        res.redirect('/admin');
    } else if (req.session.user.role == 1) {
        res.send('你好护士长')
    } else if (req.session.user.role == 2) {
        res.redirect('/user/article')
    } else {
        res.render('uaredirect', {message: null})
    }
})

router.use('/admin', isMaster, masterRouter)
router.use('/user', isNurse, userRouter)

export default router
