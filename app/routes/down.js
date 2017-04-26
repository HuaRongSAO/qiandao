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

let downRouter = express.Router()

downRouter.get('/', function (req, res, next) {
    getAllClassify().then(function (classifies) {
        res.render('filesMobile', {classifies: classifies})
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
        let classifies = result[0] || {}
        let fileLists = result[1] || []
        let pagination = {}
        pagination.count = result[2] || 0
        pagination.current = page
        res.render('filesList', {
            classifies: classifies,
            fileLists: fileLists,
            pagination: pagination
        })
    })
})


export default downRouter