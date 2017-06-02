import File from './../models/fileModel'
import Classify from './../models/classifyModel'
import _ from 'lodash'
import  formidable from 'formidable'
import sd from 'silly-datetime'
import fs from 'fs'
import path from 'path'
export {
    getAllClassify,
    removeClassifies,
    hasClassify,
    saveClassify,
    updateClassify,
    uploadPDF,
    getAllFiles,
    getFilePage,
    deleteFile,
    updateFiles
}

function getAllClassify() {
    return Classify.find().sort({_id: -1}).then(function (classifies) {
        let classify = {}
        for (let i = 0; i < classifies.length; i++) {
            if (!classifies[i].belong) {
                classify[classifies[i].name] = []
            }
        }
        for (let i = 0; i < classifies.length; i++) {
            if (_.has(classify, classifies[i].belong)) {
                classify[classifies[i].belong].push(classifies[i].name)
            }
        }
        return classify
    }).catch(function (err) {
        console.log(err)
        throw err
    })
}
function hasClassify(obj) {
    return Classify.find(obj).then(function (classifies) {
        if (classifies.length > 0) {
            return false
        }
        return true
    }).catch(function (err) {
        console.log(err)
        return true
    })
}
function saveClassify(obj) {
    return Classify(obj).save().then(function (classifies) {
        if (classifies) return true
        return false
    })
}
function updateClassify(query, update) {
    return Classify.where(query).updateMany(update).then(function (doc) {
        if (doc.nModified == 0) {
            return false
        }
        return true
    })
}

function uploadPDF(req) {
    let form = new formidable.IncomingForm();
    form.uploadDir = "./dist/public/files";
    return new Promise(function (resolve, reject) {
        form.parse(req, function (err, fields, files) {
            console.log(fields)
            let title = fields.title || '';
            let parent = fields.parent || '';
            let child = fields.child || '';
            if (err) {
                throw err;
            }
            if (files.file) {
                let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
                let ran = parseInt(Math.random() * 89999 + 10000);
                let extname = files.file.name;
                //执行改名
                let oldpath = files.file.path
                //新的路径由三个部分组成：时间戳、随机数、拓展名
                // let newpath = __dirname + "../public/files/" + ttt + ran + extname;
                let newpath = path.normalize(__dirname + "/../../dist/public/files/" + extname);
                //改名
                fs.rename(oldpath, newpath, function (err) {
                    if (err) {
                        throw Error("改名失败");
                    }
                    File({
                        title: title,
                        parent: parent,
                        child: child,
                        date: new Date(),
                        url: '/files/' + extname
                    }).save().then(function (file) {
                        resolve(true)
                    })
                });
            }
        })
    })
}
function getAllFiles(query, page = 1, limit = 20) {
    let _skip = ( page - 1) * limit;
    return File.find(query).limit(limit).skip(_skip).sort({"_id": 1}).then(function (files) {
        let filesList = []
        if (files) filesList = files
        return filesList
    }).catch(function (err) {
        console.log(err);
        throw err
    })
}
function getFilePage(query, page = 1, limit = 20) {
    let count = new Promise(function (resolve, reject) {
        File.find(query).count().then(function (count) {
            resolve(count)
        })
    })
    let getClass = new Promise(function (resolve, reject) {
        getAllClassify().then(function (classifies) {
            resolve(classifies)
        })
    })
    let getFilesList = new Promise(function (resolve, reject) {
        getAllFiles(query, page, limit).then(function (fileLists) {
            resolve(fileLists)
        })
    })
    return Promise.all([getClass, getFilesList, count]).then(function (result) {
        return result
    })
}

function removeClassifies(query) {
    return Classify.remove(query)
}
function deleteFile(query) {
    return File.remove(query)
}
function updateFiles(query, update) {
    return Classify.where(query).updateMany(update)
}