import express from 'express'
import {
    getAllClassify,
    hasClassify,
    saveClassify,
    updateClassify,
    uploadPDF,
    removeClassifies,
    getFilePage,
    deleteFile
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
//查询大分类是否存在
///admin/files/classify/check/parent/
filesRouter.get('/classify/check/parent/:name', function (req, res, next) {
    let name = req.params.name;
    hasClassify({'name': name, 'belong': ''}).then(function (r) {
        r ? res.json({'exist': false}) : res.json({'exist': true})
    })
})
//添加大分类
filesRouter.get('/classify/add/parent/:name', function (req, res, next) {
    let name = req.params.name;
    saveClassify({'name': name, 'belong': ''})
    res.redirect('/admin/files/manage')
})
//修改大分类
///classify/update/parent/?oldName=' + window.placeholder + '&newName=' + value;
filesRouter.get('/classify/update/parent/', function (req, res, next) {
    let oldName = req.query.oldName
    let newName = req.query.newName
    hasClassify({'name': newName, 'belong': ''}).then(function (isUpdate) {
        if (isUpdate) {
            updateClassify({'name': oldName, 'belong': ''}, {'name': newName}).then(function (r) {
                if (r) {
                    updateClassify({'belong': oldName}, {'belong': newName})
                }
            }).then(function () {
                res.redirect('/admin/files/manage')
            })
        }
        res.redirect('/admin/files/manage')
    })
})
// 删除大分类
///admin/files/classify/remove/parent/' + window.placeholder;
filesRouter.get('/classify/remove/parent/:parent', function (req, res, next) {
    let query = {name: req.params.parent, belong: ''}
    let removeChild = {belong: req.params.parent}
    removeClassifies(query).then(function (doc) {
        removeClassifies(removeChild).then(function (doc) {
            res.redirect('/admin/files/manage')
        })
    })
})
//查询小分类是否存在
//'/admin/files/classify/check/child/?child=' + value + '&parent=' + parentText;
filesRouter.get('/classify/check/child/', function (req, res, next) {
    let parent = req.query.parent
    let name = req.query.child
    hasClassify({'name': name, 'belong': parent}).then(function (r) {
        r ? res.json({'exit': false}) : res.json({'exit': true})
    })
})
//添加小分类
///admin/files/classify/add/child/?child&parent
filesRouter.get('/classify/add/child/', function (req, res, next) {
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

//更新小类
///classify/update/child/?oldName=345&newName=1234&parent=hello1
filesRouter.get('/classify/update/child/', function (req, res, next) {
    let check = {'name': req.query.newName, 'belong': req.query.parent}
    let query = {'name': req.query.oldName, 'belong': req.query.parent}
    let update = {'name': req.query.newName}
    hasClassify(check).then(function (r) {
        if (r) {
            updateClassify(query, update).then(function (r) {
                res.redirect('/admin/files/manage')
            })
        }
        res.redirect('/admin/files/manage')
    })
})
//删除小分类
//classify/remove/child/?child=hello&parent=hello1
filesRouter.get('/classify/remove/child/', function (req, res, next) {
    let query = {'name': req.query.child, 'belong': req.query.parent}
    removeClassifies(query).then(function (doc) {
        console.log(doc.result.n)
        res.redirect('/admin/files/manage')
    })
})

//删除文件
//files/delete/:id
filesRouter.get('/file/delete/:fileid', function (req, res, next) {
    let query = {'_id': req.params.fileid}
    console.log(query)
    deleteFile(query).then(function (doc) {
        console.log(doc.result.n)
        res.redirect('/admin/files')
    })
})


export default filesRouter