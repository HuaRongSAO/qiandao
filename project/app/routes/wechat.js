import express from 'express'
import {
  getAllClassify,
  getSubClassifyByClass,
  getArticleByClass,
  getArticleById
} from './../controllers/filesController'
import _ from 'lodash'

const wechatRoute = express.Router()

wechatRoute.get('/', async function (req, res, next) {
  const classify = await getAllClassify() || {}
  const classArray = Object.keys(classify)
  console.log(classify)
  res.render('wechat/index', {classArray, classify})
})

wechatRoute.get('/classify', async function (req, res, next) {
  const {classify} = req.query
  const subClassify = await getSubClassifyByClass(classify)
  console.log(subClassify)
  res.render('wechat/smallClassify', {classify, subClassify})
})

wechatRoute.get('/classify/subclassify', async function (req, res, next) {
  const {classify, subclassify} = req.query
  res.render('wechat/article', {classify, subclassify})
})
wechatRoute.get('/classify/subClassify/article', async function (req, res, next) {
  const {page, size, classify, subclassify} = req.query
  const query = {
    child: subclassify,
    parent: classify
  }
  const articles = await getArticleByClass(query, Number(page), Number(size)).catch(err => {throw err})
  res.json(articles)
})
wechatRoute.get('/article/:id', async function (req, res, next) {
  const {id} = req.params
  const article = await getArticleById(id).catch(err => {throw err})
  res.json(article)
})

export default wechatRoute