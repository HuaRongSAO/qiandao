import express from 'express'
import {
    getAllClassify,
    hasClassify,
    saveClassify,
    updateClassify,
    uploadPDF,
    getAllFiles,
    getFilePage
} from './../controllers/filesController'

let filesRouter = express.Router()

filesRouter.get('/', function (req, res, next) {
    let page = req.query.page || 1
    getFilePage({}, page, 20).then(function (result) {
        let classifies = result[0] || {}
        let fileLists = result[1] || []
        let pagination = {}
        pagination.count = result[2] || 0
        pagination.current = page
        res.render('files', {
            classifies: classifies,
            fileLists: fileLists,
            pagination: pagination
        })
    })
})
filesRouter.get('/query/:query', function (req, res, next) {
    let query = {}
    let [parent, child] = req.params.query.split('+')
    query.parent = parent
    if (child != 0) query.child = child
    let page = req.query.page || 1
    console.log(query)
    getFilePage(query, page, 20).then(function (result) {
        let classifies = result[0] || {}
        let fileLists = result[1] || []
        let pagination = {}
        pagination.count = result[2] || 0
        pagination.current = page
        res.render('files', {
            classifies: classifies,
            fileLists: fileLists,
            pagination: pagination
        })
    })
})
filesRouter.get('/up', function (req, res, next) {
    getAllClassify().then(function (classifies) {
        res.render('filesUp', {classifies: classifies})
    })
})
filesRouter.post('/pdf/upload', function (req, res, next) {
    uploadPDF(req).then(function (result) {
        res.redirect('/admin/files')
    })

})
//进入管理页面
filesRouter.get('/manage', function (req, res, next) {
    getAllClassify().then(function (classifies) {
        res.render('filesManage', {classifies: classifies})
    })
})
//查询分类是否存在
filesRouter.get('/classify/find/:name', function (req, res, next) {
    let name = req.params.name;
    hasClassify({'name': name}).then(function (r) {
        r ? res.json({'exist': false}) : res.json({'exist': true})
    })
})
//添加大分类
filesRouter.get('/classify/add/:name', function (req, res, next) {
    let name = req.params.name;
    saveClassify({'name': name, 'belong': ''})
    res.redirect('/admin/files/manage')
})
//添加小分类
filesRouter.get('/classify/sub/add/', function (req, res, next) {
    let parent = req.query.parent
    let name = req.query.child
    hasClassify({'name': name, 'belong': parent}).then(function (r) {
        if (r) {
            saveClassify({'name': name, 'belong': parent}).then(function (r) {
                res.redirect('/admin/files/manage')
            })
        }
        res.redirect('/admin/files/manage')
    })
})

//更新小大分类
filesRouter.get('/classify/update/', function (req, res, next) {
    let old = {'name': req.query.old, 'belong': ''}
    let newName = {'name': req.query.new, 'belong': ''}
    hasClassify({'name': req.query.new}).then(function (r) {
        if (r) {
            updateClassify(old, newName).then(function (r) {

                if (r) console.log('修改成功 ')
                res.redirect('/admin/files/manage')
            })
        }
        res.redirect('/admin/files/manage')
    })
})

export default filesRouter