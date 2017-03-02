'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _taskController = require('./../controllers/taskController');

var _userController = require('./../controllers/userController');

var _relationController = require('./../controllers/relationController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express2.default.Router();

//默认最新的课程
userRouter.get('/article/', function (req, res, next) {

    var p1 = new _promise2.default(function (resolve, reject) {
        (0, _taskController.findNewestTask)().then(function (task) {
            resolve(task);
        });
    });
    var p2 = new _promise2.default(function (resolve, reject) {
        var json = { department: req.session.user.department };
        (0, _userController.findUser)(json).then(function (users) {
            resolve(users);
        });
    });

    _promise2.default.all([p1, p2]).then(function (results) {
        var task = results[0];
        if (task == null) {
            task = {};
        }
        var users = results[1];

        var json = { task_id: task._id, department: req.session.user.department };
        (0, _relationController.findRelation)(json).then(function (finish) {
            res.render('article', { task: task,
                user: req.session.user,
                users: users,
                finish: finish });
        });
    }).catch(function (r) {
        console.log(r);
    });
});

userRouter.get('/article/finish/:taskid', function (req, res) {
    (0, _relationController.createTaskAndUsers)({
        task_id: req.params.taskid,
        department: req.session.user.department,
        user_id: req.session.user._id
    }).then(function (task) {
        res.json({ state: true, msg: '完成课程' });
    });
});

userRouter.get('/out', function (req, res) {
    req.session.user = '';
    res.redirect('/');
});

exports.default = userRouter;