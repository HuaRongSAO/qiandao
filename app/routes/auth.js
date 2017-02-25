import express from 'express'
import grantAuthorization from './../controllers/authController'
let routerAuth = express.Router()

routerAuth.post('/', function (req, res, next) {
    grantAuthorization(req, res, next)
})

export default routerAuth