'use strict';

var _userModel = require('./../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _db = require('./../models/db');

var _db2 = _interopRequireDefault(_db);

var _taskModel = require('./../models/taskModel');

var _taskModel2 = _interopRequireDefault(_taskModel);

var _users = require('./users.json');

var _users2 = _interopRequireDefault(_users);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _db2.default)();

(0, _taskModel2.default)({
    title: '签到系统使用说明',
    content: '以后本系统将用来发布相关的文件和视频，用于交流学习，和任务发布等事情。请所有人注意签到！',
    start: new Date(),
    end: new Date().getTime() + 2592000000,
    questions: [{
        question: '修改密码按钮位置？管理员点击右上角管理员,用户点底部击个人中心',
        select: ['知道', '不知道'],
        answer: 0
    }],
    created_at: new Date()
}).save();

(0, _userModel2.default)({
    username: 'admin01',
    password: (0, _md2.default)('123456'),
    work_number: 'admin01',
    role: 0
}).save();
(0, _userModel2.default)({
    username: 'admin02',
    password: (0, _md2.default)('123456'),
    work_number: 'admin02',
    role: 0
}).save();

for (var i = 0; i < _users2.default.length; i++) {

    (0, _userModel2.default)({
        username: _users2.default[i].username,
        password: (0, _md2.default)('123456'),
        work_number: _users2.default[i].number,
        department: _users2.default[i].department,
        birthday: _users2.default[i].birthday,
        job: _users2.default[i].job,
        jobname: _users2.default[i].jobname,
        role: 2,
        number: i + 1,
        created_at: new Date(),
        updated_at: new Date()
    }).save().then(function (doc) {
        console.log('创建成功');
        console.log(doc);
    }).catch(function (err) {
        console.log(err);
    });
}