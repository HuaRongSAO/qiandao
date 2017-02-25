'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _formidable = require('formidable');

var _formidable2 = _interopRequireDefault(_formidable);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sillyDatetime = require('silly-datetime');

var _sillyDatetime2 = _interopRequireDefault(_sillyDatetime);

var _taskController = require('./../controllers/taskController');

var _userController = require('./../controllers/userController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var masterRouter = _express2.default.Router();
//管理员页面路由控制
//负责 管理课程 管理用户 添加课程

//退出登入


// 管理员页面 管理课程
masterRouter.get('/', function (req, res, next) {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 20;
    (0, _taskController.countTask)().then(function (count) {
        (0, _taskController.findTaskByPage)({ page: page, limit: limit }).then(function (tasks) {
            res.render('admin', { tasks: tasks, count: count - 1, page: page });
        });
    });
});
masterRouter.get('/out', function (req, res, next) {
    req.session.user = '';
    res.redirect('/');
});

//删除单条课程
masterRouter.get('/tasks/remove/:taskid', function (req, res, next) {
    var objectJson = { '_id': req.params.taskid };

    (0, _taskController.deleteTaskById)(objectJson).then(function (doc) {
        res.json({ state: true, msg: '成功删除' });
    }).catch(function (err) {
        return res.json({ state: false, msg: '删除失败' });
    });
});
//查找单条课程
masterRouter.get('/tasks/find/:taskid', function (req, res, next) {
    var objectJson = { '_id': req.params.taskid };
    (0, _taskController.findTask)(objectJson).then(function (task) {
        res.json({ state: true, msg: '查找到课程！', task: task });
    }).catch(function (err) {
        res.json({ state: false, msg: '没有找到课程！' });
    });
});
//课程页面
masterRouter.get('/tasks/add', function (req, res, next) {
    res.render('addCourse');
});

//创建新的课程
masterRouter.post('/tasks/new', function (req, res, next) {
    var form = new _formidable2.default.IncomingForm();
    form.uploadDir = "./dist/public/files";
    form.parse(req, function (err, fields, files) {
        var title = fields.title || '';
        var content = fields.descript || '';
        var start = fields.start || '';
        var end = fields.end || '';

        if (err) {
            throw err;
        }
        console.log(files);
        if (files.file.name) {
            (function () {
                var ttt = _sillyDatetime2.default.format(new Date(), 'YYYYMMDDHHmmss');
                var ran = parseInt(Math.random() * 89999 + 10000);
                var extname = files.file.name;
                //执行改名
                var oldpath = files.file.path;
                //新的路径由三个部分组成：时间戳、随机数、拓展名
                // let newpath = __dirname + "../public/files/" + ttt + ran + extname;
                var newpath = _path2.default.normalize(__dirname + "/../../dist/public/files/" + ttt + ran + extname);
                var filePath = "/files/" + ttt + ran + extname;
                //改名
                _fs2.default.rename(oldpath, newpath, function (err) {
                    if (err) {
                        throw Error("改名失败");
                    }
                    (0, _taskController.creatTask)({
                        title: title,
                        content: content,
                        file: filePath,
                        start: start,
                        end: end
                    }).then(function (doc) {
                        console.log('创建成功');
                        console.log(doc);
                        res.json({ state: true, msg: '创建成功' });
                    }).catch(function (err) {
                        res.json({ state: false, msg: '创建失败' });
                    });
                });
            })();
        } else {
            (0, _taskController.creatTask)({
                title: title,
                content: content,
                start: start,
                end: end
            }).then(function (doc) {
                console.log('创建成功');
                console.log(doc);
                res.json({ state: true, msg: '创建成功' });
            }).catch(function (err) {
                res.json({ state: false, msg: '创建失败' });
            });
        }
    });
});

//管理员管理用户
masterRouter.get('/users', function (req, res, next) {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 20;
    (0, _userController.countUsers)().then(function (count) {
        (0, _userController.findUsersPage)({ page: page, limit: limit }).then(function (users) {
            res.render('users', { users: users, count: count - 1, page: page });
        });
    });
});

masterRouter.get('/users/remove/:userid', function (req, res, next) {
    var objectJson = { '_id': req.params.userid };
    (0, _userController.deleteUser)(objectJson).then(function (result) {
        res.json({ state: true, msg: '删除成功！' });
    }).catch(function (err) {
        res.json({ state: false, msg: '删除失败！' });
    });
});
masterRouter.get('/users/find/:userid', function (req, res, next) {

    var objectJson = { '_id': req.params.userid };
    (0, _userController.findUser)(objectJson).then(function (user) {
        console.log(user);
        res.json({ state: true, msg: '查找到用户！', user: user });
    }).catch(function (err) {
        res.json({ state: false, msg: '删除失败！' });
    });
});

exports.default = masterRouter;