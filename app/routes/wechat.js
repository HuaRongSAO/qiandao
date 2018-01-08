import express from 'express'
import {
  getAllClassify,
  getAllFiles,
  getFilePage,
  getFileByClass
} from './../controllers/filesController'
import _ from 'lodash'

const wechatRoute = express.Router()

wechatRoute.get('/', async function (req, res, next) {
  const classify = await getAllClassify() || {}
  const classArray = Object.keys(classify)
  res.render('wechat/index', {classArray})
})

export default wechatRoute