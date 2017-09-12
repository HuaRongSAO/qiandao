import express from 'express'
import {
    getAllClassify,
    getAllFiles,
    getFilePage,
    getFileByClass
} from './../controllers/filesController'
import _ from 'lodash'

let downRouter = express.Router()

downRouter.get('/', function (req, res, next) {
    Promise.all([ getAllFiles(), getAllClassify() ]).then((result) => {
        let [ filesList, classifies ] = result
        let classList = []
        for (let key in classifies) {
            if (classifies[ key ]) {
                classList.push(classifies[ key ])
            }
        }
        classList = _.flattenDeep(classList)
        res.render('filesArticle', { classList: classList, filesList: filesList })
    })
})
downRouter.get('/', function (req, res, next) {
    Promise.all([ getAllFiles(), getAllClassify() ]).then((result) => {
        let [ filesList, classifies ] = result
        let classList = []
        for (let key in classifies) {
            if (classifies[ key ]) {
                classList.push(classifies[ key ])
            }
        }
        classList = _.flattenDeep(classList)
        res.render('filesArticle', { classList: classList, filesList: filesList })
    })
})
downRouter.get('/class', function (req, res, next) {
    Promise.all([ getAllFiles(), getAllClassify() ]).then((result) => {
        let [ filesList, classifies ] = result
        let classList = []
        for (let key in classifies) {
            if (classifies[ key ]) {
                classList.push(classifies[ key ])
            }
        }
        classList = _.flattenDeep(classList)
        res.json({
            data: { classList: classList, filesList: filesList }
        })
    })
})
downRouter.get('/find', function (req, res, next) {
    let query = { child: req.query.child }
    let page = req.query.page
    let limit = req.query.limit
    if (query.child === 'all') query = {}
    getFileByClass(query, page, limit).then(function (result) {
        console.log(result)
        res.json({
            data: result
        })
    })
})

downRouter.get('/:parent/:child', function (req, res, next) {
    let query = {
        parent: req.params.parent,
        child: req.params.child
    }
    let page = 1
    let limit = 20
    getFilePage(query, page, limit).then(function (result) {
        let classifies = result[ 0 ] || {}
        let fileLists = result[ 1 ] || []
        let pagination = {}
        pagination.count = result[ 2 ] || 0
        pagination.current = page
        res.render('filesList', {
            classifies: classifies,
            fileLists: fileLists,
            pagination: pagination
        })
    })
})


export default downRouter