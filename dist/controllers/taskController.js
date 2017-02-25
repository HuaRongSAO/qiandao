'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findNewestTask = exports.deleteTaskById = exports.countTask = exports.findTaskByPage = exports.findTask = exports.findAllTask = exports.creatTask = undefined;

var _taskModel = require('./../models/taskModel');

var _taskModel2 = _interopRequireDefault(_taskModel);

var _sillyDatetime = require('silly-datetime');

var _sillyDatetime2 = _interopRequireDefault(_sillyDatetime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.creatTask = creatTask;
exports.findAllTask = findAllTask;
exports.findTask = findTask;
exports.findTaskByPage = findTaskByPage;
exports.countTask = countTask;
exports.deleteTaskById = deleteTaskById;
exports.findNewestTask = findNewestTask;

//创建课程

function creatTask(json) {
    return (0, _taskModel2.default)({
        title: json.title,
        content: json.content,
        file: json.file,
        start: json.start,
        end: json.end,
        created_at: _sillyDatetime2.default.format(new Date(), 'YYYY-MM-DD')
    }).save();
}

//查找任务
function findTask(json) {
    return _taskModel2.default.find(json).then(function (doc) {
        return doc;
    });
}
function findNewestTask() {
    return _taskModel2.default.findOne().sort({ _id: -1 }).then(function (task) {
        return task;
    }).catch(function (err) {
        return console.log("查找任务：" + err);
    });
}
//发现所有的任务
function findTaskByPage(_ref) {
    var _ref$page = _ref.page,
        page = _ref$page === undefined ? 0 : _ref$page,
        _ref$limit = _ref.limit,
        limit = _ref$limit === undefined ? 20 : _ref$limit;

    var _skip = (page - 1) * limit;
    return _taskModel2.default.find().limit(limit).skip(_skip).sort({ _id: -1 }).then(function (tasks) {
        return tasks;
    }).catch(function (err) {
        return console.log("查找任务：" + err);
    });
}
function findAllTask() {
    return _taskModel2.default.find().then(function (doc) {
        return doc;
    }).catch(function (err) {
        return console.log("查找任务：" + err);
    });
}
function countTask() {
    return _taskModel2.default.find().count().then(function (count) {
        return count;
    });
}
//删除课程
function deleteTaskById(objectid) {
    return _taskModel2.default.remove(objectid);
}

// countTask()
// Task.counts().then((count)=>(console.log(count)))
// findAllTask()
// taskPage()